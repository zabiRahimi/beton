@echo off
REM راه‌اندازی XAMPP
echo Starting XAMPP...
cd C:\xampp
xampp_start.exe

REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
timeout /t 10

REM تغییر مسیر به دایرکتوری پروژه لاراول
cd C:\xampp\htdocs\beton

yarn dev

REM راه‌اندازی سرور لاراول
echo Starting Laravel server...

REM باز کردن مرورگر فایرفاکس و اجرای برنامه
start firefox http://localhost:8000

@REM php artisan serve
php -S localhost:8000 -t public

pause

