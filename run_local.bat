@echo off
echo [SIMIL DEV] Iniciando servidor local...
echo [SIMIL DEV] Tentando usar Python (metodo mais estavel no seu sistema)...
python -m http.server 3000
if %errorlevel% neq 0 (
    echo [ERROR] Python nao encontrado. Tentando PHP...
    php -S localhost:3000
)
if %errorlevel% neq 0 (
    echo [ERROR] Nao foi possivel iniciar o servidor. Certifique-se de que Python ou PHP estao instalados.
)
pause
