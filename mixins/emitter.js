function _$broadcast( eventName, params) {
    this.$children.forEach(function (child) {
        child.$emit.apply(child, [eventName].concat(params));
        _$broadcast.apply(child, [ eventName].concat([params]));
    });
}
  
export default {
    methods: {
        // 向上广播事件
        $dispatch: function (componentName, eventName, params) {
            params.uid = this._uid;
            var parent = this.$parent || this.$root;
            var name = parent.$options.name;
    
            while (parent && (!name || name !== componentName)) {
                params.uid = parent._uid;
                parent = parent.$parent;
        
                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                return parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        // 向下广播事件
        $broadcast: function ( eventName, params) {
            var _this = this;
    
            setTimeout(function () {
                _$broadcast.call(_this, eventName, params);
            });
        },
        $notice: function (componentName, eventName, params) {
            var _this2 = this;
    
            setTimeout(function () {
                _$broadcast.call(_this2.$root, componentName, eventName, params);
            });
        }
    }
};