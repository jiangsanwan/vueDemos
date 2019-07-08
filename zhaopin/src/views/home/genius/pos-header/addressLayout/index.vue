<template>
	<div class="address-layout" @click.stop="selectRegionSubway()">
		<div class="container">
			<div class="province" ref="provinceList">
				<ul>
					<li :class="{active: !activeProvince}" @click.stop="changeActiveProvince('')">常用&热门</li>
					<li :class="{active: activeProvince == province.name}" v-for="(province, index) in addressList" :key="index" @click.stop="changeActiveProvince(province.name)">{{ province.name }}</li>
				</ul>
			</div>
			<div class="citys" ref="regionSubway">
				<ul class="citys-wrapper">
					<li v-for="(province, index) in addressList" :key="index" v-if="activeProvince == province.name">
						<div v-if="(activeProvince == '北京' || activeProvince == '上海' || activeProvince == '天津') && activeProvince == province.name">
							<ul class="has-region-subway">
								<li :class="{active: hasRegionSubway == 0}" @click.stop="changeHasRegionSubway(0)">区</li>
								<li :class="{active: hasRegionSubway == 1}" @click.stop="changeHasRegionSubway(1)">地铁</li>
							</ul>
							<ul class="region-subway-cont" v-if="hasRegionSubway == 0">
								<li :class="{mb05rem: index < province.cityList.region.length - 2, active: region == selectedRegionSubway}" v-for="(region, index) in province.cityList.region" :key="index" @click.stop="selectRegionSubway(region)">{{ region }}</li>
							</ul>
							<ul class="region-subway-cont" v-if="hasRegionSubway == 1">
								<li :class="{mb05rem: index < province.cityList.subwayLine.length - 2, active: subway == selectedRegionSubway}" v-for="(subway, index) in province.cityList.subwayLine" :key="index" @click.stop="selectRegionSubway(subway)">{{ subway }}</li>
							</ul>
						</div>
						<div v-else>
							<ul class="region-subway-cont">
								<li :class="{mb05rem: index < province.cityList.length - 2, active: region == selectedRegionSubway}" v-for="(region, index) in province.cityList" :key="index" @click.stop="selectRegionSubway(region)">{{ region }}</li>
							</ul>
						</div>
					</li>
					<li v-if="!activeProvince">
						<div class="common-hot">
							<div class="title">常用城市</div>
							<ul class="region-subway-cont">
								<li :class="{mb05rem: index < hotCitys.length - 2, active: item.city == selectedRegionSubway}" v-for="(item, index) in commonlyUsedCity" :key="index" @click.stop="selectRegionSubway(item.city, item.province)">{{ item.city }}</li>
							</ul>
						</div>
						<div class="common-hot">
							<div class="title">热门城市</div>
							<ul class="region-subway-cont">
								<li :class="{mb05rem: index < hotCitys.length - 2, active: item.city == selectedRegionSubway}" v-for="(item, index) in hotCitys" :key="index" @click.stop="selectRegionSubway(item.city, item.province)">{{ item.city }}</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	export default {
		data () {
			return {
				activeProvince: '',// 当前高亮的是哪个省
				hasRegionSubway: 0,// 显示的是市、区，还是地铁线
				selectedRegionSubway: '',// 选择的是哪个市或区
				addressList: [
					{
						name: '安徽',
						cityList: ['安庆', '蚌埠', '亳州', '滁州', '池州', '阜阳', '合肥', '淮南', '淮北', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城']
					},
					{
						name: '北京',
						cityList: {
							region: ['北京', '朝阳区', '海淀区', '东城区', '丰台区', '大兴区', '昌平区', '西城区', '通州区', '顺义区', '石景山区', '房山区', '密云区', '门头沟区', '怀柔区', '平谷区', '延庆区'],
							subwayLine: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线', '13号线', '14号线', '15号线', '16号线', '八通线', '昌平线', '房山线', '机场线', '亦庄线', 'S1线', '西郊线', '燕房线']
						}
					},
					{
						name: '重庆',
						cityList: ['重庆']
					},
					{
						name: '福建',
						cityList: ['福州', '龙岩', '宁德', '南平', '莆田', '泉州', '三明', '厦门', '漳州']
					},
					{
						name: '甘肃',
						cityList: ['白银', '定西', '甘南', '金昌', '酒泉', '嘉峪关', '兰州', '陇南', '临夏', '平凉', '庆阳', '天水', '武威', '张掖']
					},
					{
						name: '贵州',
						cityList: ['安顺', '毕节', '贵阳', '六盘水', '黔东南', '黔南', '黔西南', '铜仁', '遵义']
					},
					{
						name: '广东',
						cityList: ['潮州', '东莞', '东沙群岛', '佛山', '广州', '惠州', '河源', '江门', '揭阳', '梅州', '茂名', '清远', '韶关', '汕头', '深圳', '汕尾', '云浮', '阳江', '珠海', '肇庆', '湛江', '中山']
					},
					{
						name: '广西',
						cityList: ['百色', '北海', '崇左', '防城港', '桂林', '贵港', '贺州', '河池', '柳州', '来宾', '南宁', '钦州', '梧州', '玉林']
					},
					{
						name: '黑龙江',
						cityList: ['大庆', '大兴安岭', '哈尔滨', '黑河', '鹤岗', '佳木斯', '鸡西', '牡丹江', '齐齐哈尔', '七台河', '绥化', '双鸭山', '伊春']
					},
					{
						name: '河北',
						cityList: ['保定', '承德', '沧州', '衡水', '邯郸', '廊坊', '秦皇岛', '石家庄', '唐山', '邢台', '张家口']
					},
					{
						name: '河南',
						cityList: ['安阳', '鹤壁', '焦作', '济源', '开封', '洛阳', '漯河', '南阳', '平顶山', '濮阳', '商丘', '三门峡', '新乡', '许昌', '信阳', '郑州', '周口', '驻马店']
					},
					{
						name: '河北',
						cityList: ['鄂州', '恩施', '黄冈', '黄石', '荆州', '荆门', '潜江', '十堰', '随州', '神农架', '天门', '武汉', '襄阳', '孝感', '咸宁', '仙桃', '宜昌']
					},
					{
						name: '湖南',
						cityList: ['长沙', '郴州', '常德', '衡阳', '怀化', '娄底', '邵阳', '湘潭', '湘西', '益阳', '岳阳', '永州', '株洲', '张家界']
					},
					{
						name: '海南',
						cityList: ['白沙', '保亭', '澄迈', '昌江', '儋州', '东方', '定安', '海口', '临高', '乐东', '陵水', '琼海', '琼中', '三亚', '三沙', '屯昌', '五指山', '文昌', '万宁']
					},
					{
						name: '吉林',
						cityList: ['白城', '白山', '长春', '吉林', '辽源', '四平', '松原', '通化', '延边']
					},
					{
						name: '江苏',
						cityList: ['常州', '淮安', '连云港', '南京', '南通', '苏州', '宿迁', '泰州', '无锡', '徐州', '扬州', '盐城', '镇江', '孝感']
					},
					{
						name: '江西',
						cityList: ['抚州', '赣州', '九江', '吉安', '景德镇', '南昌', '萍乡', '上饶', '新余', '宜春', '鹰潭']
					},
					{
						name: '辽宁',
						cityList: ['鞍山', '本溪', '朝阳', '大连', '丹东', '抚顺', '阜新', '葫芦岛', '锦州', '辽阳', '盘锦', '沈阳', '铁岭', '营口']
					},
					{
						name: '内蒙古',
						cityList: ['阿拉善', '包头', '巴彦淖尔', '赤峰', '鄂尔多斯', '呼和浩特', '呼伦贝尔', '通辽', '乌海', '乌兰察布', '锡林郭勒', '兴安盟']
					},
					{
						name: '宁夏',
						cityList: ['固原', '石嘴山', '吴忠', '银川', '中卫']
					},
					{
						name: '青海',
						cityList: ['果洛', '海东', '海北', '黄南', '海南', '海西', '西宁', '玉树']
					},
					{
						name: '上海',
						cityList: {
							region: ['上海', '浦东新区', '徐汇区', '闵行区', '静安区', '长宁区', '普陀区', '黄浦区', '杨浦区', '虹口区', '宝山区', '嘉定区', '松江区', '青浦区', '奉贤区', '金山区', '崇明区', '崇明县'],
							subwayLine: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线', '11号线', '12号线', '13号线', '16号线', '磁悬浮', '17号线', '浦江县']
						}
					},
					{
						name: '山西',
						cityList: ['长治', '大同', '晋中', '晋城', '临汾', '吕梁', '朔州', '太原', '忻州', '阳泉', '运城']
					},
					{
						name: '陕西',
						cityList: ['安康', '宝鸡', '汉中', '商洛', '铜川', '渭南', '西安', '咸阳', '延安', '榆林']
					},
					{
						name: '山东',
						cityList: ['滨州', '德州', '东营', '菏泽', '济南', '济宁', '临沂', '莱芜', '聊城', '青岛', '日照', '泰安', '潍坊', '威海', '烟台', '淄博', '枣庄']
					},
					{
						name: '四川',
						cityList: ['巴中', '成都', '达州', '德阳', '阿坝', '广安', '广元', '甘孜', '泸州', '乐山', '凉山', '锦阳', '眉山', '南充', '内江', '攀枝花', '遂宁', '宜宾', '雅安', '自贡', '资阳']
					},
					{
						name: '天津',
						cityList: {
								region: ['天津', '南开区', '和平区', '河西区', '西青区', '滨海新区', '河东区', '东丽区', '河北区', '红桥区', '津南区', '北辰区', '武清区', '静海区', '宝坻区', '宁河区', '蓟州区', '蓟县'],
								subwayLine: ['1号线', '2号线', '3号线', '6号线', '9号线']
						}
					},
					{
						name: '新疆',
						cityList: ['阿克苏', '阿勒泰', '阿拉尔', '巴音郭楞', '博尔塔拉', '北屯市', '昌吉', '哈密', '和田', '克拉玛依', '克孜勒苏柯尔克孜', '喀什', '可克达拉市', '昆玉市', '石河子', '双河市', '吐鲁番', '塔城', '图木舒克', '铁门关', '乌鲁木齐', '五家渠', '伊犁']
					},
					{
						name: '西藏',
						cityList: ['阿里', '昌都', '拉萨', '林芝', '那曲', '日喀则', '山南']
					},
					{
						name: '云南',
						cityList: ['保山', '楚雄', '德宏', '迪庆', '大理', '红河', '昆明', '临沧', '丽江', '怒江', '普洱', '曲靖', '文山', '西双版纳', '玉溪', '邵通']
					},
					{
						name: '浙江',
						cityList: ['杭州', '湖州', '嘉兴', '金华', '丽水', '宁波', '衢州', '绍兴', '台州', '温州', '舟山']
					},
					{
						name: '香港',
						cityList: ['香港']
					},
					{
						name: '澳门',
						cityList: ['澳门']
					},
					{
						name: '台湾',
						cityList: ['台湾']
					}
				],
				hotCitys: [
					{province: '全国', city: '全国'},
					{province: '北京', city: '北京'},
					{province: '上海', city: '上海'},
					{province: '浙江', city: '杭州'},
					{province: '广东', city: '深圳'},
					{province: '广东', city: '广州'},
					{province: '四川', city: '成都'},
					{province: '江苏', city: '南京'},
					{province: '湖北', city: '武汉'},
					{province: '天津', city: '天津'},
					{province: '陕西', city: '西安'},
					{province: '江苏', city: '苏州'},
				],
				commonlyUsedCity: [],
				provinceScroll: null,
				regionSubwayScroll: null
			}
		},
		computed: {
			store () {
				return this.$store.state;
			}
		},
		mounted () {
			let tempData = this.store.positionConditionSelected.selectedRegionSubway.split(',');
			this.commonlyUsedCity = this.store.positionConditionSelected.commonlyUsedCity;
			if(tempData[0] !== '') {
				this.activeProvince = tempData[0];
				this.selectedRegionSubway = tempData[1];
				if(tempData[1].indexOf('号线') > 0) {
					this.hasRegionSubway = 1;
				} else {
					this.hasRegionSubway = 0;
				}
			} else {
				this.activeProvince = '';
			}
			this.$nextTick(() => {
				this._initScroll();
			});
		},
		methods: {
			// 初始化滑动
			_initScroll () {
				if(!this.provinceScroll) {
					this.provinceScroll = new BScroll(this.$refs.provinceList, {
						click: true
					})
				} else {
					this.provinceScroll.refresh();
				}
				if(!this.regionSubwayScroll) {
					this.regionSubwayScroll = new BScroll(this.$refs.regionSubway, {
						click: true
					})
				} else {
					this.regionSubwayScrollrefresh();
				}
			},
			// 选择省份
			changeActiveProvince (name) {
				this.activeProvince = name;
			},
			// 切换显示市、地铁线
			changeHasRegionSubway (index) {
				this.hasRegionSubway = index;
			},
			// 修改常用城市
			changeCommonCity (other, data, tempData) {
				this.store.positionConditionSelected.selectedRegionSubway = other + ',' + data;
				tempData.province = other;
				let onlyone = this.store.positionConditionSelected.commonlyUsedCity.some(v => {
					return v.city == tempData.city;
				});
				if(!onlyone) {
					this.store.positionConditionSelected.commonlyUsedCity.unshift(tempData);
					this.store.positionConditionSelected.commonlyUsedCity.length = 3;
				}
			},
			// 选择市或者地铁线
			selectRegionSubway (data, other) {
				let tempData = {};
				tempData.city = data;
				if(data) {
					this.selectedRegionSubway = data;
					if(other) {
						this.changeCommonCity(other, data, tempData);
					} else {
						this.changeCommonCity(this.activeProvince, data, tempData);
					}
					this.$emit('selectedRegionSubway', data);
				} else {
					this.$emit('selectedRegionSubway', -1);
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.address-layout {
		position: fixed;
		top: 4.05rem;
		bottom: 0;
		z-index: 1060;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		.container {
			display: flex;
			background: #fff;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 5rem;
			left: 0;
			overflow: hidden;
			.province {
				width: 4rem;
				font-size: 0.6rem;
				text-align: center;
				ul {
					li {
						line-height: 1.2rem;
						&.active {
							background: #fafafa;
						}
					}
				}
			}
			.citys {
				flex: 1;
				background: #fafafa;
				.citys-wrapper {
					padding: 1.5rem 1rem;
					.has-region-subway {
						margin-bottom: 0.5rem;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						flex-wrap: wrap;
						li {
							width: 4rem;
							line-height: 1.2rem;
							text-align: center;
							font-size: 0.6rem;
							border: 1px solid #d6d6d6;
							border-radius: 0.2rem;
							&.active {
								color: #fff;
								background: #34e8d6;
							}
							&:nth-child(even) {
								margin-left: 0.5rem;
							}
						}
					}
					.region-subway-cont {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						flex-wrap: wrap;
						li {
							width: 4rem;
							line-height: 1.2rem;
							text-align: center;
							font-size: 0.6rem;
							border: 1px solid #d6d6d6;
							border-radius: 0.2rem;
							&.active {
								color: #fff;
								background: #34e8d6;
							}
							&:nth-child(even) {
								margin-left: 0.5rem;
							}
							&.mb05rem {
								margin-bottom: 0.5rem;
							}
						}
					}
					.common-hot {
						margin-bottom: 0.8rem;
						.title {
							margin-bottom: 0.5rem;
							font-size: 0.6rem;
							font-weight: 600;
							color: #5a5a5a;
						}
					}
				}
			}
		}
	}
</style>