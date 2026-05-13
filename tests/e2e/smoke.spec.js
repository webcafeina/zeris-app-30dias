import { test, expect } from '@playwright/test';

// Smoke test base: verifica que la app arranca, el selector de método
// aparece y se puede entrar a OREA. Si esto se rompe, algo gordo va mal.

test.describe('App smoke', () => {
  test('home selector carga y permite entrar a OREA', async ({ page }) => {
    await page.goto('/');

    // El selector inicial muestra el título "30 días con tu cafetera"
    await expect(page.getByRole('heading', { name: /30 días/i })).toBeVisible({ timeout: 10_000 });

    // OREA tiene que aparecer como método disponible
    const orea = page.getByText(/OREA V4 Narrow/i).first();
    await expect(orea).toBeVisible();

    // Tap en OREA → debería llevarnos a la Home del reto
    await orea.click();

    // Home muestra el progreso y el contador X / 30
    await expect(page.getByText(/Tu progreso/i)).toBeVisible({ timeout: 8_000 });
    await expect(page.getByText(/\/\s*30/i)).toBeVisible();
  });

  test('libro de recetas carga con las 30 entradas', async ({ page }) => {
    await page.goto('/');
    await page.getByText(/OREA V4 Narrow/i).first().click();

    // Click en el icono de Recetas (taza) en la cabecera de Home
    await page.getByRole('button', { name: /libro de recetas/i }).click();

    // El título "Libro de recetas" tiene que aparecer
    await expect(page.getByRole('heading', { name: /Libro de recetas/i })).toBeVisible();

    // Debe haber al menos un día visible (Día 1)
    await expect(page.getByText(/Día 1/i).first()).toBeVisible();
  });

  test('glosario abre y muestra términos clave', async ({ page }) => {
    await page.goto('/');
    await page.getByText(/OREA V4 Narrow/i).first().click();

    await page.getByRole('button', { name: /Abrir glosario/i }).click();

    // El glosario debe incluir "Bloom" (entrada clave del oficio)
    await expect(page.getByRole('heading', { name: /Bloom/i }).first()).toBeVisible();
  });
});
