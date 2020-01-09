<template>
	<div class="edit-company">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="cont">
			<mt-field class="mint-cell-wrapper-pos-b" label="公司官网" placeholder="请输入公司官网" v-model="insertObj.officialWebsite" @blur.native.capture="checkInput('officialWebsite', '请输入公司官网')" :state="insertStatus.officialWebsite"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="热招职位" placeholder="请输入热招职位" v-model="insertObj.hotPosition" @blur.native.capture="checkInput('hotPosition', '请输入热招职位')" :state="insertStatus.hotPosition"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="招聘职位个数" placeholder="请输入招聘职位个数" v-model="insertObj.totalPosition" @blur.native.capture="checkInput('totalPosition', '请输入招聘职位个数')" :state="insertStatus.totalPosition"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="办公地址" placeholder="请输入办公地址" type="textarea" rows="4" v-model="insertObj.businessAddress" @blur.native.capture="checkInput('businessAddress', '请输入办公地址')" :state="insertStatus.businessAddress"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="员工福利" placeholder="请输入员工福利" type="textarea" rows="4" v-model="insertObj.employeeWelfare" @blur.native.capture="checkInput('employeeWelfare', '请输入员工福利')" :state="insertStatus.employeeWelfare"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="公司简介" placeholder="请输入公司简介" type="textarea" rows="4" v-model="insertObj.abstract" @blur.native.capture="checkInput('abstract', '请输入公司简介')" :state="insertStatus.abstract"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="图集" placeholder="请输入图集" type="textarea" rows="4" v-model="insertObj.introduceFigure" @blur.native.capture="checkInput('introduceFigure', '请输入图集')" :state="insertStatus.introduceFigure"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="产品介绍" placeholder="请输入产品介绍" type="textarea" rows="4" v-model="insertObj.introduce" @blur.native.capture="checkInput('introduce', '请输入产品介绍')" :state="insertStatus.introduce"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="高管介绍" placeholder="请输入高管介绍" type="textarea" rows="4" v-model="insertObj.executivesintroduce" @blur.native.capture="checkInput('executivesintroduce', '请输入高管介绍')" :state="insertStatus.executivesintroduce"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="工商信息" placeholder="请输入工商信息" type="textarea" rows="4" v-model="insertObj.CompanyFullName" @blur.native.capture="checkInput('CompanyFullName', '请输入工商信息')" :state="insertStatus.CompanyFullName"></mt-field>
			<ul class="flex mt01rem">
				<li class="flex_1">
                    <mt-button size="large" type="default" @click="addEvent(0)">取消</mt-button>
                </li>
				<li class="flex_1 ml03rem">
                    <mt-button size="large" type="primary" @click="addEvent(1)">确认</mt-button>
                </li>
			</ul>
		</div>
	</div>
</template>

<script>
	import MineBtnsHeader from '@/components/mine-btns-header/index'
	import { mapState } from 'vuex'
	export default {
		name: 'EditCompany',
		components: { MineBtnsHeader },
		data () {
			return {
				headerObj: {
					title: '编辑公司详情',
					more: []
				},
				insertObj: {
					officialWebsite: '',
					hotPosition: '',
					totalPosition: '',
					businessAddress: '',
					employeeWelfare: ''
				},
				insertStatus: {
					officialWebsite: '',
					hotPosition: '',
					totalPosition: '',
					businessAddress: '',
					employeeWelfare: ''
				}
			}
		},
		mounted () {
			this.$store.commit('SET_SHOWMINEFOOTER', false)
		},
		methods: {
			checkInput (attr, msg) {
				if(!this.insertObj[attr]) {
					this.$toast({ message: msg, position: 'middle', duration: this.duration })
					this.insertStatus[attr] = 'error'
					return
				} else {
					this.insertStatus[attr] = 'success'
				}
			},
			addEvent (index) {}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../../assets/stylus/reset'
	.edit-company {
		margin-top(40px)
		padding-all(.15rem)
		.cont {
			.mt01rem {
				margin-top(.1rem)
				.ml03rem {
					margin-left(.3rem)
				}
			}
		}
	}
</style>