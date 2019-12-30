
/**
 * 
 * @param {
    fontFamily: '微软雅黑',
    fontColor: '#AAAAAA',
    lineHeight: 18,
    fontHeight: 16;
    word: '我是风我是风中一匹狼我是风中一',
    fontStyle: '200 16px 微软雅黑'
} msg 
*/
export const word2Img = (msg) =>{
    // todo valide
    var c=document.createElement('canvas') 
    c.height = 20 + (msg.lineHeight + msg.fontHeight);
    var ctx = c.getContext("2d");
    ctx.fillStyle="#ffffff";
    ctx.globalAlpha=0;
    c.height = 100;
    ctx.globalAlpha = 1;
    ctx.font = msg.fontStyle;
    ctx.fillStyle = msg.fontColor;
    ctx.fillText(msg.word,0,msg.lineHeight + 1/2 * msg.fontHeight);
    var width = ctx.measureText(msg.word).width;
    var height = msg.lineHeight + msg.fontHeight;
    var imgDataA = ctx.getImageData( 0, 0, width,height);
    var d=document.createElement('canvas');
    var ctx2 = d.getContext("2d")
    d.height = height;
    d.width = width;
    ctx2.putImageData(imgDataA, 0, 0);
    return d.toDataURL()
}
/**
 * 返回url中参数
 */
export const getUrlParams = (() => {
    const path = window.location.href
    let params = ''
    let res = {}
    return function () {
        if (!path.match(/\?/)) return {}
        params = path.split('?')[1].split('#')[0].split('&')
        if (JSON.stringify(res) === '{}') {
            res = params.reduce((obj, item) => {
            obj[item.split('=')[0]] = item.split('=')[1]
            return obj
            }, {})
        }
        return res
    }
})()