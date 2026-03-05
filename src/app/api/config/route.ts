import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key') ?? 'bcv_rate';

        // Mock config — reemplaza con consulta a Supabase cuando tengas la DB lista
        const CONFIG: Record<string, string> = {
            bcv_rate: '36.50',
            whatsapp_phone: '584120000000',
            store_name: 'Repuestos Luigi',
        };

        const value = CONFIG[key] ?? null;

        if (!value) {
            return NextResponse.json(
                { error: `Config key "${key}" no encontrada` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: { key, value, updated_at: new Date().toISOString() },
        });
    } catch (error) {
        console.error('Error en /api/config:', error);
        return NextResponse.json(
            { data: { key: 'bcv_rate', value: '36.50' } },
            { status: 200 }
        );
    }
}
