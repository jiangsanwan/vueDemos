<template>
    <div>{{ msg }}</div>
</template>

<script type="text/ecmascript-6">
    import { ref } from 'vue'
    export default {
        name: 'ComRefs',
        setup () {
            let msg = ref('abc'),
                change = () => {
                    console.log(123)
                };
            return {
                msg,
                change
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>