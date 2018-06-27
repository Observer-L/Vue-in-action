// 表单验证：判断输入值是否位数字（支持正负浮点数/整数）
function isValeNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    // 模板
    // 支持输入框聚焦时键盘上下按键加减数值（keyup事件）
    template: `
        <div class="input-number">
        <input 
            type="text"
            :value="currentValue"
            @change="handleChange"
            @keyup="handleKeyUp" 
        ></input>
        <button
            @click="handleDown"
            :disabled="currentValue <= min"
        >
        -
        </button>
        <button
            @click="handleUp"
            :disabled="currentValue >= max"
        >
        +
        </button>
        </div>
        `,
    // 父组件向子组件正向传递数据
    // 在子组件中，使用 props 来声明需要从父组件接受的数据
    // 可以对 props 的值指定类型和默认值
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        },
    },
    // Vue组件是单向数据流，因此无法在组件内部直接修改 prop value 的值
    // data中的是组件自己的数据，作用域是组件本身
    // currentValue默认引用value的值，然后在组件内部维护data

    data: function () {
        return {
            //子组件将父组件传递过来的值进行保存，在本组件的作用域下进行使用
            currentValue: this.value
        }
    },
    // 监听某个data或prop的改变
    watch: {
        // 监听子组件currentValue， 子组件要把currentValue数据传递回去，在子组件中使用$emit实现与父组件的通信
        currentValue: function (val) {
            // 使用v-model语法糖改变value
            this.$emit('input', val);
            // 自定义事件，未使用
            this.$emit('on-change', val);
        },
        // 监听父组件value
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        // 验证规范父组件传递过来的值
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue--;
        },
        handleUp: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue++;
        },
        handleChange: function (e) {
            let val = e.target.value.trim();
            const max = this.max;
            const min = this.min;
            // 验证输入值并设置currentValue
            if (isValeNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                // 若验证失败，则恢复为原值
                e.target.value = this.currentValue;
            }
        },
        // 判断是否为上下按键，执行相应加减函数
        handleKeyUp: function (e) {
            if (e.keyCode !== 38 && e.keyCode !== 40) return;
            e.keyCode === 38 ? this.handleUp() : this.handleDown();
        }
    },
    // 初始化
    mounted: function () {
        this.updateValue(this.value);
    }
});