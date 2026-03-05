-- ============================================================
-- BUSCADOR DE REPUESTOS EXPRESS — Supabase Schema
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Configuración global (tasa BCV, teléfono WhatsApp, etc.)
CREATE TABLE IF NOT EXISTS config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Valor inicial de la tasa BCV (actualizar manualmente o via cron)
INSERT INTO config (key, value) VALUES
  ('bcv_rate', '36.50'),
  ('whatsapp_phone', '584120000000'),
  ('store_name', 'Repuestos Luigi'),
  ('store_location', 'Charallave, Miranda')
ON CONFLICT (key) DO NOTHING;

-- 2. Categorías de repuestos
CREATE TABLE IF NOT EXISTS categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT UNIQUE NOT NULL,
  icon       TEXT,  -- Emoji o nombre de ícono
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO categories (name, slug, icon, sort_order) VALUES
  ('Encendido',   'encendido',  '⚡', 1),
  ('Filtros',     'filtros',    '🔧', 2),
  ('Transmisión', 'transmision','⛓️', 3),
  ('Motor',       'motor',      '🔩', 4),
  ('Frenos',      'frenos',     '🛑', 5),
  ('Carrocería',  'carroceria', '🏍️', 6),
  ('Eléctrico',   'electrico',  '💡', 7),
  ('Lubricantes', 'lubricantes','🛢️', 8)
ON CONFLICT (slug) DO NOTHING;

-- 3. Productos / Repuestos
CREATE TABLE IF NOT EXISTS products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  description       TEXT,
  category_id       UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand             TEXT,             -- Marca del repuesto: NGK, Mikuni, Honda OEM, etc.
  compatible_models TEXT[] DEFAULT '{}', -- ['Honda CG 125', 'Yamaha YBR 125']
  compatible_years  INT[]  DEFAULT '{}', -- [2018, 2019, 2020, 2021]
  price_usd         NUMERIC(10,2) NOT NULL,
  stock             INT DEFAULT 0,
  sku               TEXT UNIQUE,      -- Código interno del repuesto
  image_url         TEXT,
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- Índice de búsqueda full-text en español
CREATE INDEX IF NOT EXISTS idx_products_fts
  ON products USING gin(
    to_tsvector('spanish', coalesce(name,'') || ' ' || coalesce(description,'') || ' ' || coalesce(brand,''))
  );

-- Índice para filtro por modelos compatibles
CREATE INDEX IF NOT EXISTS idx_products_models
  ON products USING gin(compatible_models);

-- Índice para filtro por categoría
CREATE INDEX IF NOT EXISTS idx_products_category
  ON products(category_id) WHERE is_active = true;

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE products  ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE config     ENABLE ROW LEVEL SECURITY;

-- Lectura pública de productos activos
CREATE POLICY "Public can read active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Lectura pública de categorías
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  USING (true);

-- Lectura pública de config
CREATE POLICY "Public can read config"
  ON config FOR SELECT
  USING (true);

-- Escritura solo para usuarios autenticados (admin)
CREATE POLICY "Authenticated can manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage config"
  ON config FOR ALL
  USING (auth.role() = 'authenticated');
