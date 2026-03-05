import { NextResponse } from 'next/server';

// ── Mock data ──
const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Bujía NGK D8EA',
        description: 'Bujía estándar de alto rendimiento. Múltiples aplicaciones.',
        price_usd: 4.00,
        brand: 'NGK',
        compatible_models: ['Horse 150', 'SBR', 'TX 200', 'DR 650', 'GN 125'],
        compatible_years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        stock: 24,
        sku: 'BUJ-NGK-D8EA',
        image_url: 'https://placehold.co/400x400/0f1420/25D366?text=Bujía+D8EA',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-1', name: 'Encendido', slug: 'encendido', icon: '⚡' },
    },
    {
        id: '2',
        name: 'Filtro de Aceite Suzuki GN 125',
        description: 'Filtro de aceite de alto flujo original.',
        price_usd: 5.50,
        brand: 'Suzuki OEM',
        compatible_models: ['GN 125', 'EN 125'],
        compatible_years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        stock: 0, // AGOTADO
        sku: 'FIL-ACE-GN125',
        image_url: 'https://placehold.co/400x400/0f1420/3B82F6?text=Filtro+GN125',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-2', name: 'Filtros', slug: 'filtros', icon: '🔧' },
    },
    {
        id: '3',
        name: 'Kit de Cadena 428H x 120 Bera SBR',
        description: 'Kit completo: cadena + catalina delantera + catalina trasera',
        price_usd: 22.00,
        brand: 'DID',
        compatible_models: ['SBR', 'BR 150'],
        compatible_years: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
        stock: 6,
        sku: 'KIT-CAD-SBR',
        image_url: 'https://placehold.co/400x400/0f1420/F59E0B?text=Kit+Cadena+SBR',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-3', name: 'Transmisión', slug: 'transmision', icon: '⛓️' },
    },
    {
        id: '4',
        name: 'Aceite de Motor Motul 10W-40 1L',
        description: 'Aceite sintético para motores 4T de alta exigencia',
        price_usd: 12.50,
        brand: 'Motul',
        compatible_models: ['Horse 150', 'SBR', 'GN 125', 'DR 650'],
        compatible_years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        stock: 30,
        sku: 'LUB-MOT-10W40',
        image_url: 'https://placehold.co/400x400/0f1420/D97706?text=Aceite+Motul',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-4', name: 'Lubricantes', slug: 'lubricantes', icon: '🛢️' },
    },
    {
        id: '5',
        name: 'Pastillas de Freno Keeway Horse',
        description: 'Pastillas cerámicas de larga duración, baja temperatura',
        price_usd: 8.00,
        brand: 'EBC Brakes',
        compatible_models: ['Horse 150', 'Horse 150 II'],
        compatible_years: [2017, 2018, 2019, 2020, 2021, 2022],
        stock: 14,
        sku: 'PAS-EBC-HORSE',
        image_url: 'https://placehold.co/400x400/0f1420/EF4444?text=Pastillas+Horse',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-5', name: 'Frenos', slug: 'frenos', icon: '🛑' },
    },
    {
        id: '6',
        name: 'Batería de Gel YTX9-BS',
        description: 'Batería sellada de alto rendimiento para motos de alta cilindrada',
        price_usd: 35.00,
        brand: 'Yuasa',
        compatible_models: ['DR 650', 'KLR 650'],
        compatible_years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        stock: 2, // LOW STOCK
        sku: 'BAT-YTX9-BS',
        image_url: 'https://placehold.co/400x400/0f1420/60A5FA?text=Batería+YTX9',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-6', name: 'Eléctrico', slug: 'electrico', icon: '💡' },
    },
    {
        id: '7',
        name: 'Faro Delantero LED Universal',
        description: 'Luz blanca de alta potencia.',
        price_usd: 15.00,
        brand: 'Generic',
        compatible_models: ['Horse 150', 'SBR', 'GN 125'],
        compatible_years: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
        stock: 0, // AGOTADO
        sku: 'FAR-LED-UNIV',
        image_url: 'https://placehold.co/400x400/0f1420/eab308?text=Faro+LED',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-6', name: 'Eléctrico', slug: 'electrico', icon: '💡' },
    },
    {
        id: '8',
        name: 'Carburador PZ27 Keeway Horse',
        description: 'Carburador de reemplazo con todos los jets incluidos',
        price_usd: 25.00,
        brand: 'Keihin',
        compatible_models: ['Horse 150'],
        compatible_years: [2016, 2017, 2018, 2019, 2020, 2021],
        stock: 5,
        sku: 'CARB-PZ27-HORSE',
        image_url: 'https://placehold.co/400x400/0f1420/8B5CF6?text=Carburador+PZ27',
        is_active: true,
        created_at: new Date().toISOString(),
        category: { id: 'cat-7', name: 'Motor', slug: 'motor', icon: '🔩' },
    },
];

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('q')?.toLowerCase().trim() ?? '';
        const category = searchParams.get('category')?.toLowerCase() ?? '';
        const brand = searchParams.get('brand')?.toLowerCase() ?? '';
        const model = searchParams.get('model')?.toLowerCase() ?? '';

        let results = MOCK_PRODUCTS;

        // Filtro por texto (nombre, marca, descripción)
        if (q) {
            results = results.filter((p) =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.compatible_models.some((m) => m.toLowerCase().includes(q))
            );
        }

        // Filtro por categoría
        if (category) {
            results = results.filter((p) => p.category.slug === category);
        }

        // Filtro Mi Garaje - Modelo
        if (model) {
            results = results.filter((p) =>
                p.compatible_models.some(m => m.toLowerCase() === model)
            );
        }

        // Filtro Mi Garaje - Marca (simulado, la marca de la moto no está en el product brand, 
        // pero usualmente los modelos implican la marca. Para este MVP, si model está seleccionado, es suficiente.
        // Si se selecciona la marca sin modelo, podríamos filtrar si el label de marca está en los modelos o algo,
        // o simplemente omitirlo para este mock simple)

        return NextResponse.json({ data: results });
    } catch (error) {
        console.error('Error en /api/products:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor', data: [] },
            { status: 500 }
        );
    }
}
