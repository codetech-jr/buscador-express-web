'use client';

import type { Product } from '@/types';
import { buildWhatsAppLink } from '@/utils/whatsapp';
import { calcBs, formatUsd, getStockStatus } from '@/utils/priceCalculator';
import Image from 'next/image';

interface WhatsAppButtonProps {
    product: Product;
    phone?: string;
    className?: string;
    selectedModel?: string;
}

export function WhatsAppButton({ product, phone, className = '', selectedModel }: WhatsAppButtonProps) {
    const href = buildWhatsAppLink(product, phone);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`whatsapp-btn ${className}`}
            aria-label={`Consultar por ${product.name} en WhatsApp`}
        >
            {/* WhatsApp SVG Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WhatsApp
        </a>
    );
}

// ============================================================
// ProductCard — Main product display card
// ============================================================

interface ProductCardProps {
    product: Product;
    bcvRate: number;
    phone?: string;
    selectedModel?: string;
}

export function ProductCard({ product, bcvRate, phone, selectedModel }: ProductCardProps) {
    const { label: stockLabel, variant: stockVariant } = getStockStatus(product.stock);
    const priceUsd = formatUsd(product.price_usd);
    const priceBs = calcBs(product.price_usd, bcvRate);

    const modelsText = product.compatible_models.length > 0
        ? product.compatible_models.join(' · ')
        : 'Universal';

    const isOutOfStock = product.stock === 0;

    return (
        <article className={`product-card group ${isOutOfStock ? 'is-out-of-stock' : ''}`} aria-label={product.name}>
            {/* Product Image */}
            <div className="card-img-wrapper">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="card-img-placeholder" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-20">
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                    </div>
                )}

                {/* Stock badge */}
                <span className={`stock-badge stock-${stockVariant}`}>
                    {stockLabel}
                </span>

                {/* Category badge */}
                {product.category && (
                    <span className="category-badge">
                        {product.category.icon} {product.category.name}
                    </span>
                )}
            </div>

            {/* Card body */}
            <div className="card-body">
                {/* Brand */}
                {product.brand && (
                    <p className="card-brand">{product.brand}</p>
                )}

                {/* Product name */}
                <h3 className="card-title">{product.name}</h3>

                {/* Compatible models */}
                <p className="card-models" title={product.compatible_models.join(', ')}>
                    🏍️ {modelsText}
                </p>

                {/* SKU */}
                {product.sku && (
                    <p className="card-sku">Ref: {product.sku}</p>
                )}

                {/* Price block */}
                <div className="price-block font-inter">
                    <div className="price-bs">
                        <span className="price-currency">Bs.</span>
                        <span className="price-amount">{priceBs}</span>
                    </div>
                    <div className="price-usd">
                        <span>$ {priceUsd} USD</span>
                    </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-auto pt-2">
                    {isOutOfStock ? (
                        <button disabled className="whatsapp-btn disabled" aria-label="Producto Agotado">
                            Agotado
                        </button>
                    ) : (
                        <WhatsAppButton product={product} phone={phone} selectedModel={selectedModel} />
                    )}
                </div>
            </div>
        </article>
    );
}
