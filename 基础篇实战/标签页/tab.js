// 标签页外层的组件tabs
Vue.component('tabs', {
    // 模板
    // tabs-bar为标签页标题，用v-for指令循环显示tab标题
    // 使用v-bind:class指向一个method来动态设置class
    // @click监听标签的点击事件,在回调中利用index来改变当前选中tab的索引值currentValue
    // 在pane组件中新增了一个closable的属性来支持关闭标签
    // 由于v-show不支持template语法而且该按钮的显示条件不会再变，所以用了v-if来切换显示
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <div
                :class="tabCls(item)"
                v-for="(item, index) in navList"
                @click="handleChange(index)">
                {{ item.label }}
                <span
                    v-if="isClosable(item)"
                    @click="closeTab(index, $event)"
                    class="btn-close">x</span>
            </div>
        </div>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>
    `,
    // 用props从父级获取value(activeKey)来设置默认显示的tab页
    props: {
        // 这里的value是为了可以使用v-model
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            // 用于渲染 tabs 的标题
            navList: [],
            // 因为不能修改value，所以复制一份自己维护
            currentValue: this.value
        }
    },
    methods: {
        // 过滤并获取所有pane组件的label
        getTabs() {
            return this.$children.filter(function (item) {
                return (item.$options.name === 'pane');
            });
        },
        // 是否显示关闭按钮
        isClosable: function (item) {
            return item.closable;
        },
        // 关闭标签
        closeTab(index, event) {
            // 如果是要关闭的是当前标签页
            if (this.navList[index].name === this.currentValue) {
                // 如果前面还有标签就顶替上来，即非第一个标签页
                if (index > 0) {
                    this.currentValue == this.navList[index - 1].name;
                    this.navList.splice(index, 1);
                    event.stopPropagation();
                }
                // 如果是第一个标签页，则让下一个顶上来，如果有的话
                else {
                    this.navList.splice(index, 1);
                    if (this.navList.length > 0) {
                        this.currentValue = this.navList[0].name;
                    } else {
                        this.currentValue = '';
                    }
                    event.stopPropagation();
                }
            }
            // 关闭的不是当前标签，且存在其他标签，则无需改动currentValue
            else {
                console.log('outter change')
                this.navList.splice(index, 1);
                // 如果已无其它标签，则清楚currentValue
                if (this.navList.length === 0) {
                    this.currentValue = '';
                }
                event.stopPropagation();
            }

        },
        // 设置标签
        updateNav() {
            this.navList = [];
            // 设置对this的引用，在function回调里，this指向的并不是Vue实例，也可以用箭头函数替代
            const _this = this;
            // 遍历每一个pane，将每个pane的label和name/index放到navList数组里，在模板中使用
            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                });
                // 如果没有给pane设置name，默认设置它的索引
                if (!pane.name) panename = index;
                // 设置当前选中的tab的索引
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        // 给tab设置类
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    // 给当前选中的tab加一个class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        // 点击tab标题时触发
        handleChange: function (index) {
            // console.log('change')
            const nav = this.navList[index];
            const name = nav.name;
            // 改变当前选中的tab，并触发下面的watch
            this.currentValue = name;
            // 更新value
            this.$emit('input', name);
            // 出发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        },
        // 更新标签页状态(显示/隐藏)
        updateStatus() {
            const tabs = this.getTabs();
            const _this = this;
            // 显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach(function (tab) {
                return tab.show = (tab.name === _this.currentValue);
            })
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }
    }

})