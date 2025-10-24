import { $app, Console, done, Lodash as _ } from "@nsnanocat/util";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import aRPC from "./aRPC/aRPC.mjs";
import GEOPDPlaceRequest from "./class/GEOPDPlaceRequest.mjs";
import LocationService from "./class/LocationService.mjs";
// 构造回复数据
// biome-ignore lint/style/useConst: <explanation>
let $response = undefined;
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
Console.info(`FORMAT: ${FORMAT}`);
!(async () => {
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("iRingo", "LocationService", database);
	Console.logLevel = Settings.LogLevel;
	// 创建空数据
	let body = {};
	// 方法判断
	switch ($request.method) {
		case "POST":
		case "PUT":
		case "PATCH":
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "DELETE":
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
					//body = M3U8.parse($request.body);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					//$request.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($request.body);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					//$request.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($request.body);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					//$request.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					//body = JSON.parse($request.body ?? "{}");
					//Console.debug(`body: ${JSON.stringify(body)}`);
					//$request.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream": {
					//Console.debug(`$request: ${JSON.stringify($request, null, 2)}`);
					let rawBody = $app === "Quantumult X" ? new Uint8Array($request.bodyBytes ?? []) : ($request.body ?? new Uint8Array());
					//Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody, null, 2)}`);
					// 主机判断
					switch (url.hostname) {
						case "dispatcher.is.autonavi.com":
							switch (url.pathname) {
								// 路径判断
								case "/dispatcher": {
									if (Settings.Dispatcher.Hybrid) {
										switch ($app) {
											case "Loon":
											case "Quantumult X":
											case "Stash":
												break;
											case "Surge":
											case "Egern": {
												const AppleDispatcher = await LocationService.Dispatcher($request);
												LocationService.setDispatcherCache($request, AppleDispatcher, Caches);
												break;
											}
											default:
												break;
										}
									}
									/******************  initialization start  *******************/
									// 先拆分aRPC校验头和protobuf数据体
									const arpc = aRPC.request.unpack(rawBody);
									Console.debug(`arpc.metadata: ${JSON.stringify(arpc.metadata, null, 2)}`);
									Console.debug(`arpc.unknown: ${JSON.stringify(arpc.unknown, null, 2)}`);
									//Console.debug(`arpc.message: ${JSON.stringify(body, null, 2)}`);
									/******************  initialization finish  *******************/
									body = GEOPDPlaceRequest.decode(arpc.message);
									switch (body.analyticMetadata.appIdentifier) {
										case "com.apple.Maps": // 地图
										case "com.apple.NanoMaps": // 地图 (watchOS)
											if (!body.requestedComponent.some(requestedComponent => requestedComponent.type === "PLACE_QUESTIONNAIRE")) {
												body.requestedComponent.push({ type: "PLACE_QUESTIONNAIRE", count: 1 }); // 73 - PLACE_QUESTIONNAIRE
											}
											/*
											body.placeRequestParameters.reverseGeocodingParameters.extendedLocation = body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.map(location => {
												if (location.timestamp) {
													location.latLng.lat = 40.748441;
													location.latLng.lng = -73.985664;
												}
												return location;
											});
											*/
											break;
										case "analyticsd": // 分析
										case "symptomsd-helper": // ?
										case "com.apple.news": // 新闻
										case "com.apple.networkserviceproxy": // ?
										case "com.apple.CoreRoutine.helperservice":
										default: {
											/*
											const deviceExtendedLocation = body.clientMetadata?.deviceExtendedLocation;
											if (deviceExtendedLocation) {
												deviceExtendedLocation.latLng.lat = 40.74844360059685;
												deviceExtendedLocation.latLng.lng = -73.98565673245767;
												if (deviceExtendedLocation.type) deviceExtendedLocation.type = "GPS";
											}
											switch (body.requestType) {
												case "REVERSE_GEOCODING":
													body.placeRequestParameters.reverseGeocodingParameters.extendedLocation = body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.map(location => {
														location.latLng.lat = 40.74844360059685;
														location.latLng.lng = -73.98565673245767;
														if (location.type) location.type = "GPS";
														return location;
													});
													break;
												case "MAPS_HOME":
													break;
											}
											*/
											break;
										}
										case "com.apple.Home": // 家庭
										case "com.apple.findmy": // 查找
										case "com.apple.peopled": // 人物 (macOS)
										case "com.apple.MobileSMS": // 短信
										case "com.apple.weather": // 天气
										case "com.apple.weatherd": // 天气 (macOS)
										case "com.apple.nanoweatherd": // 天气 (watchOS)
										case "com.apple.weather.widget": // 天气（小组件）
										case "com.apple.weather.WeatherIntents": // 天气 (Siri)
										case "com.apple.photoanalysisd": // 照片分析 (macOS)
										case "com.apple.MapsSuggestions": // 地图建议
											break;
									}
									//body.displayRegion = Settings.GeoCountryCode === "AUTO" ? Caches.PEP?.GCC : (Settings.GeoCountryCode ?? "US");
									body.clientMetadata.deviceCountryCode = Settings.GeoCountryCode === "AUTO" ? Caches.PEP?.GCC : (Settings.GeoCountryCode ?? "US");
									/******************  initialization start  *******************/
									Console.debug(`arpc.message: ${JSON.stringify(body, null, 2)}`);
									arpc.message = GEOPDPlaceRequest.encode(body);
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
									/******************  initialization start  *******************/
									// 先拆分aRPC校验头和protobuf数据体
									const arpc = aRPC.request.unpack(rawBody);
									Console.debug(`arpc.metadata: ${JSON.stringify(arpc.metadata, null, 2)}`);
									Console.debug(`arpc.unknown: ${JSON.stringify(arpc.unknown, null, 2)}`);
									/******************  initialization finish  *******************/
									body = GEOPDPlaceRequest.decode(arpc.message);
									Console.debug(`arpc.message: ${JSON.stringify(body, null, 2)}`);
									arpc.message = GEOPDPlaceRequest.encode(body);
									Console.debug(`arpc.message base64: ${Buffer.from(arpc.message).toString("base64")}`);
									/******************  initialization start  *******************/
									rawBody = aRPC.pack(arpc);
									/******************  initialization finish  *******************/
									break;
								}
							}
							break;
					}
					// 写入二进制数据
					$request.body = rawBody;
					break;
				}
			}
		//break; // 不中断，继续处理URL
		case "GET":
		case "HEAD":
		case "OPTIONS":
		default:
			delete $request?.headers?.["If-None-Match"];
			delete $request?.headers?.["if-none-match"];
			// 主机判断
			switch (url.hostname) {
				case "configuration.ls.apple.com":
					// 路径判断
					switch (url.pathname) {
						case "/config/defaults":
							break;
					}
					break;
				case "gsp-ssl.ls.apple.com":
				case "dispatcher.is.autonavi.com":
					switch (url.pathname) {
						case "/dispatcher.arpc":
						case "/dispatcher":
							Console.info(`X-Apple-Maps-App-Identifier: ${$request.headers["x-apple-maps-app-identifier"] ?? $request.headers["X-Apple-Maps-App-Identifier"]}`);
							// 重定向
							switch (Settings.Dispatcher.Redirect) {
								case "AUTO":
									break;
								case "HYBRID":
								default:
									url.hostname = "dispatcher.is.autonavi.com";
									url.pathname = "/dispatcher";
									break;
								case "AutoNavi":
									url.hostname = "dispatcher.is.autonavi.com";
									url.pathname = "/dispatcher";
									break;
								case "Apple":
									url.hostname = "gsp-ssl.ls.apple.com";
									url.pathname = "/dispatcher.arpc";
									break;
							}
							break;
					}
					break;
				case "gspe1-ssl.ls.apple.com":
					switch (url.pathname) {
						case "/pep/gcc":
							/* // 不使用 echo response
							$response = {
								status: 200,
								headers: {
									"Content-Type": "text/html",
									Date: new Date().toUTCString(),
									Connection: "keep-alive",
									"Content-Encoding": "identity",
								},
								body: Settings.GeoCountryCode,
							};
							Console.debug(JSON.stringify($response));
							*/
							break;
					}
					break;
				case "gspe35-ssl.ls.apple.com":
				case "gspe35-ssl.ls.apple.cn":
					switch (url.pathname) {
						case "/config/announcements":
							break;
						case "/geo_manifest/dynamic/config":
							break;
					}
					break;
			}
			break;
		case "CONNECT":
		case "TRACE":
			break;
	}
	$request.url = url.toString();
	Console.debug(`$request.url: ${$request.url}`);
})()
	.catch(e => Console.error(e))
	.finally(() => {
		switch (typeof $response) {
			case "object": // 有构造回复数据，返回构造的回复数据
				//Console.debug("finally", `echo $response: ${JSON.stringify($response, null, 2)}`);
				if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				switch ($app) {
					default:
						done({ response: $response });
						break;
					case "Quantumult X":
						if (!$response.status) $response.status = "HTTP/1.1 200 OK";
						delete $response.headers?.["Content-Length"];
						delete $response.headers?.["content-length"];
						delete $response.headers?.["Transfer-Encoding"];
						done($response);
						break;
				}
				break;
			case "undefined": // 无构造回复数据，发送修改的请求数据
				//Console.debug("finally", `$request: ${JSON.stringify($request, null, 2)}`);
				done($request);
				break;
			default:
				Console.error(`不合法的 $response 类型: ${typeof $response}`);
				break;
		}
	});
