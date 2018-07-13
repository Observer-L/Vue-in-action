Vue.component('resetbtn', {
    template: `
        <button
            :class=""
            @click="reset"
        >重置</button>
    `,
    props: {
        value: {
            type: [String, Array]
        }
    },
    data: function () {
        return {
            current: this.value
        }
    },
    methods: {
        reset: function () {
            // 如果是复选框（数数组类型）的情况，则触发父组件的自定义的on_change事件并空数组给父组件
            if (typeof this.current === 'object') {
                if (this.current.length !== 0) {
                    this.current = [];
                    this.$emit('on_change', this.current);
                }
            }
            // 如果是单选框和文本框（字符串类型）的情况，则触发父组件的自定义的on_change事件并空字符串给父组件
            if (typeof this.current === 'string') {
                if (this.current !== '') {
                    this.current = '';
                    this.$emit('on_change', this.current);
                }
            }
        }
    },
    watch: {
        value: function (val) {
            this.current = val;
        }
    }
})