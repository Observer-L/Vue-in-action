const app = new Vue({
    el: '#app',
    data: {
        // 添加了新变量show,来判断商品是否已选择
        list: [{
                id: 1,
                name: 'iPhone8',
                price: 1000,
                count: 1,
                show: true
            },
            {
                id: 2,
                name: 'iPhone6',
                price: 800,
                count: 1,
                show: true
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 2000,
                count: 1,
                show: false
            }
        ]
    },
    computed: {
        // 计算总价
        totalPrice: function () {
            let total = 0;
            for (const item of this.list) {
                // 根据show标记，只加上已选择商品的总价
                if (item.show) {
                    total += item.count * item.price;
                }
            }
            // 利用正则对价格显示进行格式化
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        // 基本功能
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleReduce: function (index) {
            if (this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1);
            // 如果将不选择的商品移除再次检查是否全选
            this.checkAll();
        },

        // 切换显示并检查是否全选
        toggleShow: function (index) {
            this.list[index].show = !this.list[index].show;
            this.checkAll();
        },
        // 选择全部,支持反选
        selectAll: function () {
            if (!this.$refs.all.checked) {
                for (const item of this.list) {
                    item.show = false;
                }
            } else {
                for (const item of this.list) {
                    item.show = true;
                }
            }
        },
        // 检查是否全选，如果有任意一个没选则取消全选
        checkAll: function () {
            for (const item of this.list) {
                if (item.show === false) {
                    this.$refs.all.checked = false;
                    break;
                } else {
                    this.$refs.all.checked = true;
                }
            }
        }
    },

    // 初始化页面完成后，先检查是否全选
    mounted: function () {
        this.checkAll();
    }
});