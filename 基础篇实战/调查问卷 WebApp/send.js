Vue.component('send', {
    template: `
        <button
            :class="Cls()"
            @click="send"
        >提交</button>
    `,
    props: {
        value: {
            type: String
        }
    },
    data: function () {
        return {
            text: this.value
        }
    },
    methods: {
        send: function () {
            this.text.length < 100 ? null : alert("提交成功");
        },
        Cls: function () {
            if (this.text.length < 100) {
                return "btn-disable";
            } else return "btn-usable";
        }
    },
    watch: {
        value: function (val) {
            this.text = val;
        }
    }
})