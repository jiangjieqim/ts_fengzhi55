call loadlib.bat %1

cd ..\..\

call all_config

copy %CURPROJECT%\Client\trunk\%resource%\o\font\lang.json %TRUNK%\%resource%\o\font\lang.json /y

@REM copy 代码
xcopy %CURPROJECT%\Client\trunk\gameclient\src %TRUNK%\gameclient\src /y /e

xcopy %CURPROJECT%\Client\trunk\%gameclient_ui%\laya %TRUNK%\%gameclient_ui%\laya /y /e

copy %CURPROJECT%\Client\trunk\gameclient\version.json  %TRUNK%\gameclient\version.json /y

xcopy %CURPROJECT%\Client\trunk\gameclient\ext  %TRUNK%\gameclient\ext /y

xcopy %CURPROJECT%\Client\trunk\%resource% %TRUNK%\%resource% /y /e

@REM D:\project1\Client\trunk\%gameclient_ui%\laya

@REM D:\project1\Client\trunk\gameclient\src

cd %MYCMD%
