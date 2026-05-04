# DeliPro Landing Page

Сучасний лендінг для DeliPro — Telegram-бота для доставки.
Зроблено на **React 19 + Tailwind CSS + Framer Motion**.

## Що всередині

- Hero з анімованим dashboard + floating courier card
- Trust strip з лічильниками
- Features grid (6 фіч з іконками)
- Interactive Showcase — 6 вкладок з реальними анімованими мокапами:
  - Менеджер (форма замовлення)
  - Власник (dashboard з метриками, графіком, heatmap)
  - Кур'єр (телефонний інтерфейс з прийомом замовлення)
  - Карта замовлень (з пульсуючими пінами)
  - Звіти (з фільтром періоду + CSV)
  - Графік змін
- Pricing (3 тарифи з yearly toggle)
- Testimonials
- FAQ accordion
- Final CTA + Footer
- 4 мови: 🇺🇦 UK / 🇬🇧 EN / 🇵🇱 PL / 🇷🇺 RU

## Як запустити

```bash
cd frontend
yarn install        # або npm install
yarn start          # відкриється на http://localhost:3000
```

## Як збилдити в production

```bash
cd frontend
yarn build
# готовий бандл буде в frontend/build/
```

Можна задеплоїти на Vercel / Netlify / Railway / будь-який static host.

## Структура файлів

```
frontend/
├── src/
│   ├── App.js                 # Головний файл — всі секції лендінгу
│   ├── App.css
│   ├── index.js
│   ├── index.css              # Глобальні стилі, шрифти, анімації
│   ├── i18n.js                # Переклади на 4 мови + LanguageProvider
│   └── components/
│       ├── MockupsA.js        # Counter, Manager, Owner мокапи
│       └── MockupsB.js        # Courier, Map, Reports, Schedule мокапи
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Як редагувати

### Поміняти текст / переклади
Відкрий `src/i18n.js` — там всі тексти для 4-х мов в одному файлі.

### Поміняти кольори
В `src/index.css` (CSS-змінні `--brand`, `--text-main` і т.д.) і `tailwind.config.js`.
Брендовий колір зараз `#ff7652` (помаранчевий).

### Поміняти контент мокапів
Кожен мокап — звичайний React-компонент в `src/components/MockupsA.js` або `MockupsB.js`.
Числа, дані графіків, імена кур'єрів — все там.

### Додати/прибрати секцію
В `src/App.js` секції додаються в компоненті `Landing`:
```jsx
<main>
  <Hero />
  <TrustStrip />
  <Features />
  <Showcase />
  <Pricing />
  <Testimonials />
  <FAQ />
  <FinalCTA />
</main>
```

## Стек

- **React** `^19.0.0`
- **Tailwind CSS** `^3.4.17`
- **Framer Motion** `^12.38.0` (анімації)
- **lucide-react** (іконки)
- **CRACO** (Create React App configuration)

Шрифти: Clash Display (заголовки) + Satoshi (body) + JetBrains Mono — підвантажуються з Fontshare.

## CTA та посилання

В `src/App.js` знайди `https://t.me/` і `mailto:hello@delipro.app` — заміни на свої.
