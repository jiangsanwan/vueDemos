<template>
    <div>
        <a-list item-layout="horizontal" :data-source="userStoreData">
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
        <!--{{ userStore.username }}
        {{ username }}
        {{ getters['user/username'] }}
        {{ gUsername }}-->
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, computed, onMounted } from 'vue'
    import { useStore } from 'vuex'
	export default {
        name: 'UsestoreCom',
		setup () {
            let userStoreData = ref([
                    {
                        title: '1、获取整个state',
                        desc: [
                            '获取: userStore = computed( () => store.state.user )',
                            '使用: userStore.value.username',
                            '插值式中使用: userStore.username'
                        ]
                    },
                    {
                        title: '2、获取单个state',
                        desc: [
                            '获取: username = computed( () => store.state.user.username )',
                            '使用: username.value',
                            '插值式中使用: username'
                        ]
                    },
                    {
                        title: '3、获取整个getters',
                        desc: [
                            '获取: getters = computed( () => store.getters )',
                            '使用: getters.value["user/username"]',
                            '插值式中使用: getters["user/username"]'
                        ]
                    },
                    {
                        title: '4、获取单个getters',
                        desc: [
                            '获取: gUsername = computed( () => store.getters["user/username"] )',
                            '使用: gUsername.value',
                            '插值式中使用: gUsername'
                        ]
                    },
                    {
                        title: '5、mutations的使用',
                        desc: [
                            '方式一、直接调用 store.commit("user/setTotal", 20)',
                            '方式二、<br />let totalNum = ref(30), setTotal = totalNum => store.commit("user/setTotal", totalNum);// 声明变量<br />setTotal(totalNum.value)// 执行方法'
                        ]
                    },
                    {
                        title: '6、actions的使用',
                        desc: [
                            '方式一、直接调用 store.dispatch("user/testActions", 20)',
                            '方式二、<br />let testNum = ref(30), testActions = testNum => store.dispatch("user/testActions", testNum);// 声明变量<br />testActions(testNum.value)// 执行方法'
                        ]
                    }
                ]),
                store = useStore(),
                userStore = computed( () => store.state.user ),// 获取整个state
                username = computed( () => store.state.user.username ),// 获取单个state
                getters = computed( () => store.getters ),// 获取整个getters
                gUsername = computed(() => store.getters['user/username']),//获取单个getters
                // mitations的使用方式1
                totalNum = ref(30),
                setTotal = totalNum => store.commit('user/setTotal', totalNum),
                // actions的使用方式1
                testNum = ref(50),
                testActions = testNum => store.dispatch("user/testActions", testNum);
            onMounted(() => {
                // state
                console.log(userStore.value.username)// admin
                console.log(username.value)// admin
                console.log('-----------------')
                // getters
                console.log(getters.value['user/username'])// admin
                console.log(gUsername.value)// admin
                // mutations
                setTotal(totalNum.value)

                // mitations的使用方式2
                // store.commit('user/setTotal', 20)
                console.log(store.getters['user/total'])// 30

                // actions
                testActions(testNum.value)
                // actions的使用方式2
                // store.dispatch('user/testActions', 40)
            })
			return {
				userStoreData,
                userStore,
                username,
                getters,
                gUsername
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../../assets/stylus/vue'
</style>