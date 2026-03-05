'use client';

// Skeleton animation component that mimics a ProductCard during loading
export function SkeletonCard() {
    return (
        <div className="product-card animate-pulse">
            {/* Image placeholder */}
            <div className="skeleton-img" />

            {/* Content */}
            <div className="card-body">
                {/* Category badge */}
                <div className="skeleton-line w-1/3 h-4 mb-2" />

                {/* Product name */}
                <div className="skeleton-line w-full h-5 mb-1" />
                <div className="skeleton-line w-3/4 h-5 mb-3" />

                {/* Compatible models */}
                <div className="skeleton-line w-full h-3 mb-1" />
                <div className="skeleton-line w-2/3 h-3 mb-4" />

                {/* Price block */}
                <div className="flex flex-col gap-1 mb-4">
                    <div className="skeleton-line w-1/2 h-6" />
                    <div className="skeleton-line w-2/5 h-4" />
                </div>

                {/* Button */}
                <div className="skeleton-line w-full h-11 rounded-xl" />
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
    return (
        <div className="products-grid">
            {Array.from({ length: count }, (_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
