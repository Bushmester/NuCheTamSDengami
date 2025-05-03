# Welcome to NuCheTamSDengami app 👋

# Скринкаст
https://youtube.com/shorts/hMTzp7fMNYs

## Описание проекта
NuCheTamSDengami - минималистичное приложение для учета ежедневного остатка свободного бюджета.

## Цель приложения
1. Позволить пользователям эффективно контролировать свои ежедневные траты.
2. Стимулировать более осознанное отношение к потреблению за счет минималистичного и удобного интерфейса.
3. Упростить процесс управления бюджетом, исключив сложные категории и долгосрочные финансовые планы.

## Бизнес-требования
- Пользователь может задать стартовую сумму бюджета и указать конечную дату подсчета (не более 42 дней от текущей даты). На основе этих данных приложение отображает актуальный остаток.
- Должна быть возможность быстро вносить доходы и расходы, с автоматическим пересчетом текущего бюджета.
- Приложение предоставляет возможность ввести расход и пересчитать текущий остаток.

## Функциональные требования
1) Учет ежедневного остатка:

      Пользователь вводит начальный баланс и конечную дату подсчета (до 42 дней с момента ввода). Приложение ведет ежедневный подсчет остатка средств. 

2) Добавление расходов:

      Пользователь может легко и быстро вносить расходы. Каждое новое действие пересчитывает актуальный остаток бюджета.


3) История последних операций:
	
	Приложение предоставляет доступ к истории операций, где пользователь может видеть все внесенные изменения (расходы) в хронологическом порядке.

4) Минимальная аналитика:

   Приложение рассчитывает и отображает дневной лимит — это остаток бюджета деленный на количество оставшихся дней до указанной конечной даты.

## Нефункциональные требования
1) Требования к дизайну

   - Удобный и интуитивно понятный интерфейс с контрастными акцентами на главных деталях, позволяющий легко ориентироваться в функционале системы.
   - Возможность сменить тему на темную
   - Адаптивный дизайн

## Технические требования
- Стек технологий:
   - TypeScript
   - React Native


This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
