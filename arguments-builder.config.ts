import { defineConfig } from "@iringo/arguments-builder";
export default defineConfig({
	output: {
		surge: {
			path: "./dist/iRingo.LocationService.sgmodule",
			transformEgern: {
				enable: true,
				path: "./dist/iRingo.LocationService.yaml",
			},
		},
		loon: {
			path: "./dist/iRingo.LocationService.plugin",
		},
		customItems: [
			{
				path: "./dist/iRingo.LocationService.snippet",
				template: "./template/quantumultx.handlebars",
			},
			{
				path: "./dist/iRingo.LocationService.stoverride",
				template: "./template/stash.handlebars",
			},
		],
		dts: { isExported: true, path: "./src/types.d.ts" },
		boxjsSettings: {
			path: "./template/boxjs.settings.json",
			scope: "@iRingo.Maps.Settings",
		},
	},
	args: [
		{
			defaultValue: "US",
			description: "要更改为的地区或国家，此选项影响GPS/Wi-Fi/有线网络下国家和地区检测的结果。",
			key: "GeoCountryCode",
			name: "[地区检测] 地理国家或地区代码",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（跟随地区检测结果）" },
				{ key: "CN", label: "🇨🇳中国大陆" },
				{ key: "HK", label: "🇭🇰中国香港" },
				{ key: "TW", label: "🇹🇼中国台湾" },
				{ key: "SG", label: "🇸🇬新加坡" },
				{ key: "US", label: "🇺🇸美国" },
				{ key: "JP", label: "🇯🇵日本" },
				{ key: "AU", label: "🇦🇺澳大利亚" },
				{ key: "GB", label: "🇬🇧英国" },
				{ key: "KR", label: "🇰🇷韩国" },
				{ key: "CA", label: "🇨🇦加拿大" },
				{ key: "IE", label: "🇮🇪爱尔兰" },
			],
			type: "string",
		},
		{
			defaultValue: "AutoNavi",
			description:
				"地点数据接口，此选项影响公共指南，兴趣点(POI)与位置信息等功能。",
			key: "UrlInfoSet.Dispatcher",
			name: "[URL信息集] 调度器",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（随[动态配置]版本自动选择）" },
				{
					key: "AutoNavi",
					label:
						"🧭高德（🇨🇳:互动百科/大众点评/携程 | 🇺🇳:维基百科/Yelp/Booking）",
				},
				{ key: "Apple", label: "Apple（维基百科/Yelp/Booking）" },
			],
			type: "string",
		},
		{
			defaultValue: "AutoNavi",
			description: "导航与ETA服务接口，此选项影响导航与ETA(到达时间)等功能。",
			key: "UrlInfoSet.Directions",
			name: "[URL信息集] 导航与ETA",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（随[动态配置]版本自动选择）" },
				{ key: "AutoNavi", label: "🧭高德（🇨🇳:高德地图 | 🇺🇳:TomTom）" },
				{ key: "Apple", label: "Apple（🇨🇳:🈚️ | 🇺🇳:TomTom）" },
			],
			type: "string",
		},
		{
			defaultValue: "Apple",
			description: "评分和照片服务接口，此选项影响评分和照片服务以及照片使用。",
			key: "UrlInfoSet.RAP",
			name: "[URL信息集] 评分和照片",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（随[动态配置]版本自动选择）" },
				{ key: "AutoNavi", label: "🧭高德（🇨🇳:🈶️但未开放 | 🇺🇳:🈚️）" },
				{ key: "Apple", label: "Apple（🇨🇳:🈚️ | 🇺🇳:🈶️）" },
			],
			type: "string",
		},
		{
			defaultValue: "AUTO",
			description:
				"定位漂移修正服务接口，控制定位漂移和🧭指南针与📍坐标的经纬度。",
			key: "UrlInfoSet.LocationShift",
			name: "[URL信息集] 定位漂移",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（随[动态配置]版本自动选择）" },
				{ key: "AutoNavi", label: "🧭高德（🈚️坐标，使用🇨🇳GCJ-02坐标）" },
				{ key: "Apple", label: "Apple（🈶️坐标，使用🇺🇳WGS-84坐标）" },
			],
			type: "string",
		},
		{
			defaultValue: "HYBRID",
			description: "此选项影响所列位图、影像与模型数据。",
			key: "TileSet.Satellite",
			name: "[瓦片数据集] 卫星图像",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（随[动态配置]版本自动选择）" },
				{ key: "HYBRID", label: "混合（🇨🇳:2D较新 | 🇺🇳:主要城市3D）" },
				{ key: "CN", label: "🇨🇳中国四维（🇨🇳:2D较新 | 🇺🇳:🈚️）" },
				{ key: "XX", label: "🇺🇳DigitalGlobe（🇨🇳:2D较旧 | 🇺🇳:2D+主要城市3D）" },
			],
			type: "string",
		},
		{
			defaultValue: "XX",
			description: "此选项影响飞行俯瞰全球各地的主要地标和城市功能。",
			key: "TileSet.Flyover",
			name: "[瓦片数据集] 飞行俯瞰",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（随[动态配置]版本自动选择）" },
				{ key: "CN", label: "🇨🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈚️）" },
				{ key: "XX", label: "🇺🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈶️）" },
			],
			type: "string",
		},
		{
			defaultValue: "XX",
			description: "此选项影响 360 度全景视角在某些地点四处看看功能。",
			key: "TileSet.Munin",
			name: "[瓦片数据集] 四处看看",
			options: [
				{ key: "AUTO", label: "🇺🇳自动（随[动态配置]版本自动选择）" },
				{ key: "CN", label: "🇨🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈚️）" },
				{ key: "XX", label: "🇺🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈶️）" },
			],
			type: "string",
		},
		{
			key: "LogLevel",
			name: "[调试] 日志等级",
			type: "string",
			defaultValue: "WARN",
			description: "选择脚本日志的输出等级，低于所选等级的日志将全部输出。",
			options: [
				{ key: "OFF", label: "关闭" },
				{ key: "ERROR", label: "❌ 错误" },
				{ key: "WARN", label: "⚠️ 警告" },
				{ key: "INFO", label: "ℹ️ 信息" },
				{ key: "DEBUG", label: "🅱️ 调试" },
				{ key: "ALL", label: "全部" },
			],
		},
	],
});
