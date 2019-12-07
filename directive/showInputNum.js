
// 用于输入框显示字数
export function showInputNum(){
    return {
        bind(el, binding, vnode) {
            let msgBox = document.createElement('div');
            msgBox.classList.add("showNum");
            el.style.position = el.style.position || "relative";
            msgBox.style.position = "absolute";
            msgBox.style.right = "10px";
            msgBox.style.bottom = "-1px";
            msgBox.style.color = "#aeaeae";
            msgBox.innerText = "0/" + binding.value;
            el.appendChild(msgBox)
        },
        update(el, binding, vnode) {
            let msgBox = el.getElementsByClassName('showNum')[0];
            let model = vnode.data.model;
            if(!model.value) return;
            msgBox.innerText = model.value.length + "/" + binding.value
            if(binding.value < model.value.length){
                msgBox.style.color = "red";
            }else{
                msgBox.style.color = "#aeaeae";
            }
        },
    }
}