// ============================================================
// Price Calculator Utility
// Calcula el precio en Bs desde USD usando la tasa BCV
// ============================================================

/**
 * Formats a number as Venezuelan Bolívares string
 */
export function formatBs(amount: number): string {
    return amount.toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/**
 * Formats a number as USD string
 */
export function formatUsd(amount: number): string {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/**
 * Calculates the price in Bs from USD using the BCV rate
 * @param priceUsd - Price in US dollars
 * @param bcvRate - Current BCV exchange rate (Bs per 1 USD)
 * @returns Formatted string in Bs (e.g., "127,75")
 */
export function calcBs(priceUsd: number, bcvRate: number): string {
    const bsAmount = priceUsd * bcvRate;
    return formatBs(bsAmount);
}

/**
 * Returns the raw numeric value in Bs
 */
export function calcBsRaw(priceUsd: number, bcvRate: number): number {
    return priceUsd * bcvRate;
}

/**
 * Returns stock badge label and color variant
 */
export function getStockStatus(stock: number): {
    label: string;
    variant: 'available' | 'low' | 'out';
} {
    if (stock === 0) return { label: 'Sin stock', variant: 'out' };
    if (stock <= 3) return { label: `Últimas ${stock}`, variant: 'low' };
    return { label: 'Disponible', variant: 'available' };
}
