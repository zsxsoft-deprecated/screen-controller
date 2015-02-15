Screen Controller
================

一个Node项目，用于控制福州八中体育馆的LED大屏幕。

## 作者
zsx(http://www.zsxsoft.com)

## 创建项目的原因

我们都知道，学校举办的活动基本跟__shit__一样。我的学校是福州八中，它的体育馆有一个大屏幕。为了让我们学校举办的活动更加完美，我写了这个应用以便更好地控制它。

## 安装方式
* ``npm install``
* 如果计算机未安装Chrome __40+__、Internet Explorer __11+__、Firefox __25+__等现代浏览器的话，请再
``npm install nw``下载nw.js以便使用备用显示窗口
* 整个文件夹打包复制到其他地方即可

## 启动方式

### 只打开服务端：

``npm start``
### （Windows）打开显示窗口

``npm run go-win``

### （Linux）打开显示窗口

``npm run go``

### 进行控制

启动服务端后，用现代浏览器打开``http://127.0.0.1:3000/``

## 关于显示窗口的说明

显示窗口由nw.js创建，可以修改大小，没有标题。视频仅支持__vp8__格式，音频只支持__ogg、wav__格式。如果想修改文件，可参阅[https://github.com/nwjs/nw.js/wiki/Using-MP3-%26-MP4-%28H.264%29-using-the--video--%26--audio--tags.](https://github.com/nwjs/nw.js/wiki/Using-MP3-%26-MP4-%28H.264%29-using-the--video--%26--audio--tags.)地址，对node_modules/nw/nwjs进行替换；否则，请注意格式转换！

若不使用显示窗口，转而使用浏览器访问``http://127.0.0.1:3000/screen``的话，音频推荐使用__mp3__格式，视频推荐使用__mp4、H.264、AAC__。

## 库

### 前端
* seajs [https://github.com/seajs/seajs](https://github.com/seajs/seajs)
* jQuery [https://github.com/jquery/jquery](https://github.com/jquery/jquery)
* Bootstrap [https://github.com/twbs/bootstrap](https://github.com/twbs/bootstrap)
* DDPlayer [https://github.com/dpy1123/ddplayer](https://github.com/dpy1123/ddplayer)
* Highcharts [https://github.com/highslide-software/highcharts.com](https://github.com/highslide-software/highcharts.com) 


### 后端
* express [https://github.com/strongloop/express](https://github.com/strongloop/express)
* express-less [https://github.com/toogle/express-less](https://github.com/toogle/express-less)
* socket.io [https://github.com/Automattic/socket.io](https://github.com/Automattic/socket.io)
* ejs [https://github.com/visionmedia/ejs](https://github.com/visionmedia/ejs)
* rich-console [https://github.com/keven-wang/rich-console](https://github.com/keven-wang/rich-console)