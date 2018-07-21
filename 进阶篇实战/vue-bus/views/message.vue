<template>
    <div>
        {{ message }}
        <button @click="handleClick">Change word</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                message: 'Hello World'
            }
        },
        methods: {
            handleClick () {
                this.message = 'Hello Vue';
            }
        }
    }
</script>