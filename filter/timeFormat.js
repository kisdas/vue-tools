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