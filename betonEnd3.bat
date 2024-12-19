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

REM Start services if the Chrome app window does not exist
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="0" goto monitor
echo 'بتن بنا' app window is not found. Starting services...

REM Start XAMPP
echo Starting XAMPP...
start /min cmd /c "C:\xampp\xampp_start.exe"

REM Wait for XAMPP to start
:waitXAMPP
tasklist /FI "IMAGENAME eq httpd.exe" | find /I "httpd.exe" >NUL
IF "%ERRORLEVEL%"=="0" (
    echo XAMPP started successfully.
    goto startYarn
)
timeout /t 1
goto waitXAMPP

:startYarn
REM Start yarn dev
echo Starting yarn dev...
start /min cmd /c "cd C:\xampp\htdocs\beton && yarn dev"

REM Wait for 5 seconds
timeout /t 5

:startLaravel
REM Start Laravel server
echo Starting Laravel server...
start /min cmd /c "cd C:\xampp\htdocs\beton && php -S localhost:8000 -t public"

REM Wait for 5 seconds
timeout /t 5

REM Open Chrome browser in app mode
echo Opening browser in app mode...
start /min chrome.exe --app=http://localhost:8000

:monitor
REM Monitor Chrome app window
echo Monitoring Chrome app window...
:loop
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="1" (
    echo 'بتن بنا' app window is closed.
    goto end
)

timeout /t 25
goto loop

:end
REM Stop XAMPP
echo Stopping XAMPP...
"C:\xampp\xampp_stop.exe"

REM Stop yarn dev
echo Stopping yarn dev...
taskkill /IM node.exe /F

REM Stop Laravel server
echo Stopping Laravel server...
taskkill /IM php.exe /F

echo Program stopped.
exit
