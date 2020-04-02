
var app5 = new Vue({
    template: `<template>
                <div id='ssss' @click='reverseMessage'>{{message}}</div>
            </template>`,
    data: {
        message: 'Hello Vue.js!'
    },
    created(){
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('');
            this.$el.dispatchEvent(new Event('reverseMessage',{
                bubbles:true,
                valueData: '123'
            }))
        }
    }
})