@echo off
echo Starting batch script...

REM Check if NirCmd exists
where nircmd.exe > NUL 2>&1
IF "%ERRORLEVEL%"=="1" (
    echo NirCmd not found. Please make sure nircmd.exe is in the System32 directory.
    pause
    exit
)
echo NirCmd is installed and ready to use.

REM Path to custom icon
set ICON_PATH=%~dp0beton.ico
echo Custom icon path set to: %ICON_PATH%

REM Start services if the Chrome app window does not exist
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="0" goto monitor
echo 'Concrete Builder' app window is not found. Starting services...

REM Start XAMPP
echo Starting XAMPP...
nircmd.exe exec hide "C:\xampp\xampp_start.exe" && (
    echo XAMPP started successfully.
) || (
    echo Failed to start XAMPP.
    exit /b 1
)

REM Start yarn dev
echo Starting yarn dev...
call :startYarnDev

REM Start Laravel server
echo Starting Laravel server...
call :startLaravelServer

REM Open Chrome browser in app mode and run the project
echo Opening browser in app mode with custom icon...
start chrome.exe --app=http://localhost:8000 && (
    echo Chrome started in app mode.
) || (
    echo Failed to start Chrome in app mode.
    exit /b 1
)

REM Change window icon using NirCmd
echo Changing window icon...
nircmd.exe win seticon title "بتن بنا" "%ICON_PATH%" && (
    echo Window icon changed successfully.
) || (
    echo Failed to change window icon.
    exit /b 1
)

:monitor
REM Monitor Chrome app window
echo Monitoring Chrome app window...
:loop
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="1" (
    echo 'Concrete Builder' app window is closed.
    goto end
)

timeout /t 25
goto loop

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
pause
exit

:startYarnDev
cd C:\xampp\htdocs\beton
yarn dev && (
    echo Yarn dev started successfully.
    exit /b 0
) || (
    echo Failed to start yarn dev.
    exit /b 1
)

:startLaravelServer
cd C:\xampp\htdocs\beton
php -S localhost:8000 -t public && (
    echo Laravel server started successfully.
    exit /b 0
) || (
    echo Failed to start Laravel server.
    exit /b 1
)
