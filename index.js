$(function () {
	let name = '海南',
		pinyin= 'hainan',
		data=[],
		selectItem = ["东方市"],
		selectData = [];
	var myChart = echarts.init(document.getElementById("container"));
	loadBdScript(`./js/map/js/${pinyin}.js`,() => {
		initData()
		// 
	})
	//获取JSON文件
	function initData() {
		$.getJSON(`./js/map/json/${pinyin}.json`, function (res) {
			let d = res.features
			for (let i = 0; i < d.length; i++) {
				for (let j = 0; j < selectItem.length; j++) {
					if (selectItem[j] == d[i].properties.name) {
						selectData.push({name: d[i].properties.name, start:i+1, end:i+1, label: d[i].properties.name, color: "#278864"})
					}else {
						selectData.push({name: d[i].properties.name, start:i+1, end:i+1, label: d[i].properties.name, color: "#2C2E38"})
					}
				}
				data.push({name: d[i].properties.name, value:i+1})
			}
			loadMap(name);
			console.log(selectData);
			console.log(data);
		})
	}

	// 加载地图
	function loadMap(name) {
		var option = {
			tooltip: {
				formatter(params) {
					var info = '<p style="font-size:12px; background:">' + params.name + '</p><p style="font-size:12px">这里可以写一些</p>'
					return info;
				},
				backgroundColor: "rgba(32,45,48,.7)",//提示标签背景颜色
				textStyle: { color: "#fff" } //提示标签字体颜色
			},
			geo:{},
			series: [
				{
					type: 'map',
					mapType: name,
					aspectScale: 1,
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
		};
		if (pinyin === 'hainan') { 
			console.log(111);
			option.center = [109.844902, 19.0392];//中心位置
			option.layoutCenter = ['50%', '40%'];//地图相对容器偏移
			option.layoutSize = "480%";//地图放大比例
		 }
		// 清理画布
		myChart.clear();
		myChart.setOption(option);
		myChart.off("click");
	}


	// 加载对应的JS
	function loadBdScript(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		if (script.readyState) {
			//IE
			script.onreadystatechange = function () {
				if (
					script.readyState === "loaded" ||
					script.readyState === "complete"
				) {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			// Others
			script.onload = function () {
				callback();
			};
		}
		script.src = url;
		// script.id = scriptId;
		document.getElementsByTagName("head")[0].appendChild(script);
	}


})