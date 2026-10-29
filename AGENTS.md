<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Согласование изменений

- Перед каждой правкой покажи точный diff и кратко объясни её цель.
  Для нового файла покажи его содержимое.
- Дождись явного подтверждения пользователя перед записью.
  Разрешение относится только к показанным изменениям.
- Согласование задачи или плана не разрешает заранее неизвестные правки.
- Изменения после проверки или тестов требуют нового согласования.
- Правило распространяется на код, тесты, зависимости, конфигурацию,
  документацию и сам AGENTS.md.
- Не запускай форматирование с записью, autofix, генерацию исходников
  или обновление зависимостей без предварительного согласования изменений.
- Чтение, поиск и проверки разрешены без отдельного подтверждения.
  Стандартные артефакты сборки и тестов создавать разрешено.

## Git и GitHub

- Все команды Git и действия в GitHub пользователь выполняет вручную.
  Подготавливай команды и тексты, но не выполняй их самостоятельно.
- Веди каждую ветку небольшими логически завершёнными коммитами.
  Связанные тесты включай в коммит соответствующего изменения.
- После завершения и проверки каждого шага предоставляй точные команды
  добавления файлов и коммита с сообщением на английском.
  Дождись подтверждения создания коммита перед следующим шагом.
- Готовь PR после завершения всей задачи ветки и необходимых проверок.
