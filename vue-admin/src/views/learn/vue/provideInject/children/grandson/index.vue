<template>
    <div>
        孙子组件{{ gMsg }}
        孙子组件{{ colorRef }}
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, inject } from 'vue'
    export default {
        name: 'Grandson',
        setup () {
            let gMsg = ref(inject('color')),
                colorRef = ref(inject('colorRef'))
            return {
                gMsg,
                colorRef
            }
        }
    }
</script>

<style>

</style>