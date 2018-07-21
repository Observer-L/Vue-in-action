<template>
    <div>
        <Counter :number="number"></Counter>
    </div>
</template>
<script>
import Counter from './counter.vue';

export default {
    components: {
        Counter
    },
    methods: {
        handleAddRandom (num) {
            this.number += num;
        }
    },
        data() {
                return {
                    number: 0
                }
        },
    created() {
        this.$bus.on('add', this.handleAddRandom);
    },
    beforeDestroy() {
        this.$bus.off('add', this.handleAddRandom);
    },
}
</script>

