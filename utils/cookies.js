var cookies = {
    set:function(key,val,time = 1){
        var date=new Date();
        var expiresDays=time;  
        date.setTime(date.getTime()+expiresDays*24*3600*1000); 
        document.cookie=key + "=" + val +";expires="+date.toGMTString();  
    },
    get:function(key){//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g,"");  
        var arrCookie = getCookie.split(";")  
        var tips;  
        for(var i=0;i<arrCookie.length;i++){   
            var arr=arrCookie[i].split("=");   
            if(key==arr[0]){ 
                tips=arr[1];   
                break;   
            }
        }
        return tips
    },
    delete:function(key){ 
        var date = new Date(); 
        date.setTime(date.getTime()-10000); 
        document.cookie = key + "=v; expires =" +date.toGMTString();
    }
}
export default{
    cookies,
    arr,
    file,
    obj
}