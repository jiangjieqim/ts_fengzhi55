@REM @REM ��resource\o\config\export\all.bin ���Ƶ� rev_out\o\config\export\all.bin
@REM call loadlib.bat %1
@REM echo on

@REM set all=o\config\export\all.bin
@REM set yourpath=%TRUNK%\rev_out

@REM set targetfile=%yourpath%\%all%

@REM @REM destfileԴ�ļ�·�� %TRUNK%\resource\o\config\export\all.bin
@REM set destfile=%TRUNK%\resource\%all%

@REM echo "..............deskfile is %destfile%"

@REM if not exist %targetfile% (
@REM     echo not find %targetfile%
@REM ) else (
@REM     copy %destfile% %targetfile%
@REM     @REM copy %TRUNK%\resource\o\config\export\hash %TRUNK%\rev_out\o\config\export\hash
@REM     @REM echo copy %targetfile%
@REM )

@REM @REM ============================================================
@REM svn revert -R %TRUNK%\resource\all.bin
@REM svn revert -R %TRUNK%\rev_out\all.bin

@REM copy %destfile% %TRUNK%\resource\all.bin
@REM copy %destfile% %TRUNK%\rev_out\all.bin

@REM @REM ֻ�������ñ�
@REM copy %destfile% %TRUNK%\upload\all.bin
@REM @REM ============================================================
@REM cd %TRUNK%\gameclient\cmd

@REM @REM if %errorlevel% == 0 (
@REM @REM    echo aaa
@REM @REM    bat�ű��г���%errorlevel%�����һ������ķ���ֵ�������жϡ����磺
@REM @REM )

