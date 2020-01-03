
/**
 * 判断监听dom
 * @param { HTMLElement } dom 传入的dom
 * @param { Number } distance 露出底部的距离
 * @param { Function } cb  回调函数
 */  
export const judgeScrollDistance = (dom, cb,distance = 0) =>{
    // 参数检测 
    if(!(dom instanceof HTMLElement)){
        console.log('error','请传入一个dom');
        return;
    }
    let oldDom = dom;
    // 实现逻辑
    while(dom && dom.scrollHeight <= dom.parentNode.scrollHeight){
        dom = dom.parentNode
    }
    let obj = {}
    // 此处可以改为hash 计算
    let varName = 'fn_' + Math.random();
    window[varName] = function() {
        let top = oldDom.offsetTop
        let height = dom.clientHeight;
        let line = top - height + distance;
        if(dom.scrollTop > line){
            cb();
            dom.removeEventListener('scroll',window[varName])
        }
    }
    dom.addEventListener( 'scroll',window[varName]);
    window[varName]();
}