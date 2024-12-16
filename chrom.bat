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

REM Path to the shortcut
set SHORTCUT_PATH=%~dp0betonBrowser.lnk
echo Shortcut path set to: %SHORTCUT_PATH%

REM Start services if the Chrome app window does not exist
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="0" goto monitor
echo 'Concrete Builder' app window is not found. Starting services...

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

REM Open Chrome browser with custom icon and run the project
echo Opening browser in app mode with custom icon...
start "" %SHORTCUT_PATH%
timeout /t 15

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
