<template>
	<component :is="compName" />
</template>

<script type="text/ecmascript-6">
	import { ref } from 'vue'
	import {
		BulbOutlined,
		HomeOutlined,
		SmileOutlined,
		HighlightOutlined,
		UserOutlined,
		TeamOutlined,
		SolutionOutlined,
		InfoCircleOutlined,
		FrownOutlined,
		ExclamationCircleOutlined,
		UserSwitchOutlined,
		FormOutlined,
		MessageOutlined,
		PlusCircleOutlined,
		EditOutlined,
		ClockCircleOutlined,
		ExceptionOutlined,
		AreaChartOutlined,
		BarChartOutlined,
		PieChartOutlined,
		SendOutlined,
		ProfileOutlined,
		PaperClipOutlined
	} from '@ant-design/icons-vue'
	export default {
		name: 'LayIcon',
		components: {
			BulbOutlined,
			HomeOutlined,
			SmileOutlined,
			HighlightOutlined,
			UserOutlined,
			TeamOutlined,
			SolutionOutlined,
			InfoCircleOutlined,
			FrownOutlined,
			ExclamationCircleOutlined,
			UserSwitchOutlined,
			FormOutlined,
			MessageOutlined,
			PlusCircleOutlined,
			EditOutlined,
			ClockCircleOutlined,
			ExceptionOutlined,
			AreaChartOutlined,
			BarChartOutlined,
			PieChartOutlined,
			SendOutlined,
			ProfileOutlined,
			PaperClipOutlined
		},
		props: {
			componentName: {
				default: '',
				required: true,
				type: String
			}
		},
		setup (props) {
			let getProps = (attr) => {
					return ref(attr)
				},
				compName = getProps(props.componentName)
			return {
				compName
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>