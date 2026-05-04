# Midnight Aurora Auth

SPA-экран аутентификации на `React + Vite + TypeScript` без библиотек UI-компонентов.

## Демо

- GitHub Pages: https://takemyenergy13.github.io/midnight-aurora-auth/
- Репозиторий: https://github.com/TakeMyEnerGy13/midnight-aurora-auth

## Что внутри

- вход по `email + password`
- встроенная валидация
- состояния `loading`, `error`, `success`
- переключение видимости пароля
- корректные состояния фокуса для клавиатурной навигации
- тема `Midnight Aurora`
- резервная тема `Linen`

## Как открыть страницу из GitHub-репозитория

1. Открой репозиторий: `https://github.com/TakeMyEnerGy13/midnight-aurora-auth`
2. Перейди по ссылке GitHub Pages:
   `https://takemyenergy13.github.io/midnight-aurora-auth/`

Если нужно проверить статус публикации:

1. Открой вкладку `Actions`
2. Найди workflow `Deploy to GitHub Pages`
3. После успешного статуса страница доступна по ссылке выше

## Локальный запуск

```bash
npm install
npm run dev
```

## Сборка production-версии

```bash
npm run build
```

## Примечания

- Email со словом `error` вызывает имитацию серверной ошибки
- Переключатель темы добавлен для просмотра обеих визуальных концепций
- В `vite.config.ts` указан `base: './'`, чтобы сборка корректно работала на GitHub Pages

## Деплой

В репозитории уже настроен GitHub Actions workflow: `.github/workflows/deploy.yml`.

Новый push в `main` автоматически публикует обновлённую версию на GitHub Pages.
