
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/article/articleList","pages/user/userInfo","pages/article/publish","pages/article/articleDetail","pages/user/register","pages/user/login","pages/others/settings"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","animationType":"pop-in","animationDuration":300},"tabBar":{"list":[{"pagePath":"pages/article/articleList","text":"首页","iconPath":"static/img/tabbar/home.png","selectedIconPath":"static/img/tabbar/homefull.png"},{"pagePath":"pages/article/publish","text":"发表","iconPath":"static/img/tabbar/pub.png"},{"pagePath":"pages/user/userInfo","text":"我的","iconPath":"static/img/tabbar/me.png","selectedIconPath":"static/img/tabbar/mefull.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"小论坛","compilerVersion":"3.3.11","entryPagePath":"pages/article/articleList","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/article/articleList","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#007AFF","navigationBarTextStyle":"white","navigationBarTitleText":"推荐","enablePullDownRefresh":true}},{"path":"/pages/user/userInfo","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/article/publish","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#007AFF","navigationBarTextStyle":"white","navigationBarTitleText":"发帖"}},{"path":"/pages/article/articleDetail","meta":{},"window":{"navigationBarBackgroundColor":"#007AFF","navigationBarTextStyle":"white","navigationBarTitleText":""}},{"path":"/pages/user/register","meta":{},"window":{"navigationBarBackgroundColor":"#007AFF","navigationBarTextStyle":"white","navigationBarTitleText":"注册"}},{"path":"/pages/user/login","meta":{},"window":{"navigationBarBackgroundColor":"#007AFF","navigationBarTextStyle":"white","navigationBarTitleText":"登录"}},{"path":"/pages/others/settings","meta":{},"window":{"navigationBarBackgroundColor":"#007AFF","navigationBarTextStyle":"white","navigationBarTitleText":"设置"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});