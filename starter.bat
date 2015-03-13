@echo off
cls
echo 这是这个屏幕控制器的简易客户端
echo 将检测环境并提供简易的调用工具
echo Powered by zsx
echo.
echo 若命令启动失败，则请到https://nodejs.org/下载并安装node.js
echo.
echo.
echo 请选择你需要的操作
echo (1) 只打开服务端；
echo (2) 同时打开显示窗口
echo (10) 安装
echo (11) 安装显示窗口
echo 其它：退出
set /p choice=请输入：
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