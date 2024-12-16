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

REM Paths to temporary files
set YARN_TEMP_FILE=%~dp0yarn.tmp
set PHP_TEMP_FILE=%~dp0php.tmp

REM Create temporary files
echo Creating temporary files...
echo. > %YARN_TEMP_FILE%
echo. > %PHP_TEMP_FILE%

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
start "" cmd /c "cd C:\xampp\htdocs\beton && yarn dev && del %YARN_TEMP_FILE%"

REM Wait for yarn dev to finish
echo Waiting for yarn dev to finish...
:waitYarn
IF EXIST %YARN_TEMP_FILE% (
    timeout /t 1
    goto waitYarn
)
echo Yarn dev finished successfully.

REM Start Laravel server
echo Starting Laravel server...
start "" cmd /c "cd C:\xampp\htdocs\beton && php -S localhost:8000 -t public && del %PHP_TEMP_FILE%"

REM Wait for Laravel server to finish
echo Waiting for Laravel server to finish...
:waitPhp
IF EXIST %PHP_TEMP_FILE% (
    timeout /t 1
    goto waitPhp
)
echo Laravel server finished successfully.

REM Open Chrome browser in app mode and run the project
echo Opening browser in app mode with custom icon...
start chrome.exe --app=http://localhost:8000
timeout /t 5

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

timeout /t 10
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
