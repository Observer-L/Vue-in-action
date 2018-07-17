Vue.component('list', {
    props: {
        list: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data: function () {
        return {
            messages: this.list
        }
    },
    render: function (h) {
        const _this = this;
        const list = [];
        this.list.forEach(function (msg, index) {
            const node = h('div', {
                attrs: {
                    class: 'list-item'
                }
            }, [
                h('span', msg.name + '：'),
                h('div', {
                    class: 'list-msg'
                }, [
                    h('p', msg.message),
                    h('a', {
                        attrs: {
                            class: 'list-reply'
                        },
                        on: {
                            click: function () {
                                _this.handleReply(index);
                            }
                        }
                    }, '回复'),
                    h('a', {
                        attrs: {
                            class: 'btn-close'
                        },
                        on: {
                            click: function () {
                                _this.handleDelete(index);
                            }
                        }
                    }, 'X')
                ])
            ])
            list.push(node);
        });
        if (this.list.length) {
            return h('div', {
                attrs: {
                    class: 'list'
                }
            }, list);
        } else {
            return h('div', {
                attrs: {
                    class: 'list-nothing'
                }
            }, '留言列表为空');
        }
    },
    methods: {
        handleReply: function (index) {
            this.$emit('reply', index);
        },
        // 删除留言
        handleDelete: function (index) {
            this.messages.splice(index, 1);
        }
    },
    watch: {
        list(vals) {
            this.messages = vals;
        }
    }
});