const app = new Vue({
    el: '#app',
    data: {
        // 添加了新变量show,来判断商品是否已选择
        // 改为二维数组二维数组实现商品分类
        list: [
            [{
                    name: 'iphone8',
                    price: 1000,
                    count: 1,
                    show: true,
                    category: '3C Products'
                },
                {
                    name: 'iphone6',
                    price: 800,
                    count: 1,
                    show: true,
                    category: '3C Products'
                },
                {
                    name: 'MacBook Pro',
                    price: 2000,
                    count: 1,
                    show: true,
                    category: '3C Products'
                }
            ],
            [{
                    name: 'tomato',
                    price: 5600,
                    count: 1,
                    show: true,
                    category: 'Vegetables & fruits'
                },
                {
                    name: 'potato',
                    price: 3400,
                    count: 1,
                    show: true,
                    category: 'Vegetables & fruits'
                },
                {
                    name: 'apple',
                    price: 3100,
                    count: 1,
                    show: true,
                    category: 'Vegetables & fruits'
                }
            ],
            [{
                    name: 'bed',
                    price: 1000,
                    count: 1,
                    show: true,
                    category: 'Living goods'
                },
                {
                    name: 'pillow',
                    price: 50,
                    count: 1,
                    show: true,
                    category: 'Living goods'
                },
                {
                    name: 'desk',
                    price: 500,
                    count: 1,
                    show: true,
                    category: 'Living goods'
                },
                {
                    name: 'toothbrush',
                    price: 10,
                    count: 1,
                    show: false,
                    category: 'Living goods'
                }
            ],
        ]

    },
    computed: {
        // 计算总价
        totalPrice: function () {
            let total = 0;
            // 因为二维数组的原因，多了一层循环
            for (const items of this.list) {
                for (const item of items) {
                    // 根据show标记，只加上已选择商品的总价
                    if (item.show) {
                        total += item.count * item.price;
                    }
                }
            }
            // 利用正则对价格显示进行格式化
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        // 基本功能
        // 利用两层循环的index来操控数据
        handleAdd: function (indexs, index) {
            this.list[indexs][index].count++;
        },
        handleReduce: function (indexs, index) {
            if (this.list[indexs][index].count === 1) return;
            this.list[indexs][index].count--;
        },
        handleRemove: function (indexs, index) {
            this.list[indexs].splice(index, 1);
            // 如果将不选择的商品移除再次检查是否全选
            this.checkAll();
        },

        // 切换显示并检查是否全选
        toggleShow: function (indexs, index) {
            this.list[indexs][index].show = !this.list[indexs][index].show;
            this.checkAll();
        },
        // 选择全部,支持反选
        selectAll: function () {
            if (!this.$refs.all.checked) {
                for (const items of this.list) {
                    for (const item of items) {
                        item.show = false;
                    }
                }
            } else {
                for (const items of this.list) {
                    for (const item of items) {
                        item.show = true;
                    }
                }
            }
        },
        // 接受参数（是否全选），如果有任意一个没选则取消全选
        // 因为是多层循环，改用return来结束循环
        checkAll: function () {
            for (const items of this.list) {
                for (const item of items) {
                    if (item.show === false) {
                        this.$refs.all.checked = false;
                        return false;
                    } else {
                        this.$refs.all.checked = true;
                    }
                }
            }
        }
    },

    // 初始化页面完成后，先检查是否全选
    mounted: function () {
        this.checkAll();
    }
});

