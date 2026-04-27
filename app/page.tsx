// app/page.tsx
import HeroCanvas from '../components/archive/HeroCanvas';

export default function Home() {
  return (
    // MasonryGrid'i kaldırdık, sadece tam ekran Hero var.
    // Yeni Vizör Header "fixed" olduğu için bu kanvası aşağı itmeyecek, tam üzerine oturacak.
    <main className="w-full min-h-screen bg-pitch">
      <HeroCanvas />
    </main>
  );
}