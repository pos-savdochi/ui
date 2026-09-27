# ui

`@savdochi-uz/ui` — `client`, `office`, `mail` va `landing` bo'lishadigan
komponentlar, Tailwind qatlami va `cn()` yordamchisi.

## Nega alohida repo bor

2026-08-21 da office monorepodan ajratilganda **8 ta primitiv nusxalandi**
(button, input, label, dialog, badge, sheet, dropdown-menu, separator).
Nusxa olingan komponent — bir marta tuzatiladigan va qolgan joylarda
tuzatilmay qoladigan xato manbai. Bu repo o'sha nusxalashni yopadi.

## Iste'mol qilish

`.npmrc` (har bir iste'molchi repoda):

```
@savdochi-uz:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

```bash
pnpm add @savdochi-uz/ui
```

Next.js ilovasida yana ikki narsa kerak:

```ts
// next.config.ts — paket xom .tsx eksport qiladi, transpilyatsiya iste'molchida
transpilePackages: ["@savdochi-uz/ui"],
```

```css
/* app/globals.css */
@import "@savdochi-uz/ui/globals.css";
@source "../app/**/*.{ts,tsx}";      /* O'Z fayllaringiz */
@source "../components/**/*.{ts,tsx}";
```

`@source` ni **o'zingiz** e'lon qilasiz. Paket faqat o'z komponentlarini
sanaydi; avval bu yerda monorepo `apps/` ga ishora qiluvchi glob turardi va u
paket `node_modules` ichiga tushganda butun daraxtni kezib chiqardi.

## Chek chop etish — alohida

```ts
import "@savdochi-uz/ui/styles/receipt-print.css"   // FAQAT POS ilovasida
```

Bu fayl `globals.css` dan ataylab ajratilgan. Undagi birinchi qoida —
`body *:not(:has(.receipt-print))` — sahifada `.receipt-print` sinfi bo'lmasa
**butun sahifani** yashiradi. Umumiy uslublar ichida turgani uchun u office'ga
meros bo'lib o'tgan va u yerda har qanday sahifani chop etish bo'sh varaq
bergan.

## Reliz

Versiyani `package.json` da oshiring → `main` ga merge → tag qo'ying:

```bash
git tag v0.2.0 && git push origin v0.2.0
```

Tag GitHub Packages'ga publish qiladi. **Tagsiz publish yo'q** — bu tasodifiy
reliz qilishning oldini oladi.

## Dizayn tokenlari (v0.2.0) — mobil dizayn tili

Qiymatlar `client/apps/mobile/src/lib/theme` (mobil ilova) bilan bir xil, brend —
Savdochi Brand Kit v1.0 (`client/design/brand/`); qoida — `client/design/theme.md`.

- Sirtlar: `bg-background` (ground `#f4f6f8` / `#0b0e11`), `bg-card` (paper),
  `bg-muted` (cho'kkan — input, plitka, chip), `border-border` (hairline),
  `border-border-strong`, `text-muted-foreground` (ink2), `text-faint` (ink3, matn uchun emas).
- Holat: `text-{success,warning,destructive}`, `bg-{success,warning,destructive}-soft`,
  `*-foreground`. Chrome: `bg-chrome`, `text-on-chrome`, `bg-on-chrome-soft` (invert bo'lmaydi).
- Accent: `--primary` = `var(--acc-l, …)` yorug'da, `var(--acc-d, …)` qorong'ida — iste'molchi
  `<html>` ga `--acc-l`/`--acc-d` qo'yadi, tema almashganda qayta bo'yash kerak emas.
  `bg-tint` accent'dan hisoblanadi; `--brand` (logo) accent'dan mustaqil.
- Grafik: `--chart-1..5`, `bg-chart-{sky,violet,teal,orange,muted}`.
- Geometriya: blok `rounded-2xl` (24), input/plitka 14, tugma/segment — `rounded-full`.
  Bloklar soyasiz; **suzuvchi qatlamlar** (popover, menyu, select, command, alert) — `shadow-float`.
- Primitivlar: pill `Button` (default 44, sm 36, lg 52; variant nomlari o'zgarmagan),
  cho'kkan `Input`/`Select`/`NativeSelect` (44), segment ko'rinishidagi `Toggle`/`ToggleGroup`.

v0.1.1 → v0.2.0 ko'rinishni butunlay o'zgartiradi — iste'molchi o'zi tanlagan paytda ko'taradi.

## Ma'lum qarz

`globals.css` `shadcn` paketidan `tailwind.css` ni import qiladi, ya'ni CLI
paketi bitta CSS fayl uchun runtime bog'liqlik bo'lib qolgan. Uni ko'chirib
olish kerak, lekin bu alohida ish.

## Qoidalar

- Har bir komponent temaga bog'liq bo'lmasin: rangni to'g'ridan-to'g'ri yozmang,
  CSS o'zgaruvchilaridan foydalaning.
- **Print izolyatsiyasi kabi ilovaga xos uslublarni bu yerga qo'ymang.** Umumiy
  `globals.css` da turgan POS chek uslubi (`body *:not(:has(.receipt-print))`)
  boshqa ilovalarda har bir sahifani bo'sh varaqqa aylantirgan.
