<template>
	<div class="add-position">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="cont">
			<mt-field class="mint-cell-wrapper-pos-b" label="职位名称" placeholder="请输入职位名称" v-model="insertObj.title" @blur.native.capture="checkInput('title', '请输入职位名称')" :state="insertStatus.title"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b no-input" label="招聘类型">
				<mt-switch v-model="insertObj.recommendLatest">{{ insertObj.recommendLatest ? '最新' : '推荐' }}</mt-switch>
			</mt-field>
			<mt-field class="mint-cell-wrapper-pos-b no-input" label="职位类型">
				<mt-switch v-model="insertObj.positionType">{{ insertObj.positionType ? '急聘' : '常规招聘' }}</mt-switch>
			</mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="薪资最小值" placeholder="请输入薪资最小值" v-model="insertObj.salaryMin" @blur.native.capture="checkInput('salaryMin', '请输入薪资最小值')" :state="insertStatus.salaryMin"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="薪资最大值" placeholder="请输入薪资最大值" v-model="insertObj.salaryMax" @blur.native.capture="checkInput('salaryMax', '请输入薪资最大值')" :state="insertStatus.salaryMax"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="工龄最小值" placeholder="请输入工龄最小值" v-model="insertObj.workingYearsMin" @blur.native.capture="checkInput('workingYearsMin', '请输入工龄最小值')" :state="insertStatus.workingYearsMin"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="工龄最大值" placeholder="请输入工龄最大值" v-model="insertObj.workingYearsMax" @blur.native.capture="checkInput('workingYearsMax', '请输入工龄最大值')" :state="insertStatus.workingYearsMax"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="多少薪" placeholder="请输入多少薪" v-model="insertObj.salaryNumber" @blur.native.capture="checkInput('salaryNumber', '请输入多少薪')" :state="insertStatus.salaryNumber"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="学历" placeholder="请输入学历" v-model="insertObj.education" @blur.native.capture="checkInput('education', '请输入学历')" :state="insertStatus.education"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="职位要求" placeholder="请输入职位要求" type="textarea" rows="4" v-model="insertObj.positionDetails" @blur.native.capture="checkInput('positionDetails', '请输入职位要求')" :state="insertStatus.positionDetails"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="任职资格" placeholder="请输入任职资格" type="textarea" rows="4" v-model="insertObj.qualification" @blur.native.capture="checkInput('qualification', '请输入任职资格')" :state="insertStatus.qualification"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="技能要求" placeholder="请输入技能要求" type="textarea" rows="4" v-model="insertObj.skillsRequired" @blur.native.capture="checkInput('skillsRequired', '请输入技能要求')" :state="insertStatus.skillsRequired"></mt-field>
			<mt-field class="mint-cell-wrapper-pos-b" label="加分项" placeholder="请输入加分项" type="textarea" rows="4" v-model="insertObj.bonusPoints" @blur.native.capture="checkInput('bonusPoints', '请输入加分项')" :state="insertStatus.bonusPoints"></mt-field>
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
		name: 'AddPosition',
		components: { MineBtnsHeader },
		computed: {
			...mapState({
				duration: state => state.duration
			}),
			publicObj () {
				return sessionStorage.getItem('loginUserInfo') ? JSON.parse(sessionStorage.getItem('loginUserInfo')) : null
			}
		},
		data () {
			return {
				headerObj: {
					title: '添加职位',
					more: []
				},
				insertObj: {
					title: '',
					recommendLatest: false,
					positionType: false,
					salaryMin: '',
					salaryMax: '',
					workingYearsMin: '',
					workingYearsMax: '',
					salaryNumber: '',
					education: '',
					positionDetails: '',
					qualification: '',
					skillsRequired: '',
					bonusPoints: ''
				},
				insertStatus: {
					title: '',
					salaryMin: '',
					salaryMax: '',
					workingYearsMin: '',
					workingYearsMax: '',
					salaryNumber: '',
					education: '',
					positionDetails: '',
					qualification: '',
					skillsRequired: '',
					bonusPoints: ''
				}
			}
		},
		mounted () {
			this.$store.commit('SET_SHOWMINEFOOTER', false)
			if((this.publicObj != null && this.publicObj.type != 'Boss') || this.publicObj == null) {
				this.$router.push('/login')
				sessionStorage.clear()
			}
			this.publicObj.desc = JSON.parse(this.publicObj.desc)
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
			addEvent (index) {
				let available = true
				for(let attr in this.insertStatus) {
					if(this.insertStatus[attr] == 'error') {
						available = false
					}
				}
				if(available) {
					let data = { ...this.insertObj };
					data.company = this.publicObj.company
					data.publicId = this.publicObj._id
					data.publisherAvatar = this.publicObj.avatar
					data.publisherNickName = this.publicObj.user
					data.publisherPosition = this.publicObj.desc.position
					data.scaleMin = this.publicObj.scaleMin
					data.scaleMax = this.publicObj.scaleMax
					data.companyType = this.publicObj.companyType
					data.logo = this.publicObj.logo
					data.teamIntroduction = this.publicObj.teamIntroduction
					data.detailedAddress = this.publicObj.detailedAddress
					data.briefAddress = this.publicObj.briefAddress
					data.city = this.publicObj.city
					data.finance = this.publicObj.finance
					data.visitorsNumber = 0
					data.active = 0
					data.timeStamp = 0
					data.recommendLatest = data.recommendLatest ? 1 : 0
					data.positionType = data.positionType ? 1 : 0
					data.salaryNumber = data.salaryNumber * 1
					this.$store.dispatch('addPosition', data)
					.then(d => {
						this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
					})
					.catch(err => {
						console.log(err)
					})
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../../assets/stylus/reset'
	.add-position {
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