echo off
echo RUN all... START %time%

call loadlib.bat %1

node -v

@REM ����svn �����ͻ

@REM C:\project1\Client\trunk\gameclient
@REM cd %CURPROJECT%\Client\trunk
@REM svn resolved gameclient
@REM svn revert gameclient

cd %CLIENT%
svn resolved tools
svn revert tools

cd %trunk%\gameclient\src\game\static\json
svn resolved cfg.ts
svn revert cfg.ts

cd %MYCMD%

call svnclear.bat 

call up_all.bat 

call tsccheck.bat 

cd %trunk%\gameclient\cmd

::������Դ
call svn_up.bat %trunk%\resource

call online_excel.bat 

cd %trunk%
svn resolved gameclient
svn revert gameclient
cd %MYCMD%

:: ����ͼ��
call exportUI_Atlas.bat 

:: ����ѹ��
call fontcompress.bat 

:: ����
call tinycompile.bat 

@REM ѹ������
call mini.bat 
copy %trunk%\gameclient\bin\js\bundle.js %trunk%\release\js\bundle.js

@REM this is something platform files.
call copyplatform.bat

::ѹ��resource��Դ���ɵ��ļ�compress_resource��
call compress_res.bat 

::copy all bin
call svn_up.bat %trunk%\resource\remote\font
copy %trunk%\resource\o\config\export\all.bin %trunk%\compress_resource\o\config\export\all.bin

@REM ::���ɰ汾�����ļ�=========================================================

call resverV2.bat 

@REM ::����ļ����
call rev_out.bat 

cd %MYCMD%

call get_res_version.bat 

::=========================================================
echo ".................����Ƿ���mainfest.json�ļ�"
cd %MYCMD%
cd ..
set workspaceFolder=%cd%
cd ..\..\..\
call project_config cmd all_again %workspaceFolder%
::=========================================================

echo END %time%