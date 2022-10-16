@echo off

REM you may edit these files, folder and variables to fit your needs:
set findfiles=*.txt
set backupfoldername=_backup-Folder
set backupfilename=_File-backup.log
REM this is current path of batchfile
set myPath=%~dp0
REM 100mb maxsize of backupfile
set maxbytesize=100000000

REM ********************************************* you shall not pass
REM Program starts here:

REM Create DateTime variables
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%" 
set "HH=%dt:~8,2%" & set "mn=%dt:~10,2%" & set "ss=%dt:~12,2%"

REM This Directory
set mainFolder=%myPath%

REM Main Paths & Files

set datestamp=%YY%%MM%%DD%-%HH%%mn%
set "destFolder=%mainFolder%%backupfoldername%\%datestamp%"
set "backupfile=%mainFolder%%backupfilename%"

REM Create Backupfile if not exists
if not exist %backupfile% type nul>%backupfile%

REM check logfile size and backup this if bigger then maxbytesize
FOR %%A IN (%backupfile%) DO set size=%%~zA
if %size% gtr %maxbytesize% rename %mainFolder%%backupfilename% "%YY%%MM%%DD%%backupfilename%" & move %mainFolder%%YY%%MM%%DD%\%backupfilename% %mainFolder%%backupfoldername%

REM Create Backup if Files in Directory
if exist "%mainFolder%\%findfiles%" (if not exist %destFolder% mkdir %destFolder%) & (ROBOCOPY /MOV /LOG+:%backupfile% %mainFolder% %destFolder% %findfiles%) & (echo: & echo.destination: & echo.%destFolder% & echo:) else (echo: & echo No %findfiles% found. & echo:)

pause
