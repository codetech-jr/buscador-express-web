-- ============================================================
-- SEED DATA — Datos de ejemplo para demo
-- Ejecutar DESPUÉS de schema.sql
-- ============================================================

-- Insertar productos de muestra
-- Reemplaza category_id con los UUIDs reales de tu DB
-- (Consulta: SELECT id, slug FROM categories;)

WITH cats AS (
  SELECT id, slug FROM categories
)
INSERT INTO products (name, description, category_id, brand, compatible_models, compatible_years, price_usd, stock, sku)
SELECT
  p.name, p.description, cats.id, p.brand,
  p.compatible_models::TEXT[], p.compatible_years::INT[],
  p.price_usd, p.stock, p.sku
FROM cats, (VALUES
  -- ENCENDIDO
  ('Bujía NGK CR7HSA',
   'Bujía estándar de alto rendimiento para motos 4T de 125cc',
   'encendido', 'NGK',
   ARRAY['Honda CG 125','Honda CB 125','Yamaha YBR 125','Suzuki GS 125'],
   ARRAY[2015,2016,2017,2018,2019,2020,2021,2022],
   3.50, 24, 'BUJ-NGK-CR7HSA'),

  ('Bobina de Encendido Honda CG125',
   'Bobina CDI original compatible con motor 4T 125cc',
   'encendido', 'Honda OEM',
   ARRAY['Honda CG 125','Honda Biz 125'],
   ARRAY[2016,2017,2018,2019,2020],
   12.00, 8, 'BOB-HON-CG125'),

  -- FILTROS
  ('Filtro de Aceite HF-111',
   'Filtro de aceite de alto flujo con tela metálica lavable',
   'filtros', 'Hiflofiltro',
   ARRAY['Honda CG 125','Honda CB 125','Honda XR 125'],
   ARRAY[2014,2015,2016,2017,2018,2019,2020,2021],
   5.50, 15, 'FIL-ACE-HF111'),

  ('Filtro de Aire Yamaha YBR125',
   'Elemento filtrante de aire de espuma, lavable y reutilizable',
   'filtros', 'Genuine Yamaha',
   ARRAY['Yamaha YBR 125','Yamaha YBR 125G'],
   ARRAY[2016,2017,2018,2019,2020,2021,2022],
   7.00, 11, 'FIL-AIR-YBR125'),

  -- TRANSMISION
  ('Kit de Cadena 428H x 120 Eslabones',
   'Kit completo: cadena + catalina delantera + catalina trasera',
   'transmision', 'DID',
   ARRAY['Honda CG 125','Yamaha YBR 125','Suzuki GS 125','Bera BR 150'],
   ARRAY[2015,2016,2017,2018,2019,2020,2021],
   28.00, 6, 'KIT-CAD-428H120'),

  ('Piñón Salida Caja 14T Honda CG',
   'Piñón de transmisión delantera, acero tratado',
   'transmision', 'Afam',
   ARRAY['Honda CG 125','Honda CB 125F'],
   ARRAY[2016,2017,2018,2019,2020,2021,2022],
   8.50, 9, 'PIN-14T-HCGG'),

  -- MOTOR
  ('Empaque de Culata Honda CG125',
   'Juego de empaques de culata con retenes de válvulas',
   'motor', 'Honda OEM',
   ARRAY['Honda CG 125'],
   ARRAY[2015,2016,2017,2018,2019,2020],
   9.00, 5, 'EMP-CUL-CG125'),

  ('Carburador Completo YBR125',
   'Carburador de reemplazo con todos los jets incluidos',
   'motor', 'Mikuni',
   ARRAY['Yamaha YBR 125','Yamaha YBR 125G'],
   ARRAY[2016,2017,2018,2019,2020,2021],
   35.00, 3, 'CARB-MIK-YBR125'),

  -- FRENOS
  ('Pastillas de Freno Delantero Honda CG',
   'Pastillas cerámicas de larga duración, baja temperatura',
   'frenos', 'EBC Brakes',
   ARRAY['Honda CG 125','Honda CB 125F','Honda Biz 125'],
   ARRAY[2017,2018,2019,2020,2021,2022],
   11.00, 14, 'PAS-EBC-HCGF'),

  ('Zapatas de Freno Trasero YBR125',
   'Zapatas de freno de tambor con alto coeficiente de fricción',
   'frenos', 'SBS',
   ARRAY['Yamaha YBR 125'],
   ARRAY[2016,2017,2018,2019,2020,2021,2022],
   8.00, 18, 'ZAP-SBS-YBR125'),

  -- ELECTRICO
  ('Batería YTX5L-BS 12V 4Ah',
   'Batería de gel sellada, sin mantenimiento, alta descarga',
   'electrico', 'Yuasa',
   ARRAY['Honda CG 125','Honda CB 125','Yamaha YBR 125','Suzuki GS 125'],
   ARRAY[2015,2016,2017,2018,2019,2020,2021,2022],
   22.00, 7, 'BAT-YTX5L-BS'),

  -- LUBRICANTES
  ('Aceite de Motor Motul 10W-40 1L',
   'Aceite sintético para motores 4T de alta exigencia',
   'lubricantes', 'Motul',
   ARRAY['Honda CG 125','Yamaha YBR 125','Suzuki GS 125','Bera BR 150','AKT 125'],
   ARRAY[2015,2016,2017,2018,2019,2020,2021,2022],
   9.50, 30, 'LUB-MOT-10W40')
) AS p(name, description, slug, brand, compatible_models, compatible_years, price_usd, stock, sku)
WHERE cats.slug = p.slug;
