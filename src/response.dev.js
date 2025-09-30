import { $app, Console, done, fetch, Lodash as _, Storage } from "@nsnanocat/util";
import XML from "./XML/XML.mjs";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import aRPC from "./aRPC/aRPC.mjs";
import GEOPDPlaceResponse from "./class/GEOPDPlaceResponse.mjs";
import { BinaryReader, UnknownFieldHandler } from "@protobuf-ts/runtime";
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
			//Console.debug(`body: ${body}`);
			break;
		case "application/x-mpegURL":
		case "application/x-mpegurl":
		case "application/vnd.apple.mpegurl":
		case "audio/mpegurl":
			//body = M3U8.parse($response.body);
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = M3U8.stringify(body);
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
					//$repsonse.body = new XMLSerializer().serializeToString(body);
					break;
				case "configuration.ls.apple.com":
					//body = await PLISTs("plist2json", $response.body);
					BigInt.prototype.toJSON = function () {
						return this.toString();
					};
					body = XML.parse($response.body);
					Console.debug(`body: ${JSON.stringify(body)}`);
					// 路径判断
					switch (url.pathname) {
						case "/config/defaults": {
							const PLIST = body.plist;
							if (PLIST) {
								// CN
								PLIST["com.apple.GEO"].CountryProviders.CN.ShouldEnableLagunaBeach = true; // XX
								PLIST["com.apple.GEO"].CountryProviders.CN.DrivingMultiWaypointRoutesEnabled = true; // 驾驶导航途径点
								//PLIST["com.apple.GEO"].CountryProviders.CN.EnableAlberta = false; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.EnableClientDrapedVectorPolygons = true; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.GEOAddressCorrectionEnabled = true; // CN
								delete PLIST["com.apple.GEO"].CountryProviders.CN.GEOBatchSpatialEventLookupMaxParametersCount; // CN
								delete PLIST["com.apple.GEO"].CountryProviders.CN.GEOBatchSpatialPlaceLookupMaxParametersCount; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.LocalitiesAndLandmarksSupported = true; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.NavigationShowHeadingKey = true;
								PLIST["com.apple.GEO"].CountryProviders.CN.POIBusynessDifferentialPrivacy = true; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.POIBusynessRealTime = true; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.TransitPayEnabled = true; // CN
								//PLIST["com.apple.GEO"].CountryProviders.CN.WiFiQualityNetworkDisabled = Settings?.Config?.Defaults?.WiFiQualityNetworkDisabled ?? true; // CN
								//PLIST["com.apple.GEO"].CountryProviders.CN.WiFiQualityTileDisabled = Settings?.Config?.Defaults?.WiFiQualityTileDisabled ?? true; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.SupportsOffline = true; // CN
								PLIST["com.apple.GEO"].CountryProviders.CN.SupportsCarIntegration = true; // CN
								// TW
								PLIST["com.apple.GEO"].CountryProviders.CN.GEOShouldSpeakWrittenAddresses = true; // TW
								PLIST["com.apple.GEO"].CountryProviders.CN.GEOShouldSpeakWrittenPlaceNames = true; // TW
								// US
								PLIST["com.apple.GEO"].CountryProviders.CN["6694982d2b14e95815e44e970235e230"] = true; // US
								PLIST["com.apple.GEO"].CountryProviders.CN.PedestrianAREnabled = true; // 现实世界中的线路
								PLIST["com.apple.GEO"].CountryProviders.CN.OpticalHeadingEnabled = true; // 举起以查看
								PLIST["com.apple.GEO"].CountryProviders.CN.UseCLPedestrianMapMatchedLocations = true; // 导航准确性-增强
							}
							break;
						}
					}
					Console.debug(`body: ${JSON.stringify(body)}`);
					//$response.body = await PLISTs("json2plist", body); // json2plist
					$response.body = XML.stringify(body);
					break;
			}
			break;
		case "text/vtt":
		case "application/vtt":
			//body = VTT.parse($response.body);
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = VTT.stringify(body);
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
			//Console.debug(`$response: ${JSON.stringify($response, null, 2)}`);
			let rawBody = $app === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : ($response.body ?? new Uint8Array());
			//Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
			switch (FORMAT) {
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/octet-stream":
					switch (url.hostname) {
						//case "gsp-ssl.ls.apple.com":
						case "dispatcher.is.autonavi.com":
							switch (url.pathname) {
								//case "/dispatcher.arpc":
								case "/dispatcher": {
									/******************  initialization start  *******************/
									// 先拆分aRPC校验头和protobuf数据体
									const arpc = aRPC.response.unpack(rawBody);
									Console.debug(`arpc.unknown: ${JSON.stringify(arpc.unknown, null, 2)}`);
									/******************  initialization finish  *******************/
									body = GEOPDPlaceResponse.decode(arpc.message);
									let AppleDispatcher = Caches.Dispatcher.get($request.id);
									AppleDispatcher = GEOPDPlaceResponse.decode(AppleDispatcher);
									Console.debug(`AppleDispatcher: ${JSON.stringify(AppleDispatcher, null, 2)}`);
									switch (Settings.GeoCountryCode) {
										case "AUTO":
											body.displayRegion = Caches.PEP?.GCC ?? "US";
											break;
										default:
											body.displayRegion = Settings.GeoCountryCode;
											break;
									}
									body = GEOPDPlaceResponse.composite(body, AppleDispatcher, Settings);
									Console.debug(`body: ${JSON.stringify(body, null, 2)}`);
									arpc.message = GEOPDPlaceResponse.encode(body);
									//Console.debug(`arpc.message base64: ${Buffer.from(arpc.message).toString("base64")}`);
									/******************  initialization start  *******************/
									rawBody = aRPC.pack(arpc);
									/******************  initialization finish  *******************/
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
