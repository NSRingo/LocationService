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
	const { Settings, Caches, Configs } = setENV("iRingo", "Location", database);
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
					switch (url.hostname) {
						case "dispatcher.is.autonavi.com":
							switch (url.pathname) {
								case "/dispatcher": {
									switch ($app) {
										case "Loon":
											break;
										case "Surge":
										case "Egern": {
											const AppleDispatcher = await LocationService.Dispatcher($request, Caches);
											break;
										}
										default:
											break;
									}
									/******************  initialization start  *******************/
									// 先拆分aRPC校验头和protobuf数据体
									const arpc = aRPC.request.unpack(rawBody);
									Console.debug(`arpc.metadata: ${JSON.stringify(arpc.metadata, null, 2)}`);
									Console.debug(`arpc.unknown: ${JSON.stringify(arpc.unknown, null, 2)}`);
									//Console.debug(`arpc.message: ${JSON.stringify(body, null, 2)}`);
									/******************  initialization finish  *******************/
									body = GEOPDPlaceRequest.decode(arpc.message);
									switch (body.requestType) {
										case "REQUEST_TYPE_REVERSE_GEOCODING":
											//body.placeRequestParameters.reverseGeocodingParameters.preserveOriginalLocation = false;
											if (!body.requestedComponent.some(requestedComponent => requestedComponent.type === "PLACE_QUESTIONNAIRE")) {
												body.requestedComponent.push({ type: "PLACE_QUESTIONNAIRE", count: 1 }); // 73 - PLACE_QUESTIONNAIRE
											}
											/*
											if (!body.requestedComponent.some(requestedComponent => requestedComponent.type === "LABEL_GEOMETRY")) {
												body.requestedComponent.push({ type: "LABEL_GEOMETRY", count: 1 }); // 87 - LABEL_GEOMETRY
											}
											*/
											switch (body.analyticMetadata.appIdentifier) {
												case "symptomsd-helper": //?
												case "com.apple.news":
												case "com.apple.networkserviceproxy":
												case "com.apple.CoreRoutine.helperservice": //?
													body.placeRequestParameters.reverseGeocodingParameters.extendedLocation = body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.map(location => {
														location.latLng.lat = 40.748441;
														location.latLng.lng = -73.985664;
														return location;
													});
													break;
												case "com.apple.Maps":
												case "com.apple.NanoMaps":
												default:
													body.placeRequestParameters.reverseGeocodingParameters.extendedLocation = body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.map(location => {
														if (location.timestamp) {
															location.latLng.lat = 40.748441;
															location.latLng.lng = -73.985664;
														}
														return location;
													});
													break;
												case "com.apple.weather":
												case "com.apple.weatherd":
												case "com.apple.nanoweatherd":
												case "com.apple.weather.widget":
												case "com.apple.photoanalysisd":
												case "com.apple.MapsSuggestions":
													break;
											}
											break;
										case "REQUEST_TYPE_MAPS_HOME":
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
							Console.debug(`x-apple-maps-app-identifier: ${$request.headers["x-apple-maps-app-identifier"]}`);
							// 重定向
							switch (Settings.Redirect.Dispatcher) {
								case "AUTO":
								default:
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
