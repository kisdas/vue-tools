var timing = window.performance.timing;
//重定向耗时
var redirectTime = timing.redirectEnd - timing.redirectStart;
console.log('重定向耗时',redirectTime);
//卸载上一个页面耗时
var unloadTime = timing.unloadEventEnd - timing.unloadEventStart;
console.log('卸载上一个页面耗时',unloadTime);
//DNS查询耗时
var domainTime = timing.domainLookupEnd - timing.domainLookupStart;
console.log('DNS查询耗时',domainTime);
//TCP连接耗时
var tcpConnectTime = timing.connectEnd - timing.connectStart;
console.log('TCP连接耗时',tcpConnectTime);
//DOM开始加载前所花费时间
var beforeDomLoadTime = timing.responseEnd - timing.navigationStart;
console.log('DOM开始加载前所花费时间',beforeDomLoadTime);
//请求耗时
var responseTime = timing.responseEnd - timing.requestStart;
console.log('请求耗时',responseTime);
//DOM完成加载耗时
var domLoadTime = timing.domComplete - timing.domLoading;
console.log('DOM完成加载耗时',domLoadTime);
//DOM结构完成解析耗时
var domComplieTime = timing.domInteractive - timing.domLoading ;
console.log('DOM结构完成解析耗时',domComplieTime);
//脚本加载时间
var contentLoadTime = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
console.log('脚本加载时间',contentLoadTime);
//onload事件时间
var loadTime = timing.loadEventEnd - timing.loadEventStart;
console.log('onload事件时间',loadTime);
//页面完全加载耗时
var fullTime = redirectTime + unloadTime + domainTime + tcpConnectTime + responseTime + domLoadTime + domComplieTime ;
console.log('页面完全加载耗时',fullTime);