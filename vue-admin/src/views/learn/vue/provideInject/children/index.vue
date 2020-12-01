<template>
    <div>
        子组件 {{ cMsg }}
        <grandson />
    </div>
</template>

<script type="text/ecmascript-6">
    import Grandson from './grandson/index'
    import { ref, inject } from 'vue'
    export default {
        name: 'Children',
        components: { Grandson },
        setup () {
            let cMsg = ref(inject('color'))
            return {
                cMsg
            }
        }
    }
</script>

<style>

</style>