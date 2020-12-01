<template>
    <div class="common-comp">
       <p class="title">有命名空间之state使用</p>
        <div class="cont">
            <p class="sub-title">1、namespace的使用</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const userModule = namespace('user')
@Component({
    name: 'StateComp'
})
export default class StateComp extends Vue {
    // 方式1
    // @userModule.State(state => state.username) username?: string
    // 方式2
    @userModule.State('username') username?: string
    mounted () {
        console.log(this.username)// fremember
    }
}
                </pre>
            </div>

            <p class="sub-title">2、配合mapState的方式获取state</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
    name: 'StateComp',
    computed: mapState('user', ['username'])
})
export default class StateComp extends Vue {
    username!: string
    mounted () {
        console.log(this.username)// fremember
    }
}
                </pre>
            </div>
            <p class="sub-title">3、使用State方式获取state</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component({
    name: 'StateComp'
})
export default class StateComp extends Vue {
    @State('username', { namespace: 'user' })
    username!: string
    mounted () {
        console.log(this.username)// fremember
    }
}
                </pre>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    // namespace的使用
    import { Component, Vue } from 'vue-property-decorator'
    import { namespace } from 'vuex-class'

    const userModule = namespace('user')
    @Component({
        name: 'StateComp'
    })
    export default class StateComp extends Vue {
        // 方式1
        // @userModule.State(state => state.username) username?: string
        // 方式2
        @userModule.State('username') username?: string
        mounted () {
            console.log(this.username)// fremember
        }
    }
    /*
    // 配合mapState的方式获取state
    import { Component, Vue } from 'vue-property-decorator'
    import { mapState } from 'vuex'
    @Component({
        name: 'StateComp',
        computed: mapState('user', ['username'])
    })
    export default class StateComp extends Vue {
        username!: string
        mounted () {
            console.log(this.username)// fremember
        }
    }
    */
    /*
    // 使用State获取state
    import { Component, Vue } from 'vue-property-decorator'
    import { State } from 'vuex-class'
    @Component({
        name: 'StateComp'
    })
    export default class StateComp extends Vue {
        @State('username', { namespace: 'user' })
        username!: string
        mounted () {
            console.log(this.username)// fremember
        }
    }
    */
    
</script>
<style scoped lang="less">
</style>