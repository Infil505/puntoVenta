@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

title Cargando Aplicación

if not exist "node_modules" (
    cls
    echo Primera ejecucion detectada...
    echo Instalando dependencias...

    REM Ejecutar npm install y esperar a que termine
    call cmd /c "npm install --progress=false > install.log 2>&1"
    
    REM Verificar si npm install fue exitoso
    if %errorlevel% neq 0 (
        echo Error al instalar las dependencias. Verifica el archivo install.log para detalles.
        exit /b
    )

    cls
    echo Dependencias instaladas correctamente. Compilando el proyecto...
    REM Espera a que 'npm run build' termine
    call cmd /c "npm run build"
    
    REM Verificar si hubo algún error en el build
    if %errorlevel% neq 0 (
        echo Error al compilar el proyecto. Por favor, revisa los errores en la consola.
        exit /b
    )
) else (
    echo Dependencias ya instaladas. Preparando entorno...
)

cls

echo Esperando que el servidor este listo en el puerto 3000...
REM Esperar hasta que el servidor esté disponible en el puerto 3000
:WaitForServer
timeout /t 5 >nul
echo Checking if server is up...
REM Verificar si el servidor está respondiendo en el puerto 3000
powershell -Command "(Test-NetConnection -ComputerName localhost -Port 3000).TcpTestSucceeded" >nul
if errorlevel 1 (
    echo El servidor no está listo, reintentando...
    goto WaitForServer
)
echo Sistema listo. Abriendo aplicacion...
timeout /t 3 /nobreak >nul
exit /b
