// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import store from './vuex'
import VueJsonp from 'vue-jsonp'
import elementui from "element-ui"
import utils from "./utils/util"
import "element-ui/lib/theme-chalk/index.css"
import '../../../../js/ueditor1.4.3.3/ueditor.config.js'
import '../../../../js/ueditor1.4.3.3/ueditor.all.min.js'
import '../../../../js/ueditor1.4.3.3/lang/zh-cn/zh-cn.js'
import '../../../../js/ueditor1.4.3.3/ueditor.parse.min.js'
import { isAbsolute } from 'upath';
// impor

Vue.use(VueJsonp)
Vue.use(elementui)
Vue.prototype.$utils = utils;
Vue.prototype.$pageType = window.kuaixuntype
Vue.prototype.$autoRefresh = true;

Vue.directive('clickOutside', {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (binding.expression) {
        binding.value(e)
      }
    }

    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})
// 用于输入框显示字数
Vue.directive('showInputNum', {
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
})

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

Vue.filter('timeFormat', value => {
    if (!value) return ''

    let newdate = new Date()
    newdate.setTime(value)
    let nyear = newdate.getFullYear()
    // let ftime = 'yyyy-MM-dd HH:mm:ss'
    let ftime = 'HH:mm:ss'
    let dateitems = {
        M: newdate.getMonth() + 1,
        d: newdate.getDate(),
        H: newdate.getHours(),
        m: newdate.getMinutes(),
        s: newdate.getSeconds()
    }
    //替换年份
    if (/(y+)/.test(ftime)) {
        ftime = ftime.replace(RegExp.$1, nyear)
    }
    //替换月份以及其他的
    for (let i in dateitems) {
        if (new RegExp('(' + i + '+)').test(ftime)) {
        ftime = ftime.replace(
            RegExp.$1,
            RegExp.$1.length === 1
            ? dateitems[i]
            : ('00' + dateitems[i]).substring(('' + dateitems[i]).length)
        )
        }
    }
    return ftime
})

Vue.prototype.$success = function(msg){
  this.$message({
    message: msg,
    type: 'success',
    duration: 1000
  })
}

Vue.prototype.$warning = function(msg){
  this.$message({
    message: msg,
    type: 'warning',
    duration: 1000
  })
}

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})