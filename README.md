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

## Reliz

Versiyani `package.json` da oshiring → `main` ga merge → tag qo'ying:

```bash
git tag v0.2.0 && git push origin v0.2.0
```

Tag GitHub Packages'ga publish qiladi. **Tagsiz publish yo'q** — bu tasodifiy
reliz qilishning oldini oladi.

## Qoidalar

- Har bir komponent temaga bog'liq bo'lmasin: rangni to'g'ridan-to'g'ri yozmang,
  CSS o'zgaruvchilaridan foydalaning.
- **Print izolyatsiyasi kabi ilovaga xos uslublarni bu yerga qo'ymang.** Umumiy
  `globals.css` da turgan POS chek uslubi (`body *:not(:has(.receipt-print))`)
  boshqa ilovalarda har bir sahifani bo'sh varaqqa aylantirgan.
