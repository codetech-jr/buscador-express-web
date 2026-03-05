import { ProductSearch } from '@/components/ProductSearch';
import { buildWhatsAppGeneralLink } from '@/utils/whatsapp';
import Image from 'next/image';

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '584120000000';

const KITS = [
  {
    id: 'k1',
    title: 'Kit Entonación Bera/Horse',
    items: 'Aceite Motul 10W-40 + Bujía NGK D8EA',
    priceUsd: 12.00,
    img: 'https://placehold.co/400x400/0f1420/25D366?text=Kit+Entonación'
  },
  {
    id: 'k2',
    title: 'Kit Rodamiento Trasero',
    items: 'Rolineras 6202/6302 + Gomas de Impacto',
    priceUsd: 8.50,
    img: 'https://placehold.co/400x400/0f1420/3B82F6?text=Kit+Rodamiento'
  },
  {
    id: 'k3',
    title: 'Cambio de Aceite Full',
    items: 'Aceite Motul + Filtro de Aceite original',
    priceUsd: 6.00,
    img: 'https://placehold.co/400x400/0f1420/D97706?text=Kit+Aceite'
  }
];

export default function HomePage() {
  const whatsappHref = buildWhatsAppGeneralLink(WHATSAPP_PHONE);

  return (
    <main className="main-layout">
      {/* ── Hero Section ── */}
      <header className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="brand-badge">
            <span className="brand-icon">⚙️</span>
            <span className="brand-label">Charallave · Miranda</span>
          </div>

          <h1 className="hero-title">
            Repuestos{' '}
            <span className="hero-title-accent">Luigi</span>
          </h1>

          <p className="hero-subtitle">
            Buscador de repuestos para motos — precios en Bs y USD en tiempo real
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </header>

      {/* ── Search Section ── */}
      <div className="container py-8">
        <ProductSearch />
      </div>

      {/* ── Combos & Kits (Upselling) ── */}
      <section className="section-kits">
        <div className="container">
          <h2 className="section-title">
            <span className="text-xl mr-2">🔧</span> Kits de Mantenimiento Populares
          </h2>
          <div className="kits-grid">
            {KITS.map(kit => (
              <div key={kit.id} className="kit-card group">
                <div className="kit-img-wrapper">
                  <Image src={kit.img} alt={kit.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="kit-body">
                  <h3 className="kit-title">{kit.title}</h3>
                  <p className="kit-desc">{kit.items}</p>
                  <div className="kit-footer">
                    <span className="kit-price font-inter">${kit.priceUsd.toFixed(2)} USD</span>
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola Repuestos Luigi 🔧.\nEstoy interesado en el *${kit.title}*\nContenido: ${kit.items}\nPrecio Referencial: $${kit.priceUsd.toFixed(2)}\n¿Tienen disponibilidad?`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="kit-btn"
                    >
                      Pedir Combo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted Brands (Social Proof) ── */}
      <section className="section-brands">
        <div className="container text-center">
          <h3 className="brands-title">Repuestos Originales y Genéricos Certificados AAA</h3>
          <div className="brands-logos">
            {['Empire Keeway', 'Bera', 'Motul', 'NGK', 'CST Tires', 'Yuasa'].map(brand => (
              <div key={brand} className="brand-logo-item">
                <span className="brand-text">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location & Logistics ── */}
      <section className="section-logistics">
        <div className="container">
          <div className="logistics-grid">
            {/* Store Location */}
            <div className="logistics-card">
              <div className="logistics-icon-wrapper">
                <span className="text-4xl">🏪</span>
              </div>
              <div>
                <h3 className="logistics-title">📍 Tienda Física</h3>
                <p className="logistics-desc">Av. Bolívar, Charallave<br />(Frente al Centro Comercial)</p>
                <div className="logistics-badge bg-red-500/15 text-red-400 border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse mr-2" />
                  ABIERTO AHORA - Cerramos a las 6:00 PM
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="logistics-card">
              <div className="logistics-icon-wrapper">
                <span className="text-4xl">🛵</span>
              </div>
              <div className="flex-1">
                <h3 className="logistics-title">¿Te quedaste accidentado?</h3>
                <p className="logistics-desc">Servicio de Delivery Express a todo Valles del Tuy en 45 minutos.</p>
                <a
                  href="https://maps.google.com"
                  target="_blank" rel="noopener"
                  className="logistics-btn"
                >
                  📍 Ver Ubicación en Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Minimalist Footer ── */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-left">
            <h4 className="footer-brand flex items-center gap-2"><span className="text-accent-green">⚙️</span> Repuestos Luigi</h4>
            <p className="footer-copyright">© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Catálogo</a>
            <a href="#" className="footer-link">Rastreo de Pedido</a>
          </div>
          <div className="footer-social">
            <a href="#" className="footer-icon" aria-label="Instagram">📸 Instagram</a>
            <a href="#" className="footer-icon" aria-label="TikTok">🎵 TikTok</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
