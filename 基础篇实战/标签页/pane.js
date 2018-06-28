Vue.component('pane', {
    name: 'pane',
    template: `<div class="pane" v-show="show"><slot></slot></div>`,
    // 定义show来控制标签内容的显示与隐藏
    data: function () {
        return {
            show: true
        }
    },
    // 设置name(索引值)来标识当前pane
    // 设置标签页的标题label,label是动态修改的,所以需要在pane初始化及labe更新时同时更新父组件tabs
    // 设置布尔值closable，该值不会再被修改
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        },
        closable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        // 使用$parent来访问父链(tab)中的updateNav方法
        updateNav() {
            this.$parent.updateNav();
        }
    },
    watch: {
        label() {
            this.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    }
})