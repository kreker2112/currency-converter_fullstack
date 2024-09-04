# Используем официальный Node.js образ в качестве базового
FROM node:18 AS build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Собираем проект для production (если нужно)
RUN npm run build

# Команда для запуска обоих сервисов
CMD ["npm", "run", "start"]