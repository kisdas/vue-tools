var nextTick = (function () {
    var callbacks = []; // 存储需要触发的回调函数
    var pending = false; // 是否正在等待的标识(false:允许触发在下次事件循环触发callbacks中的回调, true: 已经触发过,需要等到下次事件循环)
    var timerFunc; // 设置在下次事件循环触发callbacks的 触发函数

    //处理callbacks的函数
    function nextTickHandler () {
        pending = false;// 可以触发timeFunc
        var copies = callbacks.slice(0);//复制callback
        callbacks.length = 0;//清空callback
        for (var i = 0; i < copies.length; i++) {
            copies[i]();//触发callback回调函数
        }
    }

    //如果支持Promise,使用Promise实现
    if (typeof Promise !== 'undefined') {
        var p = Promise.resolve();
        var logError = function (err) { console.error(err); };
        timerFunc = function () {
            p.then(nextTickHandler).catch(logError);
            // ios的webview下,需要强制刷新队列,执行上面的回调函数
            // if (isIOS) { setTimeout(noop); }
        };

        //如果Promise不支持,但是支持MutationObserver
    } else if (typeof MutationObserver !== 'undefined' && (
            isNative(MutationObserver) ||
            // PhantomJS and iOS 7.x
            MutationObserver.toString() === '[object MutationObserverConstructor]'
        )) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS IE11, iOS7, Android 4.4
        var counter = 1;
        var observer = new MutationObserver(nextTickHandler);
        //创建一个textnode dom节点,并让MutationObserver 监视这个节点;而 timeFunc正是改变这个dom节点的触发函数
        var textNode = document.createTextNode(String(counter));
        observer.observe(textNode, {
            characterData: true
        });
        timerFunc = function () {
            counter = (counter + 1) % 2;
            textNode.data = String(counter);
        };
    } else {// 上面两种不支持的话,就使用setTimeout

        timerFunc = function () {
            setTimeout(nextTickHandler, 0);
        };
    }
    //nextTick接受的函数, 参数1:回调函数  参数2:回调函数的执行上下文
    return function queueNextTick (cb, ctx) {
        var _resolve;//用于接受触发 promise.then中回调的函数
        //向回调数据中pushcallback
        callbacks.push(function () {
            //如果有回调函数,执行回调函数
            if (cb) { cb.call(ctx); }
            if (_resolve) { _resolve(ctx); }//触发promise的then回调
        });
        if (!pending) {//是否执行刷新callback队列
            pending = true;
            timerFunc();
        }
        //如果没有传递回调函数,并且当前浏览器支持promise,使用promise实现
        if (!cb && typeof Promise !== 'undefined') {
            return new Promise(function (resolve) {
                _resolve = resolve;
            })
        }
    }
})();
export function copy(){
    return {
        bind(el, binding, vnode){
            el.addEventListener('click', function(){
                var oInput = document.createElement('input');
                oInput.value = binding.value.value
                document.body.appendChild(oInput);
                oInput.select();// 选择对象
                document.execCommand("Copy");// 执行浏览器复制命令
                document.body.removeChild(oInput);
                if( typeof binding.value.cb === 'function'){
                    binding.value.cb()
                }
            })
        },
        update(el, binding, vnode){
            el.addEventListener('click', function(){
                var oInput = document.createElement('input');
                oInput.value = binding.value.value
                document.body.appendChild(oInput);
                oInput.select();// 选择对象
                document.execCommand("Copy");// 执行浏览器复制命令
                document.body.removeChild(oInput);
                if( typeof binding.value.cb === 'function'){
                    binding.value.cb()
                }
            })
        },
    }
}
export function clickoutside(){
    return {
        //初始化指令
        bind(el,binding,vnode){
            function documentHandler(e){
                //这里判断点击的元素是否是本身，是本身，则返回
                if(el.contains(e.target)){
                    return false;
                }
                //判断指令中是否绑定了函数
                if(binding.expression){
                    //如果绑定了函数，则调用那个函数，此处binding.value就是handleClose方法   
                    binding.value(e);   
                }
            }
            //给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.__vueClickOutside__ = documentHandler;
            document.addEventListener("click",documentHandler);
        },
        update(){},
        unbind(el,binding){
            //解除事件监听
            document.removeEventListener("click",el.__vueClickOutside__);
            delete el.__vueClickOutside__;
        }
    }
}
export function positiontop(){
    return {
        bind(el,binding,vnode){
            if(binding.value){
                nextTick(() => {
                    let top = el.offsetTop + binding.value
                    el.parentNode.scrollTop = el.offsetTop
                    while(el && el.scrollHeight <= el.parentNode.scrollHeight){
                        el= el.parentNode
                    }
                    el.scrollTop = top - el.offsetTop
                },this)
            }
        },
    }
}