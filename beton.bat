::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAjk
::fBw5plQjdCyDJEGF+VIgFBNASAuBL1e4A6ET5tT56v6IrAMUV+1f
::YAwzuBVtJxjWCl3EqQJhSA==
::ZR4luwNxJguZRRnVphFQ
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSzk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+JeA==
::cxY6rQJ7JhzQF1fEqQJQ
::ZQ05rAF9IBncCkqN+0xwdVs0
::ZQ05rAF9IAHYFVzEqQJQ
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJEGF+VIgFBNASAuBL1e4A6ET5tT56v6IrAMYTOdf
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983

@echo off

REM Check if NirCmd exists
where nircmd.exe > NUL 2>&1
IF "%ERRORLEVEL%"=="1" (
    exit
)

REM Start XAMPP
start /min cmd /c "C:\xampp\xampp_start.exe"

REM Wait for XAMPP to start
:waitXAMPP
tasklist /FI "IMAGENAME eq httpd.exe" | find /I "httpd.exe" >NUL
IF "%ERRORLEVEL%"=="0" (
    goto startYarn
)
timeout /t 1
goto waitXAMPP

:startYarn
REM Start yarn dev
nircmd.exe exec hide cmd /c "cd C:\xampp\htdocs\beton && yarn dev"

REM Wait for the development server to start
:waitYarn
tasklist | find /I "node.exe" > NUL
IF "%ERRORLEVEL%"=="0" (
    goto startLaravel
)
timeout /t 1
goto waitYarn

:startLaravel
REM Start Laravel server
nircmd.exe exec hide cmd /c "cd C:\xampp\htdocs\beton && php -S localhost:8000 -t public"

REM Wait for the Laravel server to start
:waitLaravel
tasklist | find /I "php.exe" > NUL
IF "%ERRORLEVEL%"=="0" (
    goto openChrome
)
timeout /t 1
goto waitLaravel

:openChrome
REM Open main application in Chrome app mode maximized
start chrome.exe --app=http://localhost:8000 --start-maximized

REM Bring Chrome window to the front
timeout /t 2
nircmd.exe win max ititle "بتن بنا"

:monitor
REM Monitor Chrome app window
:loop
tasklist /FI "IMAGENAME eq chrome.exe" | find /I "chrome.exe" >NUL
IF "%ERRORLEVEL%"=="1" (
    goto end
)
timeout /t 2
goto loop

:end
REM Stop services
"C:\xampp\xampp_stop.exe"
taskkill /IM node.exe /F
taskkill /IM php.exe /F

exit