#!/bin/bash

set -e  # Якщо якась команда не виконається — зупинити скрипт

echo "=== 🧹 Зупинка попередніх контейнерів..."
cd /home/kreker2112/projects/currency-converter_fullstack/
docker-compose down

echo "=== 🛰️  Синхронізація проекту з локальної машини..."
sudo rsync -av --delete /media/sf_currency-converter_fullstack/ /home/kreker2112/projects/currency-converter_fullstack/

echo "=== 🔒 Встановлення прав доступу до acme.json..."
sudo chmod 600 /home/kreker2112/projects/currency-converter_fullstack/traefik/letsencrypt/acme.json

echo "=== 🛠️  Побудова та запуск контейнерів..."
docker-compose up --build -d

echo "✅ Готово!"