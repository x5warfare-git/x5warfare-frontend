"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // --- FORM STATE ---
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('X5WARFARE');
    const [description, setDescription] = useState('');
    const [format, setFormat] = useState('tall');
    const [category, setCategory] = useState('tops'); 
    const [details, setDetails] = useState([{ label: '', value: '' }]);
    
    const [images, setImages] = useState<FileList | null>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // YENİ: DÜZENLEME (EDIT) HAFIZASI
    // Eğer bu doluysa, sistem "Güncelleme Modunda" olduğunu anlar.
    const [editingId, setEditingId] = useState<string | null>(null);

    // --- ARŞİV STATE ---
    const [allProducts, setAllProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAll = async () => {
        try {
            const res = await fetch('https://x5warfare-backend-production.up.railway.app/api/products');
            const result = await res.json();
            setAllProducts(result.data);
        } catch (error) {
            console.error("Ürünler çekilemedi", error);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    // GÜVENLİK: KASAYI KİLİTLE (LOGOUT)
    const handleLockArchive = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    };

    // SİLME İŞLEMİ
    const handleDelete = async (id: string) => {
        if (confirm("Bu eseri arşivden kalıcı olarak silmek istediğine emin misin?")) {
            const res = await fetch(`http://127.0.0.1:5000/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAll(); 
        }
    };

    // YENİ: DÜZENLEME (EDIT) BUTONUNA BASILDIĞINDA
    const handleEdit = (prod: any) => {
        // Tüm bilgileri forma doldur
        setEditingId(prod._id);
        setTitle(prod.title);
        setBrand(prod.brand);
        setDescription(prod.description);
        setFormat(prod.format || 'tall');
        setCategory(prod.category);
        setDetails(prod.details && prod.details.length > 0 ? prod.details : [{ label: '', value: '' }]);
        
        // Fotoğrafları önizlemeye koy (Güvenlik gereği eski dosyaları File input'a koyamayız ama URL'leri gösterebiliriz)
        setImages(null);
        setPreviewUrls(prod.images || []);
        
        // Ekranı yumuşakça en üste (forma) kaydır
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // YENİ: DÜZENLEMEYİ İPTAL ET
    const cancelEdit = () => {
        setEditingId(null);
        setTitle(''); setBrand('X5WARFARE'); setDescription(''); setFormat('tall'); setCategory('tops');
        setDetails([{ label: '', value: '' }]);
        setImages(null); setPreviewUrls([]);
        setMessage('');
    };

    const handleAddDetail = () => setDetails([...details, { label: '', value: '' }]);

    const handleDetailChange = (index: number, field: 'label' | 'value', val: string) => {
        const newDetails = [...details];
        newDetails[index][field] = val;
        setDetails(newDetails);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImages(files);
            const urls = Array.from(files).map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    // FORMU GÖNDER (Yükle veya Güncelle)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('brand', brand);
        formData.append('description', description);
        formData.append('format', format);
        formData.append('category', category); 

        details.forEach((detail, index) => {
            if (detail.label && detail.value) {
                formData.append(`details[${index}][label]`, detail.label);
                formData.append(`details[${index}][value]`, detail.value);
            }
        });

        if (images) {
            Array.from(images).forEach((file) => formData.append('images', file));
        }

        try {
            // EDİT MODUNDAYSAK PUT, DEĞİLSE POST İŞLEMİ YAP
            const url = editingId 
                ? `http://127.0.0.1:5000/api/products/${editingId}` 
                : 'http://127.0.0.1:5000/api/products';
                
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, { method, body: formData });
            const result = await res.json();

            if (result.success) {
                setMessage(editingId ? 'BAŞARILI: Eser güncellendi.' : 'BAŞARILI: Eser arşive kaydedildi.');
                cancelEdit(); // Formu tamamen temizle ve edit modundan çık
                fetchAll(); // Tabloyu güncelle
            } else {
                setMessage(`HATA: ${result.message}`);
            }
        } catch (error: any) {
            setMessage(`SİSTEM HATASI: Konsolu kontrol et.`);
        } finally {
            setLoading(false);
        }
    };

    // YENİ: VİTRİN FİLTRELEME MANTIĞI
    // 1. Önce ürünleri tersine çevir (En son yüklenen en üstte olsun)
    const reversedProducts = [...allProducts].reverse();
    
    // 2. Arama çubuğu mantığını işlet
    const filteredProducts = reversedProducts.filter((prod: any) => 
        prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 3. Akıllı Gösterim: Eğer arama yapılıyorsa eşleşen tüm ürünleri göster. 
    // Eğer arama yapılmıyorsa sadece İLK 3 ürünü göster.
    const displayProducts = searchTerm ? filteredProducts : filteredProducts.slice(0, 3);

    return (
        <main className="min-h-screen bg-pitch text-warfare-red pt-12 pb-20 px-6 md:px-12 lg:px-24">

            <div className="mb-12 flex justify-between items-end border-b border-warfare-red/30 pb-4">
                <div>
                    <h1 className="text-3xl font-black tracking-widest uppercase">CONTROL ROOM</h1>
                    <p className="text-xs tracking-widest opacity-70 mt-2 uppercase">
                        {editingId ? 'EDIT MODE ENGAGED' : 'ARCHIVE UPLOAD INTERFACE'}
                    </p>
                </div>
                
                <div className="flex gap-6">
                    <button onClick={handleLockArchive} className="text-[10px] font-black tracking-[0.3em] text-warfare-red hover:text-pitch hover:bg-warfare-red border border-warfare-red px-4 py-2 transition-all uppercase">
                        [ LOCK VAULT ]
                    </button>
                    <Link href="/" className="text-[10px] font-black tracking-[0.3em] text-warfare-red/50 hover:text-warfare-red transition-colors uppercase pt-2 hidden sm:block">
                        EXIT TO ARCHIVE ↗
                    </Link>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-10 relative">
                
                {/* Eğer Düzeltme (Edit) modundaysak, formun etrafında kırmızı bir parlama olur */}
                {editingId && (
                    <div className="absolute -inset-4 border border-warfare-red/30 shadow-[0_0_15px_rgba(255,0,0,0.1)] pointer-events-none rounded-lg"></div>
                )}

                <div className="flex flex-col gap-2 border-t border-warfare-red/20 pt-8">
                    <label className="text-[10px] tracking-widest text-warfare-red uppercase opacity-70">Category / Koleksiyon</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-warfare-red/5 border-none rounded-tl-[10px] rounded-br-[10px] p-3 text-sm text-warfare-red outline-none uppercase font-bold cursor-pointer">
                        <option value="outerwear" className="bg-pitch">OUTERWEAR</option>
                        <option value="tops" className="bg-pitch">TOPS / TEES</option>
                        <option value="bottoms" className="bg-pitch">BOTTOMS</option>
                        <option value="footwear" className="bg-pitch">FOOTWEAR</option>
                        <option value="accessories" className="bg-pitch">ACCESSORIES</option>
                    </select>
                </div>

                {message && (
                    <div className={`p-4 border ${message.includes('BAŞARILI') ? 'border-green-500/50 text-green-500' : 'border-warfare-red text-warfare-red'} text-xs tracking-widest uppercase`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] tracking-widest text-warfare-red uppercase opacity-70">Brand / Marka</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required className="bg-pitch border border-warfare-red/30 p-3 text-sm text-warfare-red focus:outline-none focus:border-warfare-red transition-colors" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] tracking-widest text-warfare-red uppercase opacity-70">Piece Title / Eser Adı</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-pitch border border-warfare-red/30 p-3 text-sm text-warfare-red focus:outline-none focus:border-warfare-red transition-colors" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] tracking-widest text-warfare-red uppercase opacity-70">Manifesto / Açıklama</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="bg-pitch border border-warfare-red/30 p-3 text-sm text-warfare-red focus:outline-none focus:border-warfare-red transition-colors resize-none"></textarea>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-warfare-red/20 pt-8">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] tracking-widest text-warfare-red uppercase opacity-70">Technical Specs / Teknik Detaylar</label>
                        <button type="button" onClick={handleAddDetail} className="text-[10px] tracking-widest hover:opacity-50 transition-opacity uppercase">[+ ADD ROW]</button>
                    </div>

                    {details.map((detail, index) => (
                        <div key={index} className="flex gap-4">
                            <input type="text" placeholder="LABEL (COLOR)" value={detail.label} onChange={(e) => handleDetailChange(index, 'label', e.target.value)} className="w-1/3 bg-pitch border border-warfare-red/30 p-3 text-xs text-warfare-red focus:outline-none focus:border-warfare-red uppercase" />
                            <input type="text" placeholder="VALUE (PITCH BLACK)" value={detail.value} onChange={(e) => handleDetailChange(index, 'value', e.target.value)} className="w-2/3 bg-pitch border border-warfare-red/30 p-3 text-xs text-warfare-red focus:outline-none focus:border-warfare-red uppercase" />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 border-t border-warfare-red/20 pt-8">
                    <label className="text-[10px] tracking-widest text-warfare-red uppercase opacity-70">
                        {editingId ? "Update Imagery (Leave empty to keep current photos)" : "High-Res Imagery (Max 5)"}
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingId} // Edit modunda fotoğraf seçmek zorunlu değildir!
                        className="text-xs text-warfare-red file:mr-4 file:py-2 file:px-4 file:border file:border-warfare-red/50 file:text-xs file:bg-pitch file:text-warfare-red hover:file:bg-warfare-red hover:file:text-pitch file:transition-colors cursor-pointer file:uppercase file:font-bold"
                    />

                    {previewUrls.length > 0 && (
                        <div className="flex gap-4 mt-4 flex-wrap">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="w-24 h-32 border border-warfare-red/50 overflow-hidden relative group">
                                    <img src={url} alt={`Preview ${index}`} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    <span className="absolute top-0 left-0 bg-pitch text-warfare-red text-[8px] font-black px-2 py-1 border-b border-r border-warfare-red/50 uppercase tracking-widest">
                                        {index === 0 ? 'COVER' : `IMG 0${index + 1}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex gap-4">
                    <button type="submit" disabled={loading} className="flex-1 border border-warfare-red p-4 text-xs font-black tracking-widest uppercase hover:bg-warfare-red hover:text-pitch transition-colors disabled:opacity-50">
                        {loading ? 'PROCESSING...' : (editingId ? 'UPDATE RECORD' : 'INJECT INTO ARCHIVE')}
                    </button>
                    
                    {/* EDİT MODUNDA GÖZÜKEN İPTAL BUTONU */}
                    {editingId && (
                        <button type="button" onClick={cancelEdit} className="px-6 border border-warfare-red/50 text-warfare-red/50 text-xs font-black tracking-widest uppercase hover:bg-warfare-red/10 transition-colors">
                            CANCEL
                        </button>
                    )}
                </div>

            </form>

            {/* MEVCUT ARŞİV (YENİ RADAR SİSTEMLİ) */}
            <div className="max-w-3xl mt-20 border-t border-warfare-red/50 pt-10 pb-20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-black uppercase text-warfare-red">Current Archive</h2>
                        {/* Arama yoksa küçük bir bilgi notu düşüyoruz */}
                        {!searchTerm && <p className="text-[10px] tracking-widest text-warfare-red/50 uppercase mt-1">SHOWING LAST 3 UPLOADS</p>}
                    </div>
                    
                    <div className="w-full sm:w-72 relative">
                        <input 
                            type="text" 
                            placeholder="SEARCH BY TITLE, ID OR SECTOR..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-pitch border border-warfare-red/30 p-3 text-xs text-warfare-red focus:outline-none focus:border-warfare-red transition-colors uppercase placeholder-warfare-red/30"
                        />
                        <span className="absolute right-3 top-3 text-xs text-warfare-red opacity-50 font-bold">[ _ ]</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {displayProducts.length > 0 ? (
                        displayProducts.map((prod: any) => (
                            <div key={prod._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-warfare-red/20 p-4 hover:bg-warfare-red/10 transition-colors gap-4">
                                <div>
                                    <p className="text-[10px] opacity-60 uppercase tracking-widest text-warfare-red">ID: {prod._id}</p>
                                    <h3 className="text-lg font-bold uppercase text-warfare-red">{prod.title}</h3>
                                    <p className="text-xs uppercase opacity-80 text-warfare-red">{prod.category}</p>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button onClick={() => handleEdit(prod)} className="text-[10px] flex-1 sm:flex-none border border-warfare-red px-4 py-2 hover:bg-warfare-red hover:text-pitch transition-all uppercase font-bold text-warfare-red">Edit</button>
                                    <button onClick={() => handleDelete(prod._id)} className="text-[10px] flex-1 sm:flex-none bg-warfare-red text-pitch px-4 py-2 hover:bg-transparent hover:text-warfare-red border border-warfare-red transition-all uppercase font-bold">Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 border border-warfare-red/20 border-dashed flex items-center justify-center">
                            <p className="text-xs tracking-widest text-warfare-red uppercase opacity-50 font-bold">
                                NO RECORDS FOUND FOR "{searchTerm}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}