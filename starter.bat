@echo off
cls
echo ���������Ļ�������ļ��׿ͻ���
echo ����⻷�����ṩ���׵ĵ��ù���
echo Powered by zsx
echo.
echo ����������ʧ�ܣ����뵽https://nodejs.org/���ز���װnode.js
echo.
echo.
echo ��ѡ������Ҫ�Ĳ���
echo (1) ֻ�򿪷���ˣ�
echo (2) ͬʱ����ʾ����
echo (10) ��װ
echo (11) ��װ��ʾ����
echo �������˳�
set /p choice=�����룺
if /i "%choice%"=="1" goto :open1
if /i "%choice%"=="2" goto :open2
if /i "%choice%"=="10" goto :open10
if /i "%choice%"=="11" goto :open11
echo.
exit

:open1
npm start
exit

:open2
npm run go-win
exit

:open10
npm install 
exit 

:open11
npm install nw
exit