<template>
    <div>
        <div class="header">
            <router-link to="/list" class="header-title">电商网站示例</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    购物车
                    <span v-if="cartList.length">{{ cartList.length }}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        computed: {
            cartList () {
                return this.$store.state.cartList;
            }
        },
        mounted() {
            // 购物车数据本地储存
            if (localStorage.cartData) {
                JSON.parse(localStorage.cartData).forEach(item => this.$store.state.cartList.push(item));
            } else {
                localStorage.setItem('cartData', JSON.stringify(this.$store.state.cartList));
            }
        },
    }
</script>