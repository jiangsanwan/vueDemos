<template>
	<div class="home2">
        <h1>count1: {{ count1 }}<span @click="add">加</span>count11: {{ count11 }}</h1>
        <h1>count2: {{ count2 }}<span @click="del">减</span>count22: {{ count22 }}</h1>
        <ul>
            <li v-for="(item, index) in countList" :key="index" @click="changeItem(index)">{{ item }}</li>
        </ul>
        <div @click="changeName">name: {{ countObj.name }}, age: {{ countObj.age }}</div>
        <router-link to='/home1'>跳转到home1</router-link>
        <router-link to='/home3?name=fremember'>跳转到home3</router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, computed, watch } from 'vue'
	export default {
		setup () {
            let count1 = ref(2),
                count11 = ref(computed(() => count1.value * 2)),
                count2 = ref(3),
                count22 = ref(computed(() => count2.value * 3)),
                countList = ref(['qw', 'er', 'as', 'df']),
                countObj = ref({ name: 'pxy', age: '29' }),
                add = () => count1.value++,
                del = () => count2.value--,
                changeItem = (index) => {
                    // console.log(countList.value[index])
                    countList.value[index] = `${countList.value[index] + index}`
                },
                changeName = () => {
                    // console.log(countObj.value)
                    countObj.value.name = 'fremember'
                };
            watch(
                [() => count1.value, () => count2.value, () => countObj.value.name],
                ([a, b, c], [prevA, prevB, prevC]) => {
                    // a, b表示count1, count2新值；prevA, prevB表示count1, count2旧值
                    console.log('a--->' + a)
                    console.log('b--->' + b)
                    console.log('c--->' + c)
                    console.log('prevA--->' + prevA)
                    console.log('prevB--->' + prevB)
                    console.log('prevC--->' + prevC)
                    count11 = count1.value * 2
                    count22 = count2.value * 3
                    if(c !== prevC) {
                        countObj.value.age = 24
                    }
                }
            )
			return {
                count1,
                count11,
                count2,
                count22,
                countList,
                countObj,
                add,
                del,
                changeItem,
                changeName
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.home2 {
        h1 {
            display: flex;
            align-items: center;
            span {
                margin: 0 20px;
                width: 40px;
                height: 20px;
                text-align: center;
                line-height: 20px;
            }
        }
    }
</style>