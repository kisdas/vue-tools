
// 用于处理粘贴输入的值自动去除换行符· 仅供elmenui使用
Vue.directive('filterValue', {
    bind(el, binding, vnode) {
        let inputBox = el.getElementsByClassName("el-textarea__inner")[0];
        inputBox.onpaste = function( e){
            var text = e.clipboardData.getData('Text');
            inputBox.dataset.changeValue = text;
        }
    },
    componentUpdated(el, binding, vnode) {
        let inputBox = el.getElementsByClassName("el-textarea__inner")[0];
        let str = '' + inputBox.value;
        let changeStr = '' + inputBox.dataset.changeValue;
        if(!str || !changeStr) return;
        let newStr = changeStr.replace(/<\/?.+?>/g,'').replace(/\r\n/g,"");
        changeStr = changeStr.split('').filter( ele => encodeURI(ele) == '%0D' ? false : true).join('')
        str = str.replace(changeStr,newStr);
        // element ui的组件更新函数执行有延迟 故使用settimeout同步
        binding.value.set(str)
        inputBox.dataset.changeValue = "";
    },
})