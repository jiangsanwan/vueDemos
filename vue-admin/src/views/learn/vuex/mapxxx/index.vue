<template>
	<div>
        <a-list item-layout="horizontal" :data-source="mapXxxData">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta>
                        <template #description>
                            <p v-show="item.desc" v-for="(itm, index) in item.desc" :key="index"  v-html="itm"></p>
                        </template>
                        <template #title>{{ item.title }}</template>
                        
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <!--{{ accessToken }}
        {{ username }}-->
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, computed, onMounted } from 'vue'
	import { mapState, mapGetters, mapMutations, mapActions, useStore } from 'vuex'
	export default {
        name: 'MapxxxCom',
		setup () {
            let mapXxxData = ref([
                    { title: '1、mapState使用', desc: [
                        "设置1、states = mapState('user', ['accessToken', 'rolename']),",
                        "设置2、accessToken = computed(states.accessToken.bind({ $store: store })),",
                        "设置3、rolename = computed(states.rolename.bind({ $store: store })),",
                        "使用：accessToken.value",
                        '插值式中使用: accessToken'
                    ] },
                    { title: '2、mapGetters使用', desc: [
                        "设置1、getters = mapGetters('user', ['username', 'avatar']),",
                        "设置2、username = computed(getters.username.bind({ $store: store })),",
                        "设置3、avatar = computed(getters.avatar.bind({ $store: store })),",
                        "使用：username.value",
                        '插值式中使用: username'
                    ] },
                    { title: '3、mapMutations使用', desc: [
                        "设置1、mutations = mapMutations('user', ['setUserList', 'setTotal']),",
                        "设置2、setUserList = mutations.setUserList.bind({ $store: store }),",
                        "设置3、setTotal = mutations.setTotal.bind({ $store: store }),",
                        "使用：setUserList([{ name: 'abc' }])"
                    ] },
                    { title: '4、mapActions使用', desc: [
                        "设置1、actions = mapActions('user', ['testActions']),",
                        "设置2、testActions = actions.testActions.bind({ $store: store })",
                        "使用：testActions()"
                    ] }
                ]),
                store = useStore(),
				// mapState
				states = mapState('user', ['accessToken', 'rolename']),
				accessToken = computed(states.accessToken.bind({ $store: store })),
				rolename = computed(states.rolename.bind({ $store: store })),
				// mapGetters
				getters = mapGetters('user', ['username', 'avatar']),
				username = computed(getters.username.bind({ $store: store })),
				avatar = computed(getters.avatar.bind({ $store: store })),
				// mapMutations
				mutations = mapMutations('user', ['setUserList', 'setTotal']),
				setUserList = mutations.setUserList.bind({ $store: store }),
				// setTotal = mutations.setTotal.bind({ $store: store }),
				// mapActions
				actions = mapActions('user', ['testActions']),
				testActions = actions.testActions.bind({ $store: store });
			onMounted(() => {
				// mapState
				console.log('mapState accessToken: ' + accessToken.value)
				console.log('mapState rolename: ' + rolename.value)

				// mapGetters
				console.log('mapGetters username: ' + username.value)
				console.log('mapGetters avatar:' + avatar.value)

				// mapMutations
				setUserList([{ name: 'abc' }])
				console.log(store.getters['user/userList'])

				// mapActions
				testActions()
			})
			return {
				mapXxxData,
                accessToken,
                username
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>