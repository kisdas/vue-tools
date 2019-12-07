/**
 * 点击复制指令
 * @param {value} String 填充内容
 * @param {cb}  Function 回调函数
 */
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
        }
    }
}