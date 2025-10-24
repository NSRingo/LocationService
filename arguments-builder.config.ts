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
			scope: "@iRingo.LocationService.Settings",
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
			defaultValue: true,
			description: "地点数据接口，此选项影响公共指南，兴趣点(POI)与位置信息等功能。(注：使用国际版调度器时，不会进行数据融合）",
			key: "Dispatcher.Hybrid",
			name: "[调度器] 融合数据",
			type: "boolean",
		},
		/*
		{
			defaultValue: true,
			description: "导航与ETA服务接口，此选项影响导航与ETA(到达时间)等功能。",
			key: "Directions.Hybrid",
			name: "[导航与ETA] 融合数据",
			type: "boolean",
		},
		*/
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
