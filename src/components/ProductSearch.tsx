'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product, Category, ApiResponse } from '@/types';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { SkeletonGrid } from '@/components/SkeletonCard';

// ============================================================
// Data fetching functions (usadas por React Query)
// ============================================================

async function fetchProducts(params: {
    q: string;
    category: string;
    brand: string;
    model: string;
}): Promise<Product[]> {
    const url = new URL('/api/products', window.location.origin);
    if (params.q) url.searchParams.set('q', params.q);
    if (params.category) url.searchParams.set('category', params.category);
    if (params.brand) url.searchParams.set('brand', params.brand);
    if (params.model) url.searchParams.set('model', params.model);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Error al cargar productos');
    const json: ApiResponse<Product[]> = await res.json();
    return json.data;
}

async function fetchBcvRate(): Promise<number> {
    const res = await fetch('/api/config?key=bcv_rate');
    if (!res.ok) return 36.5; // fallback
    const json = await res.json();
    return parseFloat(json.data?.value ?? '36.5');
}

async function fetchCategories(): Promise<Category[]> {
    // Datos inline para evitar un endpoint extra (rendimiento)
    // En producción: podrías fetcharlos de /api/categories
    const res = await fetch('/api/products?q='); // re-usa products para cachear
    // Alternativa: usar Supabase directamente
    return [];
}

// ============================================================
// Custom debounce hook
// ============================================================

function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

// Categorías hardcodeadas para demo (mismas del seed.sql)
// En producción, hacer un fetch a /api/categories
const DEMO_CATEGORIES: Category[] = [
    { id: '1', name: 'Encendido', slug: 'encendido', icon: '⚡', sort_order: 1 },
    { id: '2', name: 'Filtros', slug: 'filtros', icon: '🔧', sort_order: 2 },
    { id: '3', name: 'Transmisión', slug: 'transmision', icon: '⛓️', sort_order: 3 },
    { id: '4', name: 'Motor', slug: 'motor', icon: '🔩', sort_order: 4 },
    { id: '5', name: 'Frenos', slug: 'frenos', icon: '🛑', sort_order: 5 },
    { id: '6', name: 'Eléctrico', slug: 'electrico', icon: '💡', sort_order: 7 },
    { id: '7', name: 'Lubricantes', slug: 'lubricantes', icon: '🛢️', sort_order: 8 },
];

// Datos para "Mi Garaje"
const BRANDS = ['Empire Keeway', 'Bera', 'Suzuki', 'Honda', 'Yamaha', 'Generic'];
const MODELS = ['Horse 150', 'SBR', 'GN 125', 'DR 650', 'TX 200', 'EN 125', 'BR 150', 'KLR 650'];

// ============================================================
// ProductSearch — Main Component
// ============================================================

export function ProductSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Mi Garaje State
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Debounce de 350ms para no disparar requests en cada keystroke
    const debouncedSearch = useDebounce(searchInput, 350);

    // Query: Tasa BCV (cacheo 1 hora)
    const { data: bcvRate = 36.5 } = useQuery({
        queryKey: ['config', 'bcv_rate'],
        queryFn: fetchBcvRate,
        staleTime: 60 * 60 * 1000, // 1 hora
        gcTime: 2 * 60 * 60 * 1000,
    });

    // Query: Productos (cacheo 5 min, revalida en reconexión)
    const {
        data: products = [],
        isLoading,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['products', debouncedSearch, selectedCategory, selectedBrand, selectedModel],
        queryFn: () => fetchProducts({
            q: debouncedSearch,
            category: selectedCategory,
            brand: selectedBrand,
            model: selectedModel
        }),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev, // Optimistic: mantiene datos anteriores mientras carga
    });

    const handleSearchChange = useCallback((value: string) => {
        setSearchInput(value);
    }, []);

    const handleCategorySelect = useCallback((slug: string) => {
        setSelectedCategory(slug);
    }, []);

    const isSearching = searchInput !== debouncedSearch || isFetching;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

    // ============================================================
    // Render
    // ============================================================

    return (
        <section className="product-search-section" aria-label="Buscador de repuestos">
            {/* BCV Rate indicator */}
            <div className="bcv-banner">
                <span className="bcv-dot" aria-hidden="true" />
                <span>Tasa BCV: <strong>Bs. {bcvRate.toFixed(2)}</strong> / USD</span>
            </div>

            {/* Search bar */}
            <SearchBar
                value={searchInput}
                onChange={handleSearchChange}
                isLoading={isSearching}
            />

            {/* Mi Garaje Panel */}
            <div className="mi-garaje-panel">
                <h2 className="mi-garaje-title">
                    <svg className="w-5 h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Mi Garaje
                </h2>

                <div className="mi-garaje-select-wrapper">
                    <select
                        className="mi-garaje-select"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        aria-label="Seleccionar Marca"
                    >
                        <option value="">Todas las Marcas</option>
                        {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <svg className="w-4 h-4 mi-garaje-select-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                <div className="mi-garaje-select-wrapper">
                    <select
                        className="mi-garaje-select"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        aria-label="Seleccionar Modelo"
                    >
                        <option value="">Todos los Modelos</option>
                        {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <svg className="w-4 h-4 mi-garaje-select-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {(selectedBrand || selectedModel) && (
                    <button
                        type="button"
                        className="mi-garaje-btn mi-garaje-btn-active"
                        onClick={() => {
                            setSelectedBrand('');
                            setSelectedModel('');
                        }}
                    >
                        Limpiar Filtros
                    </button>
                )}
            </div>

            {/* Category filters */}
            <CategoryFilter
                categories={DEMO_CATEGORIES}
                selected={selectedCategory}
                onSelect={handleCategorySelect}
            />

            {/* Results */}
            <div className="results-section">
                {/* Loading state — skeletons */}
                {isLoading && <SkeletonGrid count={6} />}

                {/* Error state */}
                {isError && !isLoading && (
                    <div className="empty-state" role="alert">
                        <span className="empty-icon">⚠️</span>
                        <h3 className="empty-title">Error de conexión</h3>
                        <p className="empty-desc">
                            {(error as Error)?.message || 'No se pudo conectar al servidor. Verifica tu conexión.'}
                        </p>
                        <button
                            className="retry-btn"
                            onClick={() => window.location.reload()}
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* No results */}
                {!isLoading && !isError && products.length === 0 && (
                    <div className="empty-state">
                        <span className="empty-icon">🔍</span>
                        <h3 className="empty-title">Sin resultados</h3>
                        <p className="empty-desc">
                            {debouncedSearch
                                ? `No encontramos repuestos para "${debouncedSearch}". Intenta con otro término.`
                                : 'No hay repuestos disponibles en esta categoría.'}
                        </p>
                    </div>
                )}

                {/* Products grid */}
                {!isLoading && !isError && products.length > 0 && (
                    <>
                        <p className="results-count">
                            {products.length} {products.length === 1 ? 'resultado' : 'resultados'}
                            {isFetching && <span className="fetching-dot" aria-label="Actualizando..." />}
                        </p>
                        <div className="products-grid">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    bcvRate={bcvRate}
                                    phone={phone}
                                    selectedModel={selectedModel}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
