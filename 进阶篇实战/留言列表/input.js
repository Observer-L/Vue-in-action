Vue.component('vInput', {
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    // 创建副本
    data: function () {
        return {
            val: this.value
        }
    },
    render: function (h) {
        const _this = this;
        return h('div', [
            h('span', '昵称：'),
            h('input', {
                attrs: {
                    type: 'text'
                },
                domProps: {
                    value: this.val
                },
                on: {
                    // 监听input事件，把输入的内容用$emit派发给父组件
                    input: function (e) {
                        _this.val = e.target.value;
                        _this.$emit('input', e.target.value);
                    }
                }
            })
        ]);
    }
});

Vue.component('vTextarea', {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    // 创建副本
    data: function () {
        return {
            val: this.value
        }
    },
    render: function (h) {
        const _this = this;
        return h('div', [
            h('span', '留言内容：'),
            h('textarea', {
                attrs: {
                    placeholder: '请输入留言内容'
                },
                domProps: {
                    value: this.val
                },
                ref: 'message',
                on: {
                    input: function (e) {
                        _this.val = e.target.value;
                        _this.$emit('input', e.target.value);
                    }
                }
            })
        ]);
    },
    methods: {
        focus: function () {
            this.$refs.message.focus();
        }
    },
    watch: {
        // 监听props属性value，让data中的副本同步数据
        value(vals) {
            this.val = vals;
        }
    }
});