::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAjk
::fBw5plQjdG8=
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
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
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
REM راه‌اندازی XAMPP
echo Starting XAMPP...
start cmd /c "cd C:\xampp && xampp_start.exe"

REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
timeout /t 5

REM تغییر مسیر به دایرکتوری پروژه ری‌اکت و اجرای دستور yarn dev
echo Starting React development server...
start "React Server" cmd /k "cd C:\xampp\htdocs\beton && yarn dev"

REM توقف برای اطمینان از راه‌اندازی کامل سرور توسعه ری‌اکت
timeout /t 5

REM تغییر مسیر به دایرکتوری پروژه لاراول و راه‌اندازی سرور لاراول
echo Starting Laravel server...
start "Laravel Server" cmd /k "cd C:\xampp\htdocs\beton && php artisan serve"

REM باز کردن مرورگر فایرفاکس و اجرای برنامه
start firefox http://localhost:8000

pause



@REM REM راه‌اندازی XAMPP
@REM echo Starting XAMPP...
@REM start cmd /c "cd C:\xampp && xampp_start.exe"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
@REM timeout /t 10

@REM REM تغییر مسیر به دایرکتوری پروژه ری‌اکت و اجرای دستور yarn dev
@REM echo Starting React development server...
@REM start cmd /k "cd C:\xampp\htdocs\beton && yarn dev"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرور توسعه ری‌اکت
@REM timeout /t 10

@REM REM تغییر مسیر به دایرکتوری پروژه لاراول و راه‌اندازی سرور لاراول
@REM echo Starting Laravel server...
@REM start cmd /k "cd C:\xampp\htdocs\beton && php artisan serve"

@REM REM باز کردن مرورگر فایرفاکس و اجرای برنامه
@REM start firefox http://localhost:8000

@REM pause
