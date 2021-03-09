$(function () {
	let data = [],
		selectData = [],
		selectItem = ['青海', '云南'];
	$.getJSON('./js/map/china.json', function (res) {
		data = res
		selectData = JSON.parse(JSON.stringify(res))
		for (let i = 0; i < selectData.length; i++) {
			for (let j = 0; j < selectItem.length; j++) {
				if (selectItem[j] == selectData[i].name) {
					selectData[i].color = "#278864"
				}
			}
		}
		initMap()
	})
	function initMap() {
		var option = {
			tooltip: {
				formatter(params) {
					var info = '<p style="font-size:12px; background:">' + params.name + '</p><p style="font-size:12px">这里可以写一些</p>'
					return info;
				},
				backgroundColor: "rgba(32,45,48,.7)",//提示标签背景颜色
				textStyle: { color: "#fff" } //提示标签字体颜色
			},
			series: [
				{
					type: 'map',
					mapType: 'china',
					aspectScale: 0.75,
					top: "10%", //组件距离容器的距离
					label: {
						normal: {
							show: true,//显示省份标签
							textStyle: {
								color: "#fff",
								fontSize: 10,
							}//省份标签字体颜色
						},
						emphasis: {
							show: true,//对应的鼠标悬浮效果
							textStyle: { color: "#fff" }
						}
					},
					itemStyle: {
						normal: {
							borderWidth: .5,//区域边框宽度
							borderColor: '#057746',//区域边框颜色
							areaColor: "#2C2E38",//区域颜色
							// color: "red",
						},
						emphasis: {
							borderWidth: .5,
							// borderColor: '#4b0082',
							areaColor: "#07B98C",
							// textStyle: { color: "#fff" }
						}
					},
					showLegendSymbol: false,
					data: data,
				}
			],
			dataRange: {
				x: '-1000 px', //图例横轴位置
				y: '-1000 px', //图例纵轴位置
				splitList: selectData
			}
		}
		//初始化echarts实例
		var myChart = echarts.init(document.getElementById('container'));
		//使用制定的配置项和数据显示图表
		myChart.setOption(option);
	}


})