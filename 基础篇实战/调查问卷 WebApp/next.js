Vue.component('nextbtn', {
    // 模板
    // 根据条件判断按钮状态，并绑定点击事件
    template: `
        <button
            :class="Cls()"
            @click="next"
        >下一步</button>
    `,
    // 接受父组件传来的值
    props: {
        // 验证数值
        picked: {
            type: [String, Array]
        },
        target: {
            type: [String, Number]
        }
    },
    // 在组件内部维护data
    data: function () {
        return {
            next_show: this.target,
            current: this.picked
        }
    },
    methods: {
        next: function () {
            // 多选题（复选框，返回的是数组类型的值）
            if (typeof this.current === 'object') {
                if ((this.current.length >= 2) && (this.current.length <= 3))
                    // 如果通过验证则手动触发父组件的自定义的next_show事件并传值给父组件
                    return this.$emit('next_show', this.next_show);
                else return;
            }
            // 单选题、填写提（单选框、文本框，返回的是字符串）
            if (typeof this.current === 'string') {
                this.current !== '' ? this.$emit('next_show', this.next_show) : null;
            }
        },
        // 根据条件改变按钮颜色（类名）
        Cls: function () {
            if (typeof this.current === "string") {
                if (this.current == '') {
                    return 'btn-disable';
                } else return 'btn-usable';
            }
            if (typeof this.current === "object") {
                // 最少选择2项，最多选择3项 
                if ((this.current.length < 2) || (this.current.length > 3)) {
                    return 'btn-disable';
                } else return 'btn-usable';
            }
        }
    },
    watch: {
        // 监听父组件picked
        picked: function (val) {
            this.current = val;
        }
    }
})