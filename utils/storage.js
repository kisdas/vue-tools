export default {
    /**
     * 
     * @param {*} sKey ：key
     * @param {*} version ：版本号
     * @param {*} callback ：回调
     */
    getLocalStorage(sKey, version='v1.0', callback) {
        let result;
        let projectKey = 'pcclient';
        if (window.__ths_localstorage && window.__ths_localstorage[sKey] && window.__ths_localstorage[sKey].v === version) {
            if (callback) {
                callback(window.__ths_localstorage[sKey].value);
            }
            return window.__ths_localstorage[sKey].value;
        }
        try {
            result = localStorage.getItem(projectKey);
            result = JSON.parse(result);
            window.__ths_localstorage = result;
            if (result && result[sKey] && result[sKey].v === version) {
                if (callback) {
                    callback(result[sKey].value);
                }
                return result[sKey].value;
            }
        } catch (e) {
            console.error(e);
        }
    },
    /**
     * 
     * @param {*} sKey :key
     * @param {*} item :data,[Object,Array,String,Number]
     * @param {*} version :版本号
     */
    setLocalStorage(sKey, item, version = 'v1.0') {
        let projectKey = 'pcclient';
        //为了防止对象被修改
        let value = JSON.parse(JSON.stringify(item));
        if (window.__ths_localstorage) {
            window.__ths_localstorage[sKey] = {
                v: version,
                value: value
            };
        } else {
            window.__ths_localstorage = {};
            window.__ths_localstorage[sKey] = {
                v: version,
                value: value
            };
        }
        try {
            localStorage.setItem(projectKey, JSON.stringify(window.__ths_localstorage));
        } catch (e) {
            console.error(e);
            localStorage.clear();
        }
    },

}