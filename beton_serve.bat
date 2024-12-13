

@echo off
REM مسیر فایل موقت
set TEMPFILE=C:\xampp\htdocs\beton\program_running.tmp

REM بررسی وجود فایل موقت
if exist "%TEMPFILE%" (
    echo برنامه در حال اجرا است.
    exit
)

REM ایجاد فایل موقت
echo در حال اجرا > "%TEMPFILE%"

REM باز کردن صفحه انتظار در مرورگر پیش‌فرض
start "" "C:\xampp\htdocs\beton\loading.html"

REM مسیر نسبی NirCmd
set NIRCMD=%~dp0\nircmd.exe

REM راه‌اندازی XAMPP در پس‌زمینه
echo Starting XAMPP...
%NIRCMD% exec hide cmd /c "cd C:\xampp && xampp_start.exe"

REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
timeout /t 10

REM اجرای دستور yarn dev در پس‌زمینه
echo Starting React development server...
%NIRCMD% exec hide cmd /c "cd C:\xampp\htdocs\beton && yarn dev"

REM توقف برای اطمینان از راه‌اندازی کامل سرور توسعه ری‌اکت
timeout /t 10

REM راه‌اندازی سرور لاراول در پس‌زمینه
echo Starting Laravel server...
start cmd /k %NIRCMD% exec hide cmd /c "cd C:\xampp\htdocs\beton && php artisan serve"

REM باز کردن مرورگر فایرفاکس و اجرای برنامه
start firefox http://localhost:8000

REM نظارت بر مرورگر
:loop
tasklist /FI "IMAGENAME eq firefox.exe" 2>NUL | find /I /N "firefox.exe">NUL
if "%ERRORLEVEL%"=="0" (
    timeout /t 5
    goto loop
)

REM توقف XAMPP
%NIRCMD% exec hide cmd /c "cd C:\xampp && xampp_stop.exe"

REM توقف yarn dev
taskkill /IM node.exe /F

REM حذف فایل موقت
del "%TEMPFILE%"

echo برنامه متوقف شد.
exit


@REM @echo off
@REM REM مسیر فایل موقت
@REM set TEMPFILE=C:\xampp\htdocs\beton\program_running.tmp

@REM REM بررسی وجود فایل موقت
@REM if exist "%TEMPFILE%" (
@REM     echo برنامه در حال اجرا است.
@REM     exit
@REM )

@REM REM ایجاد فایل موقت
@REM echo در حال اجرا > "%TEMPFILE%"

@REM REM باز کردن صفحه انتظار در مرورگر پیش‌فرض
@REM start "" "C:\xampp\htdocs\beton\loading.html"

@REM REM مسیر نسبی NirCmd
@REM set NIRCMD=%~dp0\nircmd.exe

@REM REM راه‌اندازی XAMPP در پس‌زمینه
@REM echo Starting XAMPP...
@REM %NIRCMD% exec hide cmd /c "cd C:\xampp && xampp_start.exe"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
@REM timeout /t 10

@REM REM اجرای دستور yarn dev در پس‌زمینه
@REM echo Starting React development server...
@REM %NIRCMD% exec hide cmd /c "cd C:\xampp\htdocs\beton && yarn dev"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرور توسعه ری‌اکت
@REM timeout /t 10

@REM REM راه‌اندازی سرور لاراول در پس‌زمینه
@REM echo Starting Laravel server...
@REM %NIRCMD% exec hide cmd /c "cd C:\xampp\htdocs\beton && php artisan serve"

@REM REM باز کردن مرورگر فایرفاکس و اجرای برنامه
@REM start firefox http://localhost:8000

@REM REM توقف برنامه تا وقتی که مرورگر باز است
@REM echo در انتظار بستن مرورگر...
@REM pause

@REM REM حذف فایل موقت
@REM del "%TEMPFILE%"


@REM @echo off
@REM REM باز کردن صفحه انتظار در مرورگر پیش‌فرض
@REM start "" "C:\xampp\htdocs\beton\loading.html"

@REM REM مسیر نسبی NirCmd
@REM set NIRCMD=%~dp0\nircmd.exe

@REM REM راه‌اندازی XAMPP در پس‌زمینه
@REM echo Starting XAMPP...
@REM %NIRCMD% exec hide cmd /c "cd C:\xampp && xampp_start.exe"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
@REM timeout /t 10

@REM REM اجرای دستور yarn dev در پس‌زمینه
@REM echo Starting React development server...
@REM %NIRCMD% exec hide cmd /c "cd C:\xampp\htdocs\beton && yarn dev"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرور توسعه ری‌اکت
@REM timeout /t 10

@REM REM راه‌اندازی سرور لاراول در پس‌زمینه
@REM echo Starting Laravel server...
@REM %NIRCMD% exec hide cmd /c "cd C:\xampp\htdocs\beton && php artisan serve"

@REM REM باز کردن مرورگر فایرفاکس و اجرای برنامه
@REM start firefox http://localhost:8000

@REM pause


@REM @echo off
@REM REM باز کردن صفحه انتظار در مرورگر پیش‌فرض 
@REM start "" "C:\xampp\htdocs\beton\loadingStart.html"

@REM REM راه‌اندازی XAMPP
@REM echo Starting XAMPP...
@REM start cmd /c "cd C:\xampp && xampp_start.exe"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
@REM timeout /t 5

@REM REM تغییر مسیر به دایرکتوری پروژه ری‌اکت و اجرای دستور yarn dev
@REM echo Starting React development server...
@REM start "React Server" cmd /k "cd C:\xampp\htdocs\beton && yarn dev"

@REM REM توقف برای اطمینان از راه‌اندازی کامل سرور توسعه ری‌اکت
@REM timeout /t 5

@REM REM تغییر مسیر به دایرکتوری پروژه لاراول و راه‌اندازی سرور لاراول
@REM echo Starting Laravel server...
@REM start "Laravel Server" cmd /k "cd C:\xampp\htdocs\beton && php artisan serve"

@REM REM باز کردن مرورگر فایرفاکس و اجرای برنامه
@REM start firefox http://localhost:8000

@REM pause



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
