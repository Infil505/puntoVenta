@echo off
cd /d "%~dp0"

if not exist "node_modules" (
    echo Primera ejecución detectada...
    echo Instalando dependencias...
    npm install

    echo Compilando el proyecto...
    npm run build
)

echo Iniciando el servidor...
start "" /b cmd /c "npm start"

timeout /t 5 /nobreak >nul

start http://localhost:3000
