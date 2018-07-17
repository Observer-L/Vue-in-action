const app = new Vue({
    el: '#app',
    data: {
        username: 'god',
        message: '',
        list: [] // 储存所有留言内容
    },
    methods: {
        // 添加留言
        handleSend: function () {
            // 必填验证
            if (this.username == '') {
                alert('请输入昵称');
                return;
            }
            if (this.message == '') {
                alert('请输入留言内容');
                return;
            }
            this.list.push({
                name: this.username,
                message: this.message
            });
            // 重置文本框
            this.message = '';
        },
        handleReply: function(index) {
            // 提取要回复的昵称，并设置到文本框内
            const name = this.list[index].name;
            this.message = '回复@' + name + '：';
            // 点击回复后让文本框聚焦
            this.$refs.message.focus();
        }
    }
})