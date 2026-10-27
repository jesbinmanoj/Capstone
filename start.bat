@echo off
title Launch TaskTrack Pro - ICTAK Capstone
echo ==========================================================
echo Starting TaskTrack Pro (ICTAK Summer Internship Capstone)
echo ==========================================================
echo.
echo [1/3] Launching Express Backend API Server (Port 5000)...
start "TaskTrack API Server" cmd /k "cd /d %~dp0server && npm run dev"

timeout /t 2 /nobreak >nul

echo [2/3] Launching Vite React Client (Port 5173)...
start "TaskTrack React Client" cmd /k "cd /d %~dp0client && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ==========================================================
echo TaskTrack Pro is now running!
echo Backend API : http://localhost:5000/api
echo Frontend UI : http://localhost:5173
echo.
echo To sign in immediately, use:
echo   Intern Developer : intern@ictak.org / intern123
echo   Lead Admin       : admin@ictak.org / admin123
echo ==========================================================
pause
