@echo off
setlocal

rem Run this portfolio locally with one double-click.
rem - Starts a local HTTP server in this folder
rem - Opens your default browser
rem Stop the server with Ctrl+C in this window.

cd /d "%~dp0"

set "PORT=5500"

echo Starting local server at http://localhost:%PORT%/
echo.

rem Prefer the Python launcher (py) on Windows, then fall back to python.
where py >nul 2>nul
if %ERRORLEVEL%==0 (
  start "" "http://localhost:%PORT%/"
  py -m http.server %PORT%
  goto :eof
)

where python >nul 2>nul
if %ERRORLEVEL%==0 (
  start "" "http://localhost:%PORT%/"
  python -m http.server %PORT%
  goto :eof
)

echo ERROR: Python was not found (needed for a simple local web server).
echo Install Python from https://www.python.org/downloads/ and re-run this file.
echo.
pause
