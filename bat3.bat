@echo off
REM Check if NirCmd exists
where nircmd.exe > NUL 2>&1
IF "%ERRORLEVEL%"=="1" (
    echo NirCmd not found. Please make sure nircmd.exe is in the System32 directory.
    exit
)
echo NirCmd is installed and ready to use.

REM Start services if the tab with title 'Concrete Builder' does not exist
powershell -Command "if (!(Get-Process | Where-Object { $_.MainWindowTitle -match 'بتن بنا' })) { exit 1 }"
IF "%ERRORLEVEL%"=="1" (
    echo 'Concrete Builder' tab is not found. Starting services...

    REM Start XAMPP
    echo Starting XAMPP...
    nircmd.exe exec hide "C:\xampp\xampp_start.exe"
    timeout /t 10

    REM Start yarn dev
    echo Starting yarn dev...
    start "" cmd /c "cd C:\xampp\htdocs\beton && yarn dev"
    timeout /t 10

    REM Start Laravel server
    echo Starting Laravel server...
    start "" cmd /c "cd C:\xampp\htdocs\beton && php -S localhost:8000 -t public"
    timeout /t 15

    REM Open Chrome browser and run the project with specific title
    echo Opening browser...
    start chrome.exe --new-tab --app="http://localhost:8000" --window-title="بتن بنا"
    timeout /t 15

    REM Monitor browser tab with title 'Concrete Builder'
    :loop
    powershell -Command "if (!(Get-Process | Where-Object { $_.MainWindowTitle -match 'بتن بنا' })) { exit 1 }"
    IF "%ERRORLEVEL%"=="1" (
        echo 'Concrete Builder' tab is closed.
        goto end
    )

    timeout /t 25
    goto loop
)

:end
REM Stop XAMPP
echo Stopping XAMPP...
nircmd.exe exec hide "C:\xampp\xampp_stop.exe"

REM Stop yarn dev
echo Stopping yarn dev...
taskkill /IM node.exe /F

REM Stop Laravel server
echo Stopping Laravel server...
taskkill /IM php.exe /F

echo Program stopped.
exit
