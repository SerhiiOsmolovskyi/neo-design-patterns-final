# Домашка - Фінальний проєкт

# «Генератор резюме з JSON‑опису»

## Опис завдання

У цьому фінальному домашньому завданні необхідно реалізувати генератор резюме, який демонструє застосування п'яти патернів проектування: Facade, Template Method, Factory Method, Composite, Decorator.

Завдання має на меті навчити вас:

- Правильно застосовувати патерни проектування в практичних сценаріях
- Створювати модульну, розширювану архітектуру
- Структурувати код з використанням патернів

Необхідно сформувати самодостатню HTML‑сторінку‑резюме, яка будується з єдиного джерела даних — файл `resume.json`. Усі стилі фіксовані у `styles.css`, сторонніх бібліотек або фреймворків не використовуємо. Після компіляції `main.ts` і відкриття `index.html` сторінка повинна безпомилково відобразити повне резюме, а проєкти з прапорцем `"isRecent": true` — підсвітити червоним.

## Структура проекту

```
/
├── index.html                  # Статичний макет сторінки
├── resume.json                 # Джерело даних для сторінки
├── vite.config.js              # Конфігурація Vite
├── tsconfig.json               # Конфігурація TypeScript
├── dist/                       # Директорія для збірки
└── src/
    ├── styles.css              # Базові стилі + .highlight
    ├── facade/
    │   └── ResumePage.ts       # Фасад проєкту
    ├── importer/
    │   ├── AbstractImporter.ts # Базовий Template Method
    │   └── ResumeImporter.ts   # Конкретна реалізація
    ├── blocks/                 # Конкретні блоки резюме
    │   ├── BlockFactory.ts     # Factory Method
    │   ├── HeaderBlock.ts
    │   ├── SummaryBlock.ts
    │   ├── ExperienceBlock.ts  # Composite‑контейнер
    │   ├── ProjectBlock.ts
    │   ├── EducationBlock.ts
    │   └── SkillsBlock.ts
    ├── decorators/
    │   └── HighlightDecorator.ts
    ├── models/
    │   └── ResumeModel.ts      # Типи внутрішньої моделі
    └── main.ts                 # Точка входу
```

## Запуск проекту

1. Встановлення залежностей:

   ```bash
   npm install
   ```

2. Режим розробки:

   ```bash
   npm run dev
   ```

3. Збірка для продакшену:

   ```bash
   npm run build
   ```

4. Попередній перегляд збірки:
   ```bash
   npm run preview
   ```

## Технології

- TypeScript
- Vite (збірка та розробка)
- Патерни проектування
- JSON для зберігання даних
- CSS для стилізації


## Як саме реалізовані патерни

Facade (ResumePage)
src/facade/ResumePage.ts — надає простий метод init(jsonPath), який:

завантажує JSON (fetchData),

створює ResumeImporter і викликає import().

Template Method (AbstractImporter → ResumeImporter)
src/importer/AbstractImporter.ts визначає алгоритм import(): validate → map → render.
Конкретні кроки реалізовані у src/importer/ResumeImporter.ts:

validate() — перевірка наявності header, summary, experience, education, skills;

map() — приведення типів до ResumeModel;

render() — створення блоків і додавання у DOM.

Factory Method (BlockFactory)
src/blocks/BlockFactory.ts — метод createBlock(type, model) повертає потрібний блок:
HeaderBlock, SummaryBlock, ExperienceBlock, EducationBlock, SkillsBlock.

Composite (ExperienceBlock → ProjectBlock)
src/blocks/ExperienceBlock.ts — контейнер, що рендерить усі записи досвіду і кожен їхній
проект як листовий вузол (ProjectBlock). Обробка відбувається рекурсивно по масиву записів.

Decorator (HighlightDecorator)
src/decorators/HighlightDecorator.ts — обгортає будь-який IBlock.
У ExperienceBlock кожен ProjectBlock із isRecent: true декорується та отримує .highlight.

Як додати новий блок (напр., Certificates)

Додайте дані у resume.json, наприклад:

"certificates": [
  { "name": "AWS Certified Cloud Practitioner", "year": "2025" }
]


Оновіть модель у src/models/ResumeModel.ts:

export interface ResumeModel {
  // ...
  certificates?: { name: string; year: string }[];
}


Створіть новий клас блоку, наприклад src/blocks/CertificatesBlock.ts,
який реалізує IBlock і рендерить секцію.

Додайте гілку у фабриці src/blocks/BlockFactory.ts:

case "certificates":
  return new CertificatesBlock(m.certificates ?? []);


Додайте новий тип у BlockType та в ResumeImporter.render() — порядок рендерингу.