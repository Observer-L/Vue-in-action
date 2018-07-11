Vue.directive('clickoutside', {
    // 初始化指令
    bind: function (el, binding) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) return false;
            // 判断指令中是否绑定了函数,如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            if (binding.expression) binding.value(e);
        };
        function documentESC(e) {
            // 支持ESC键关闭菜单
            if (e.keyCode === 27) {
                if (binding.expression) binding.value(e);
            } else return;
        };
        /* 
            Vue2在自定义指令中不能再用this.xxx的形式在上下文中声明一个变量
            给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            如果不移除，当组件或元素销毁时，它仍然存在于内存中 
        */
       
        el.__vueClickOutside__ = documentHandler;
        el.__vueClickOutside__ = documentESC;
        document.addEventListener('click', documentHandler);
        document.addEventListener('keydown', documentESC);
    },
    //更新事件
    update: function (el) {
        document.addEventListener('click', el.__vueClickOutside__);
        document.addEventListener('keydown', el.__vueClickOutside__);
    },
    //移除事件
    unbind: function (el) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        document.removeEventListener('keydown', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
        delete el.__vueClickOutside__;
    }
})