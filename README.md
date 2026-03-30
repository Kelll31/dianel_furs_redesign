# DIANEL FURS — Премиум бутик меховых изделий

![DIANEL FURS](https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2000&auto=format&fit=crop)

**Dianel Furs** — это современный веб-сайт премиум бутика меховых изделий из самого сердца Кавказа (г. Пятигорск). Проект представляет собой интерактивную витрину с возможностью онлайн-заказа, сравнения товаров и записи на индивидуальный пошив.

## 📋 Содержание

- [Особенности](#-особенности)
- [Технологический стек](#-технологический-стек)
- [Структура проекта](#-структура-проекта)
- [Установка и запуск](#-установка-и-запуск)
- [Доступные скрипты](#-доступные-скрипты)
- [Структура компонентов](#-структура-компонентов)
- [Функционал](#-функционал)
- [Деплой](#-деплой)
- [Контакты](#-контакты)

## ✨ Особенности

- **Премиум дизайн** — элегантный минималистичный интерфейс с тёмной темой и золотыми акцентами
- **Адаптивная вёрстка** — полная поддержка мобильных устройств и планшетов
- **Анимации** — плавные переходы и эффекты с использованием `motion/react`
- **3D-карточки** — интерактивные карточки коллекций с параллакс-эффектом
- **Тёмная/светлая тема** — переключение между режимами с сохранением в localStorage
- **Поиск и фильтрация** — умный поиск товаров с Fuse.js и расширенные фильтры
- **Сравнение товаров** — возможность сравнения до 3 товаров одновременно
- **Избранное и корзина** — полный цикл покупок с сохранением состояния
- **Яндекс.Карты** — интерактивная карта с кастомными метками

## 🛠 Технологический стек

| Категория | Технология |
|-----------|------------|
| **Фреймворк** | React 19 |
| **Язык** | TypeScript 5.8 |
| **Сборка** | Vite 6 |
| **Стили** | Tailwind CSS 4 |
| **Анимации** | Motion (Framer Motion) |
| **Роутинг** | React Router DOM 7 |
| **Иконки** | Lucide React |
| **Уведомления** | Sonner |
| **SEO** | React Helmet Async |
| **Поиск** | Fuse.js |
| **Карты** | Яндекс.Карты API |

## 📁 Структура проекта

```
dianel_furs_redesign/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions для деплоя
├── src/
│   ├── components/             # React компоненты
│   │   ├── About.tsx           # О компании
│   │   ├── Boutique.tsx        # Страница бутика с картой
│   │   ├── CartModal.tsx       # Модальное окно корзины
│   │   ├── Catalog.tsx         # Каталог товаров
│   │   ├── Collection.tsx      # Страница коллекции
│   │   ├── CollectionEco.tsx   # Коллекция эко-меха
│   │   ├── CollectionFur.tsx   # Коллекция пушнины
│   │   ├── CollectionNutria.tsx# Коллекция нутрии
│   │   ├── CollectionSheepskin.tsx # Коллекция овчины
│   │   ├── CollectionShowcase.tsx  # Витрина коллекций
│   │   ├── CompareModal.tsx    # Модальное окно сравнения
│   │   ├── Contact.tsx         # Контакты
│   │   ├── Footer.tsx          # Подвал сайта
│   │   ├── Gallery.tsx         # Галерея
│   │   ├── Hero.tsx            # Главный экран
│   │   ├── Home.tsx            # Главная страница
│   │   ├── LazyImage.tsx       # Ленивая загрузка изображений
│   │   ├── Lookbook.tsx        # Лукбук
│   │   ├── Marquee.tsx         # Бегущая строка
│   │   ├── Navbar.tsx          # Навигационная панель
│   │   ├── Preloader.tsx       # Экран загрузки
│   │   ├── ProductModal.tsx    # Модальное окно товара
│   │   ├── RotatingCTA.tsx     # Вращающийся CTA
│   │   ├── ScrollToTop.tsx     # Прокрутка наверх
│   │   └── Service.tsx         # Услуги сервиса
│   ├── context/
│   │   └── AppContext.tsx      # Глобальное состояние приложения
│   ├── data/
│   │   └── products.ts         # Данные товаров
│   ├── images/                 # Статические изображения
│   ├── types.ts                # TypeScript типы
│   ├── App.tsx                 # Корневой компонент
│   ├── index.css               # Глобальные стили
│   └── main.tsx                # Точка входа
├── index.html                  # HTML шаблон
├── package.json                # Зависимости и скрипты
├── tsconfig.json               # Конфигурация TypeScript
├── vite.config.ts              # Конфигурация Vite
└── README.md                   # Эта документация
```

## 🚀 Установка и запуск

### Требования

- Node.js 18+ или 20+
- npm или yarn

### Шаг 1: Установка зависимостей

```bash
npm install
```

### Шаг 2: Запуск сервера разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

### Шаг 3: Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`.

## 📜 Доступные скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск сервера разработки (порт 3000) |
| `npm run build` | Сборка проекта для продакшена |
| `npm run preview` | Предпросмотр продакшен-сборки |
| `npm run clean` | Очистка папки dist |
| `npm run lint` | Проверка TypeScript без компиляции |

## 🧩 Структура компонентов

### Основные страницы

| Компонент | Маршрут | Описание |
|-----------|---------|----------|
| [`Home`](src/components/Home.tsx:1) | `/` | Главная страница со всеми секциями |
| [`Collection`](src/components/Collection.tsx:1) | `/collection` | Общая страница коллекции |
| [`CollectionEco`](src/components/CollectionEco.tsx:1) | `/collection/eco` | Коллекция эко-меха |
| [`CollectionNutria`](src/components/CollectionNutria.tsx:1) | `/collection/nutria` | Коллекция нутрии |
| [`CollectionSheepskin`](src/components/CollectionSheepskin.tsx:1) | `/collection/sheepskin` | Коллекция овчины |
| [`CollectionFur`](src/components/CollectionFur.tsx:1) | `/collection/fur` | Коллекция пушнины |
| [`Catalog`](src/components/Catalog.tsx:1) | `/catalog` | Каталог товаров с фильтрами |
| [`Boutique`](src/components/Boutique.tsx:1) | `/boutique` | Страница бутика с картой |
| [`Service`](src/components/Service.tsx:1) | `/service` | Услуги сервиса |

### Общие компоненты

- **[`Navbar`](src/components/Navbar.tsx:1)** — навигация с поиском, корзиной, избранным и сравнением
- **[`Footer`](src/components/Footer.tsx:1)** — подвал с контактной информацией
- **[`Preloader`](src/components/Preloader.tsx:1)** — анимированный экран загрузки
- **[`Hero`](src/components/Hero.tsx:1)** — главный экран с параллакс-эффектом
- **[`CollectionShowcase`](src/components/CollectionShowcase.tsx:1)** — витрина коллекций с 3D-карточками

## ⚙️ Функционал

### Управление состоянием (AppContext)

[`AppContext`](src/context/AppContext.tsx:1) предоставляет глобальное состояние для:

- **Избранное** — добавление/удаление товаров в избранное
- **Корзина** — управление товарами в корзине (добавление, удаление, количество)
- **Сравнение** — сравнение до 3 товаров одновременно
- **Тема** — переключение тёмной/светлой темы

### Типы данных

Основные типы определены в [`types.ts`](src/types.ts:1):

```typescript
interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  image: string;
  category: string;
  size: "small" | "medium" | "large";
  tags: string[];
  colors: string[];
  availableSizes: string[];
}
```

### Категории товаров

- **Пушнина** — норка, соболь, лиса, песец
- **Эко-мех** — этичные альтернативы натуральному меху
- **Нутрия** — практичные изделия из стриженой нутрии
- **Овчина** — дубленки и пальто из мериноса

## 🌐 Деплой

Проект настроен для автоматического деплоя на **GitHub Pages** через GitHub Actions.

### Настройка

1. Убедитесь, что в репозитории включён GitHub Pages
2. Запушьте изменения в ветку `main`
3. GitHub Actions автоматически запустит сборку и деплой

Workflow файл: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml:1)

### Ручной деплой

```bash
# Сборка
npm run build

# Деплой собранной папки dist/
# (используйте предпочитаемый метод деплоя)
```

## 📞 Контакты

**Dianel Furs**

- **Адрес:** г. Пятигорск, Черкесское шоссе, 22с2
- **Email:** dianel888@mail.ru
- **Телефон:** +7 (928) 010-02-08, +7 (988) 092-28-88
- **Режим работы:** 09:00 — 19:00 (ежедневно)

### Социальные сети

- [Telegram](https://t.me/dianel_furs)
- [VK](https://vk.ru/dianel_furs)

---

© 2026 Dianel Furs. Все права защищены.
