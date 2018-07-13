const app = new Vue({
    el: '#app',
    data: {
        // 每一页的显示情况
        one: true,
        two: false,
        three: false,
        // 问卷初始状态
        picked: '',
        checked: [],
        text: ''
    },
    methods: {
        nextShow: function (target) {
            if (target === 2) {
                this.one = false;
                this.two = true;
                this.three = false;
            } else if (target === 3) {
                this.one = false;
                this.two = false;
                this.three = true;
            }
        },
        prevShow: function (target) {
            if (target === 1) {
                this.one = true;
                this.two = false;
                this.three = false;
            } else if (target === 2) {
                this.one = false;
                this.two = true;
                this.three = false;
            }
        },
        // 重置单选框和复选框
        defcha: function (val) {
            //判断返回类型
            if (typeof val === "object") {
                this.checked = val;
            } else if (typeof val === "string") {
                this.picked = val;
            } else return;
        },
        // 重置文本输入框
        defchb: function (val) {
            this.text = val;
        },
    }
})