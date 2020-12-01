<template>
    <div class="common-comp">
       <p class="title">有命名空间之actions使用</p>
        <div class="cont">
            <p class="sub-title">1、namespace的使用</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const userModule = namespace('user')

@Component({
    name: 'ActionComp'
})
export default class ActionComp extends Vue {
    @userModule.Action('setUsername') setUsername!: (username: string) => string
    mounted () {
        this.setUsername('pxy')
        console.log(this.$store.getters['user/username'])// pxy
    }
}
                </pre>
            </div>
            <p class="sub-title">2、配合mapActions的第二种方式触发actions里面的方法</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
    name: 'ActionComp',
    methods: {
        ...mapActions('user', ['setUsername'])
    }
})
export default class ActionComp extends Vue {
    setUsername!: any
    mounted () {
        this.setUsername('pxy')
        console.log(this.$store.getters['user/username'])// pxy
    }
}
                </pre>
            </div>
            <p class="sub-title">3、使用Action触发actions里面的方法</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component({
    name: 'ActionComp'
})
export default class ActionComp extends Vue {
    @Action('setUsername', { namespace: 'user' })
    setUsername!: any
    mounted () {
        this.setUsername('pxy')
        console.log(this.$store.getters['user/username'])// pxy
    }
}
                </pre>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    /*
    // namespace的使用
    import { Component, Vue } from 'vue-property-decorator'
    import { namespace } from 'vuex-class'

    const userModule = namespace('user')

    @Component({
        name: 'ActionComp'
    })
    export default class ActionComp extends Vue {
        @userModule.Action('setUsername') setUsername!: (username: string) => string
        mounted () {
            this.setUsername('pxy')
            console.log(this.$store.getters['user/username'])// pxy
        }
    }
    */
    /*
    // 配合mapActions的第二种方式触发actions里面的方法
    import { Component, Vue } from 'vue-property-decorator'
    import { mapActions } from 'vuex'

    @Component({
        name: 'ActionComp',
        methods: {
            ...mapActions('user', ['setUsername'])
        }
    })
    export default class ActionComp extends Vue {
        setUsername!: any
        mounted () {
            this.setUsername('pxy')
            console.log(this.$store.getters['user/username'])// pxy
        }
    }
    */
    /*
    // 使用Action触发actions里面的方法
    */
    import { Component, Vue } from 'vue-property-decorator'
    import { Action } from 'vuex-class'

    @Component({
        name: 'ActionComp'
    })
    export default class ActionComp extends Vue {
        @Action('setUsername', { namespace: 'user' })
        setUsername!: any
        mounted () {
            this.setUsername('pxy')
            console.log(this.$store.getters['user/username'])// pxy
        }
    }
</script>
<style scoped lang="less">
</style>