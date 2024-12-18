@echo off
echo Starting batch script...

REM Hide the console window
nircmd.exe win hide ititle "Command Prompt"

REM Check if NirCmd exists
where nircmd.exe > NUL 2>&1
IF "%ERRORLEVEL%"=="1" (
    echo NirCmd not found. Please make sure nircmd.exe is in the System32 directory.
    exit
)
echo NirCmd is installed and ready to use.

REM Start services if the Chrome app window does not exist
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="0" goto monitor
echo 'Concrete Builder' app window is not found. Starting services...

REM Start XAMPP
echo Starting XAMPP...
nircmd.exe exec hide "C:\xampp\xampp_start.exe"

timeout /t 5

REM Start yarn dev
echo Starting yarn dev...
nircmd.exe exec hide cmd /c "cd C:\xampp\htdocs\beton && yarn dev"

timeout /t 5

REM Wait for user input before starting Laravel server
pause
echo Starting Laravel server...
nircmd.exe exec hide cmd /c "cd C:\xampp\htdocs\beton && php -S localhost:8000 -t public"
timeout /t 5

REM Wait for user input before opening Chrome
pause
echo Opening browser in app mode with custom icon...
nircmd.exe exec hide chrome.exe --app=http://localhost:8000 --start-fullscreen

REM Change window icon using NirCmd
echo Changing window icon...
nircmd.exe win seticon title "بتن بنا" "%~dp0beton.ico"

:monitor
REM Monitor Chrome app window
echo Monitoring Chrome app window...
:loop
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="1" (
    echo 'Concrete Builder' app window is closed.
    goto end
)

timeout /t 6
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
exit
