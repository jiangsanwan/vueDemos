<template>
    <ul class="flex ai-c verification-code">
        <li class="flex_1 mr20px">
            <a-input v-model:value="curValue" @input="$emit('callback', $event.target.value)" placeholder="请输入图形验证码" />
        </li>
        <li>
            <div v-html="ajaxResult" @click="getVerificationCode"></div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    import { ref, onMounted } from 'vue'
    import { getImgVerify } from '@/api/user'
	export default {
        name: 'VerificationCode',
        props: ['value'],
		setup (props) {
            let ajaxResult = ref(null),
                getValue = (value) => {
                    return ref(value)
                },
                curValue = getValue(props.value),
                getImgVerifyEvent = (() => {
                    getImgVerify({
                        size: 4,  //验证码长度
                        width: 121,
                        height: 40,
                        background: "#f4f3f2",//干扰线条数
                        noise: 2,
                        fontSize: 36,
                        ignoreChars: '0o1i',   //验证码字符中排除'0o1i'
                        color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
                    })
                    .then(d => {
                        ajaxResult.value = d.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }),
                getVerificationCode = () => {
                    getImgVerifyEvent()
                };
            onMounted(() => {
                getImgVerifyEvent()
            })
			return {
                curValue,
                ajaxResult,
                getVerificationCode
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../assets/stylus/reset'
	.verification-code {
        li {
            height(40px)
            &.mr20px {
                margin-right(20px)
            }
        }
    }
</style>