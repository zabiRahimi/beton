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

REM Path to the temporary shortcut
set SHORTCUT_PATH=%TEMP%\betonBana.lnk
echo Temporary shortcut path set to: %SHORTCUT_PATH%

REM Path to chrome.exe
set CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe

REM Verify if chrome.exe exists
IF NOT EXIST "%CHROME_PATH%" (
    echo chrome.exe not found at: %CHROME_PATH%
    pause
    exit /b 1
)
echo chrome.exe found at: %CHROME_PATH%

REM Create shortcut using PowerShell in the temporary location
echo Creating shortcut...
powershell -Command "$WScriptShell = New-Object -ComObject WScript.Shell; $Shortcut = $WScriptShell.CreateShortcut('%SHORTCUT_PATH%'); $Shortcut.TargetPath = '%CHROME_PATH%'; $Shortcut.Arguments = '--app=http://localhost:8000'; $Shortcut.IconLocation = '%ICON_PATH%'; $Shortcut.Save()"
echo Shortcut created.

REM Verify if shortcut was created
IF NOT EXIST "%SHORTCUT_PATH%" (
    echo Shortcut creation failed.
    pause
    exit /b 1
)
echo Shortcut verification completed.

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
start "" "%SHORTCUT_PATH%"
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