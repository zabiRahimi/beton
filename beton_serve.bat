@echo off
REM راه‌اندازی XAMPP
echo Starting XAMPP...
start cmd /c "cd C:\xampp && xampp_start.exe"

REM توقف برای اطمینان از راه‌اندازی کامل سرویس‌ها
timeout /t 10

REM تغییر مسیر به دایرکتوری پروژه ری‌اکت و اجرای دستور yarn dev
echo Starting React development server...
start cmd /k "cd C:\xampp\htdocs\beton && yarn dev"

REM توقف برای اطمینان از راه‌اندازی کامل سرور توسعه ری‌اکت
timeout /t 10

REM تغییر مسیر به دایرکتوری پروژه لاراول و راه‌اندازی سرور لاراول
echo Starting Laravel server...
start cmd /k "cd C:\xampp\htdocs\beton && php artisan serve"

REM باز کردن مرورگر فایرفاکس و اجرای برنامه
start firefox http://localhost:8000

pause
