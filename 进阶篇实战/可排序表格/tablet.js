Vue.component('vTablet', {
    // 使用templa
    template: `
        <table>
        <colgroup>
            <template v-for="(col, index) in this.currentColumns">
                <col :width="col.width + 'px'"></col>
            </template>
        </colgroup>
            <thead>
                <th v-for="(col, index) in this.currentColumns">
                    {{ col.title }}
                    <span v-if="col.sortable">
                    <a @click="handleSort(index, true)">↑</a>\
                    <a @click="handleSort(index)">↓</a>\
                    </span>
                </th>
            </thead>
            <tbody>
                <tr v-for="row in getCurrentData">
                    <td v-for="value in row">{{ value }}</td>
                </tr>
            </tbody>
        </table>`,
    props: {
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        },
    },
    // 让原始数据和排序后的数据互相独立
    // 需要在初始化的时候赋值过去
    data: function () {
        return {
            currentColumns: [],
            currentData: [],
        }
    },
    methods: {
        // 用来给data在初始化时赋值的函数
        makeColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                // 添加一个字段标识当前列排序的状态
                // 只能同时对一列数据进行排序，即列与列之间的排序是互斥的，所以需要标记当前列的排序状态（默认normal不排序）
                col._sortType = 'normal';
                // 添加一个字段标识当前列在数组中的索引
                col._index = index;
                return col;
            });
        },
        makeData: function () {
            this.currentData = this.data.map(function (row, index) {
                // 添加一个字段标识当前行在数组中的索引
                // 因为排序后currentData中数据顺序被打乱，所以需要标识每一项在原始数据中的索引。
                row._index = index;
                return row;
            })
        },
        // 排序函数，整合升降排序函数。
        // 第二个参数isAsc为是否升序，默认降序。
        handleSort: function (index, isAsc) {
            const key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            if (isAsc) {
                this.currentColumns[index]._sortType = 'asc';
                this.currentData.sort(function (a, b) {
                    return a[key] > b[key] ? 1 : -1;
                });
            } else {
                this.currentColumns[index]._sortType = 'desc';
                this.currentData.sort(function (a, b) {
                    return a[key] < b[key] ? 1 : -1;
                });
            }

        }
    },
    mounted() {
        // v-table 初始化时调用
        this.makeColumns();
        this.makeData();
    },
    watch: {
        // 对父级的data数据进行监听
        data: function () {
            this.makeData();
            // 如果某行已经处于排序状态，那么更新（删减行）后应该再处理一次排序
            const sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal';
            });
            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSort(sortedColumn[0]._index, true);
                } else {
                    this.handleSort(sortedColumn[0]._index, false);
                }
            }
        }
    },
    computed: {
        // 利用计算属性获取行内容
        getCurrentData: function () {
            return this.currentData.map(function (row) {
                delete row._index; // 索引值无需使用
                return row;
            })
        }
    }
})