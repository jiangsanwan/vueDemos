<template>
    <div class="common-comp">
       <p class="title">有命名空间之mutations使用</p>
        <div class="cont">
            <p class="sub-title">1、namespace的使用</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const userModule = namespace('user')

@Component({
    name: 'MutationComp'
})
export default class MutationComp extends Vue {
    @userModule.Mutation('setUsername') setUsername!: (username: string) => string
    mounted () {
        this.setUsername('pay')
        console.log(this.$store.getters['user/username'])
    }
}
                </pre>
            </div>
            <p class="sub-title">2、配合mapMutations的方式触发mutations里面的方法</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { mapMutations } from 'vuex'

@Component({
    name: 'MutationComp',
    methods: {
        ...mapMutations('user', ['setUsername'])
    }
})
export default class MutationComp extends Vue {
    setUsername!: any
    mounted () {
        this.setUsername('pxy')
        console.log(this.$store.getters['user/username'])// pxy
    }
}
                </pre>
            </div>
            <p class="sub-title">3、使用Mutation触发mutations里面的方法</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component({
    name: 'MutationComp'
})
export default class MutationComp extends Vue {
    @Mutation('setUsername', { namespace: 'user' })
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
        name: 'MutationComp'
    })
    export default class MutationComp extends Vue {
        @userModule.Mutation('setUsername') setUsername!: (username: string) => string
        mounted () {
            this.setUsername('pxy')
            console.log(this.$store.getters['user/username'])// pxy
        }
    }
    */
    /*
    // 配合mapMutations的第二种方式触发mutations里面的方法
    import { Component, Vue } from 'vue-property-decorator'
    import { mapMutations } from 'vuex'

    @Component({
        name: 'MutationComp',
        methods: {
            ...mapMutations('user', ['setUsername'])
        }
    })
    export default class MutationComp extends Vue {
        setUsername!: any
        mounted () {
            this.setUsername('pxy')
            console.log(this.$store.getters['user/username'])// pxy
        }
    }
    */
    /*
    // 使用Mutation触发mutations里面的方法
    */
    import { Component, Vue } from 'vue-property-decorator'
    import { Mutation } from 'vuex-class'

    @Component({
        name: 'MutationComp'
    })
    export default class MutationComp extends Vue {
        @Mutation('setUsername', { namespace: 'user' })
        setUsername!: any
        mounted () {
            this.setUsername('pxy')
            console.log(this.$store.getters['user/username'])// pxy
        }
    }
    
</script>
<style scoped lang="less">
</style>