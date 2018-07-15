const app = new Vue({
    el: '#app',
    /* columns的每一项是一个对象
    title和key用来标识列的表头标题，必填。title对应组件data中列内容的字段名，key用来索引行内容
    sortable是选填字段，true为需要排序
    witdh为列宽
    */
    data: {
        columns: [{
                title: '姓名',
                key: 'name',
                width: 100,
                sortable: false
            },
            {
                title: '年龄',
                key: 'age',
                width: 50,
                sortable: true
            },
            {
                title: '出生日期',
                key: 'birthday',
                width: 150,
                sortable: true
            },
            {
                title: '地址',
                key: 'address',
                width: 250,
                sortable: false
            }
        ],
        data: [{
                name: '王小明',
                age: 18,
                birthday: '1999-02-21',
                address: '北京市朝阳区芍药居'
            },
            {
                name: '张小刚',
                age: 25,
                birthday: '1992-01-23',
                address: '北京市海淀区西二旗'
            },
            {
                name: '李小红',
                age: 30,
                birthday: '1987-11-10',
                address: '上海市浦东新区世纪大道'
            },
            {
                name: '周小伟',
                age: 26,
                birthday: '1991-10-10',
                address: '深圳市南山区深南大道'
            }
        ],
        value: 50
    },
    methods: {
        handleAddData: function () {
            this.data.push({
                name: '刘小天',
                age: 19,
                birthday: '1998-5-30',
                address: '北京市东城区东直门'
            });
        }
    }
});