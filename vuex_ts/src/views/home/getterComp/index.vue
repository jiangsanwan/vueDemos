<template>
    <div class="common-comp">
       <p class="title">有命名空间之getters使用</p>
        <div class="cont">
            <p class="sub-title">1、namespace的使用</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const userModule = namespace('user')

@Component({
    name: 'GetterComp'
})
export default class GetterComp extends Vue {
    @userModule.Getter('username') username?: string
    mounted () {
        console.log(this.username)// fremember
    }
}
                </pre>
            </div>
            <p class="sub-title">2、配合mapGetters的方式获取getter</p>
            <div class="box">
                <pre>
import  { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
@Component({
    name: 'GetterComp',
    computed: mapGetters('user', ['username'])
})
export default class GetterComp extends Vue {
    username!: string
    mounted () {
        console.log(this.username)// fremember
    }
}
                </pre>
            </div>
            <p class="sub-title">3、使用Getter获取getter</p>
            <div class="box">
                <pre>
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
    name: 'GetterComp'
})
export default class GetterComp extends Vue {
    @Getter('username', { namespace: 'user' })
    username!: string
    mounted () {
        console.log(this.username)
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
        name: 'GetterComp'
    })
    export default class GetterComp extends Vue {
        @userModule.Getter('username') username?: string
        mounted () {
            console.log(this.username)// fremember
        }
    }
    */
    /*
    // 配合mapGetters的方式获取getter
    import  { Component, Vue } from 'vue-property-decorator'
    import { mapGetters } from 'vuex'
    @Component({
        name: 'GetterComp',
        computed: mapGetters('user', ['username'])
    })
    export default class GetterComp extends Vue {
        username!: string
        mounted () {
            console.log(this.username)// fremember
        }
    }
    */
    /*
    // 使用Getter获取getter
    */
    import { Component, Vue } from 'vue-property-decorator'
    import { Getter } from 'vuex-class'

    @Component({
        name: 'GetterComp'
    })
    export default class GetterComp extends Vue {
        @Getter('username', { namespace: 'user' })
        username!: string
        mounted () {
            console.log(this.username)
        }
    }
    
</script>
<style scoped lang="less">
</style>