// ============================================================
// WhatsApp Link Generator
// Builds pre-configured wa.me links with product context
// ============================================================

import type { Product } from '@/types';
import { formatUsd } from '@/utils/priceCalculator';

const DEFAULT_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '584120000000';

/**
 * Builds a pre-configured WhatsApp link for a product inquiry.
 * Eliminates ambiguity by including product name + compatible models.
 *
 * @param product - The product being inquired about
 * @param phone - WhatsApp phone number with country code (no +)
 * @returns Full wa.me URL with encoded message
 */
export function buildWhatsAppLink(product: Product, phone: string = DEFAULT_PHONE, selectedModel?: string): string {
    const modelContext = selectedModel ? selectedModel : 'General';

    const message = [
        `Hola Repuestos Luigi 🔧.`,
        `Estoy interesado en: ${product.name}`,
        `Precio referencial: ${formatUsd(product.price_usd)}`,
        `¿Aplica para mi moto ${modelContext}?`,
        `Quedo atento.`
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Builds a general inquiry WhatsApp link (no specific product)
 */
export function buildWhatsAppGeneralLink(phone: string = DEFAULT_PHONE): string {
    const message = encodeURIComponent(
        '¡Hola! Visité su catálogo de repuestos en línea y quisiera hacer una consulta. 🏍️'
    );
    return `https://wa.me/${phone}?text=${message}`;
}
