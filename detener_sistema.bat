@echo off
REM Detener cualquier proceso de node.js en ejecución
taskkill /f /im node.exe >nul 2>&1
echo Servidor de Node.js detenido (si estaba en ejecucion).
pause

