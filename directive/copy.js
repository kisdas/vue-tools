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
        bind(el,binding,vnode){
            function documentHandler(e){
                if(el.contains(e.target)){
                    return false;
                }
                if(binding.expression){
                    binding.value(e);   
                }
            }
            el.__vueClickOutside__ = documentHandler;
            document.addEventListener("click",documentHandler);
        },
        update(){},
        unbind(el,binding){
            document.removeEventListener("click",el.__vueClickOutside__);
            delete el.__vueClickOutside__;
        }
    }
}
export function positiontop(){
    return {
        bind(el,binding,vnode){
            if(binding.value){
                // nextTick(() => {
                    let top = el.offsetTop + binding.value
                    el.parentNode.scrollTop = el.offsetTop
                    while(el && el.scrollHeight <= el.parentNode.scrollHeight){
                        el= el.parentNode
                    }
                    el.scrollTop = top - el.offsetTop
                // },this)
            }
        },
    }
}