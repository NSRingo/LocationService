import { $app, Console, done, Lodash as _, Storage } from "@nsnanocat/util";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import aRPC from "./aRPC/aRPC.mjs";
import GEOPDPlaceResponse from "./class/GEOPDPlaceResponse.mjs";
import LocationService from "./class/LocationService.mjs";
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
Console.info(`FORMAT: ${FORMAT}`);
!(async () => {
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("iRingo", "Location", database);
	Console.logLevel = Settings.LogLevel;
	// 创建空数据
	let body = {};
	// 格式判断
	switch (FORMAT) {
		case undefined: // 视为无body
			break;
		case "application/x-www-form-urlencoded":
		case "text/plain":
		default:
			break;
		case "application/x-mpegURL":
		case "application/x-mpegurl":
		case "application/vnd.apple.mpegurl":
		case "audio/mpegurl":
			break;
		case "text/xml":
		case "text/html":
		case "text/plist":
		case "application/xml":
		case "application/plist":
		case "application/x-plist":
			// 主机判断
			switch (url.hostname) {
				case "gspe1-ssl.ls.apple.com":
					//body = new DOMParser().parseFromString($response.body, FORMAT);
					// 路径判断
					switch (url.pathname) {
						case "/pep/gcc":
							_.set(Caches, "pep.gcc", $response.body);
							Storage.setItem("@iRingo.Location.Caches", Caches);
							switch (Settings.GeoCountryCode) {
								case "AUTO":
									break;
								default:
									$response.body = Settings.GeoCountryCode;
									break;
							}
							break;
					}
					break;
				case "configuration.ls.apple.com":
					BigInt.prototype.toJSON = function () {
						return this.toString();
					};
					// 路径判断
					switch (url.pathname) {
						case "/config/defaults": {
							break;
						}
					}
					break;
			}
			break;
		case "text/vtt":
		case "application/vtt":
			break;
		case "text/json":
		case "application/json":
			body = JSON.parse($response.body ?? "{}");
			Console.debug(`body: ${JSON.stringify(body)}`);
			$response.body = JSON.stringify(body);
			break;
		case "application/protobuf":
		case "application/x-protobuf":
		case "application/vnd.google.protobuf":
		case "application/grpc":
		case "application/grpc+proto":
		case "application/octet-stream": {
			let rawBody = $app === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : ($response.body ?? new Uint8Array());
			switch (FORMAT) {
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/octet-stream":
					switch (url.hostname) {
						case "dispatcher.is.autonavi.com":
							switch (url.pathname) {
								case "/dispatcher": {
									Console.info(`x-apple-maps-app-identifier: ${$request.headers["x-apple-maps-app-identifier"]}`);
									/******************  initialization start  *******************/
									// 先拆分aRPC校验头和protobuf数据体
									const arpc = aRPC.response.unpack(rawBody);
									Console.debug(`arpc.unknown: ${JSON.stringify(arpc.unknown, null, 2)}`);
									body = GEOPDPlaceResponse.decode(arpc.message);
									//Console.debug(`arpc.message: ${JSON.stringify(body, null, 2)}`);
									/******************  initialization finish  *******************/
									let AppleDispatcher = new Uint8Array();
									switch ($app) {
										case "Loon":
										case "Quantumult X":
										case "Stash":
											AppleDispatcher = await LocationService.Dispatcher($request);
											break;
										case "Surge":
										case "Egern":
											AppleDispatcher = Caches.Dispatcher.get($request.id);
											break;
										default:
											break;
									}
									AppleDispatcher = GEOPDPlaceResponse.decode(AppleDispatcher);
									body = GEOPDPlaceResponse.composite(body, AppleDispatcher, Settings);
									body.displayRegion = Settings.GeoCountryCode === "AUTO" ? Caches.PEP?.GCC : (Settings.GeoCountryCode ?? "US");
									body.datasetAbStatus = AppleDispatcher.datasetAbStatus;
									/******************  initialization start  *******************/
									Console.debug(`arpc.message: ${JSON.stringify(body, null, 2)}`);
									arpc.message = GEOPDPlaceResponse.encode(body);
									Console.debug(`arpc.message base64: ${Buffer.from(arpc.message).toString("base64")}`);
									rawBody = aRPC.pack(arpc);
									/******************  initialization finish  *******************/
									break;
								}
							}
							break;
						case "gsp-ssl.ls.apple.com":
							switch (url.pathname) {
								case "/dispatcher.arpc": {
									break;
								}
							}
							break;
						case "gspe35-ssl.ls.apple.com":
							switch (url.pathname) {
								case "/config/announcements":
									break;
								case "/geo_manifest/dynamic/config":
									break;
							}
							break;
					}
					break;
				case "application/grpc":
				case "application/grpc+proto":
					break;
			}
			// 写入二进制数据
			$response.body = rawBody;
			break;
		}
	}
})()
	.catch(e => Console.error(e))
	.finally(() => done($response));
