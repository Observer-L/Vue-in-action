Vue.component('prevbtn', {
    template: `
        <button
            :class=""
            @click="prev"
        >上一步</button>
    `,
    props: {
        target: {
            type: [String, Number]
        }
    },
    data: function() {
        return {
            prev_show: this.target
        }
    },
    methods: {
        prev: function () {
            return this.$emit('prev_show', this.prev_show);
        }
    }
})