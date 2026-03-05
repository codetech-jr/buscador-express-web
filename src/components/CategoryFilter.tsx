'use client';

import type { Category } from '@/types';

interface CategoryFilterProps {
    categories: Category[];
    selected: string;
    onSelect: (slug: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
    return (
        <div className="category-filter" role="navigation" aria-label="Filtrar por categoría">
            <div className="category-scroll">
                {/* All option */}
                <button
                    type="button"
                    onClick={() => onSelect('')}
                    className={`category-chip ${selected === '' ? 'chip-active' : 'chip-inactive'}`}
                    aria-pressed={selected === ''}
                >
                    🔍 Todos
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => onSelect(cat.slug)}
                        className={`category-chip ${selected === cat.slug ? 'chip-active' : 'chip-inactive'}`}
                        aria-pressed={selected === cat.slug}
                    >
                        {cat.icon} {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
