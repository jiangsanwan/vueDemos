<template>
	<div class="recommend-latest" @click.stop="changeActive(-1)">
		<ul class="list-wrapper">
			<li :class="{active: index == activeIndex}" v-for="(list, index) in lists" :key="index" @click.stop="changeActive(index)">
				<div class="text">{{list}}</div>
				<div class="thin-width" v-if="index < lists.length - 1"></div>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: ['activeRecommendLatest'],
		data () {
			return {
				lists: ['推荐', '最新'],
				activeIndex: this.activeRecommendLatest
			}
		},
		computed: {
			store () {
				return this.$store.state;
			}
		},
		methods: {
			changeActive (index) {
				let code = 0,
					title = '';
				if(index === -1) {
					code = this.activeIndex;
					title = this.lists[this.activeIndex];
				} else {
					this.activeIndex = index;
					code = index;
					title = this.lists[index];
				}
				this.store.positionConditionSelected.recommendLatest = code;
				this.$emit('changeRecommendLatest', title);
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.recommend-latest {
		position: fixed;
		top: 4.05rem;
		bottom: 0;
		z-index: 1060;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		.list-wrapper {
			background: #FFF;
			li{
				font-size: 0.6rem;
				.text {
					padding: 0 1rem;
					line-height: 2rem;
				}
				&.active {
					color: #34e8d6;
				}
			}
		}
	}
</style>