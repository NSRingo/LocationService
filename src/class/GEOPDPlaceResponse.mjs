import { Console, Lodash as _ } from "@nsnanocat/util";
//import { MESSAGE_TYPE, reflectionMergePartial, BinaryReader, WireType, UnknownFieldHandler, isJsonObject, typeofJsonValue, jsonWriteOptions, MessageType } from "@protobuf-ts/runtime";
import { MapsResultType, StatusCode } from "../proto/apple/geo/protobuf/geo3.js";
import { ComponentType, Component_CacheControlType, MapsHomeResult_MapsHomeSectionType, GuidesHomeFixedSectionType, GuidesHomeRepeatableSectionType, GuidesHomeRepeatableSectionContentType, PlaceResponse, PlaceRequestType } from "../proto/apple/geo/protobuf/geo3/placedata.js";
export default class GEOPDPlaceResponse {
	static decode(rawBody = new Uint8Array([])) {
		console.log("☑️ GEOPDPlaceResponse.decode");
		switch (true) {
			case typeof rawBody === "string": // base64 string
				rawBody = new Uint8Array(Buffer.from(rawBody, "base64"));
				break;
			case Buffer.isBuffer(rawBody): // Node.js Buffer
				rawBody = new Uint8Array(rawBody.buffer, rawBody.byteOffset, rawBody.byteLength);
				break;
			case rawBody instanceof Uint8Array: // Uint8Array
				// 保持原样
				break;
			case ArrayBuffer.isView(rawBody): // 其它 TypedArray/DataView
				rawBody = new Uint8Array(rawBody.buffer, rawBody.byteOffset, rawBody.byteLength);
				break;
			case rawBody instanceof ArrayBuffer: // 原始 ArrayBuffer
				rawBody = new Uint8Array(rawBody);
				break;
			default:
				throw new TypeError("Unsupported rawBody type");
		}
		const body = PlaceResponse.fromBinary(rawBody);
		if (typeof body?.status !== "undefined") body.status = StatusCode[body.status];
		if (typeof body?.requestType !== "undefined") body.requestType = PlaceRequestType[body.requestType];
		if (typeof body?.globalResult?.ipGeoLookupResult?.status !== "undefined") body.globalResult.ipGeoLookupResult.status = StatusCode[body.globalResult.ipGeoLookupResult.status];
		if (typeof body?.globalResult?.mapsHomeResult?.mapsHomeSection !== "undefined")
			body.globalResult.mapsHomeResult.mapsHomeSection = body.globalResult.mapsHomeResult.mapsHomeSection.map(mapsHomeSection => {
				if (typeof mapsHomeSection.sectionType !== "undefined") mapsHomeSection.sectionType = MapsHomeResult_MapsHomeSectionType[mapsHomeSection.sectionType];
				return mapsHomeSection;
			});
		if (typeof body?.globalResult?.guidesHomeResult?.featuredGuides?.sectionType !== "undefined") body.globalResult.guidesHomeResult.featuredGuides.sectionType = GuidesHomeFixedSectionType[body.globalResult.guidesHomeResult.featuredGuides.sectionType];
		if (typeof body?.globalResult?.guidesHomeResult?.filters?.sectionType !== "undefined") body.globalResult.guidesHomeResult.filters.sectionType = GuidesHomeFixedSectionType[body.globalResult.guidesHomeResult.filters.sectionType];
		if (typeof body?.globalResult?.guidesHomeResult?.filteredGuides?.sectionType !== "undefined") body.globalResult.guidesHomeResult.filteredGuides.sectionType = GuidesHomeFixedSectionType[body.globalResult.guidesHomeResult.filteredGuides.sectionType];
		if (typeof body?.globalResult?.guidesHomeResult?.repeatableSection !== "undefined")
			body.globalResult.guidesHomeResult.repeatableSection = body.globalResult.guidesHomeResult.repeatableSection.map(repeatableSection => {
				if (typeof repeatableSection.sectionType !== "undefined") repeatableSection.sectionType = GuidesHomeRepeatableSectionType[repeatableSection.sectionType];
				if (typeof repeatableSection.contentType !== "undefined") repeatableSection.contentType = GuidesHomeRepeatableSectionContentType[repeatableSection.contentType];
				return repeatableSection;
			});
		if (typeof body?.placeResult !== "undefined")
			body.placeResult = body.placeResult.map(placeResult => {
				if (typeof placeResult?.status !== "undefined") placeResult.status = StatusCode[placeResult.status];
				if (typeof placeResult?.component !== "undefined")
					placeResult.component = placeResult.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				return placeResult;
			});
		if (typeof body?.mapsResult !== "undefined")
			body.mapsResult = body.mapsResult.map(mapsResult => {
				if (typeof mapsResult.resultType !== "undefined") mapsResult.resultType = MapsResultType[mapsResult.resultType];
				if (typeof mapsResult.place?.status !== "undefined") mapsResult.place.status = StatusCode[mapsResult.place.status];
				if (typeof mapsResult.place?.component !== "undefined")
					mapsResult.place.component = mapsResult.place.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				if (typeof mapsResult.collection?.status !== "undefined") mapsResult.collection.status = StatusCode[mapsResult.collection.status];
				if (typeof mapsResult.collection?.component !== "undefined")
					mapsResult.collection.component = mapsResult.collection.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				if (typeof mapsResult.publisher?.status !== "undefined") mapsResult.publisher.status = StatusCode[mapsResult.publisher.status];
				if (typeof mapsResult.publisher?.component !== "undefined")
					mapsResult.publisher.component = mapsResult.publisher.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				return mapsResult;
			});
		Console.log("✅ GEOPDPlaceResponse.decode");
		return body;
	}

	static encode(body = {}) {
		Console.log("☑️ GEOPDPlaceResponse.encode");
		if (typeof body?.status !== "undefined") body.status = StatusCode[body.status];
		if (typeof body?.requestType !== "undefined") body.requestType = PlaceRequestType[body.requestType];
		if (typeof body?.globalResult?.ipGeoLookupResult?.status !== "undefined") body.globalResult.ipGeoLookupResult.status = StatusCode[body.globalResult.ipGeoLookupResult.status];
		if (typeof body?.globalResult?.mapsHomeResult?.mapsHomeSection !== "undefined")
			body.globalResult.mapsHomeResult.mapsHomeSection = body.globalResult.mapsHomeResult.mapsHomeSection.map(mapsHomeSection => {
				if (typeof mapsHomeSection.sectionType !== "undefined") mapsHomeSection.sectionType = MapsHomeResult_MapsHomeSectionType[mapsHomeSection.sectionType];
				return mapsHomeSection;
			});
		if (typeof body?.globalResult?.guidesHomeResult?.featuredGuides?.sectionType !== "undefined") body.globalResult.guidesHomeResult.featuredGuides.sectionType = GuidesHomeFixedSectionType[body.globalResult.guidesHomeResult.featuredGuides.sectionType];
		if (typeof body?.globalResult?.guidesHomeResult?.filters?.sectionType !== "undefined") body.globalResult.guidesHomeResult.filters.sectionType = GuidesHomeFixedSectionType[body.globalResult.guidesHomeResult.filters.sectionType];
		if (typeof body?.globalResult?.guidesHomeResult?.filteredGuides?.sectionType !== "undefined") body.globalResult.guidesHomeResult.filteredGuides.sectionType = GuidesHomeFixedSectionType[body.globalResult.guidesHomeResult.filteredGuides.sectionType];
		if (typeof body?.globalResult?.guidesHomeResult?.repeatableSection !== "undefined")
			body.globalResult.guidesHomeResult.repeatableSection = body.globalResult.guidesHomeResult.repeatableSection.map(repeatableSection => {
				if (typeof repeatableSection.sectionType !== "undefined") repeatableSection.sectionType = GuidesHomeRepeatableSectionType[repeatableSection.sectionType];
				if (typeof repeatableSection.contentType !== "undefined") repeatableSection.contentType = GuidesHomeRepeatableSectionContentType[repeatableSection.contentType];
				return repeatableSection;
			});
		if (typeof body?.placeResult !== "undefined")
			body.placeResult = body.placeResult.map(placeResult => {
				if (typeof placeResult?.status !== "undefined") placeResult.status = StatusCode[placeResult.status];
				if (typeof placeResult?.component !== "undefined")
					placeResult.component = placeResult.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				return placeResult;
			});
		if (typeof body?.mapsResult !== "undefined")
			body.mapsResult = body.mapsResult.map(mapsResult => {
				if (typeof mapsResult.resultType !== "undefined") mapsResult.resultType = MapsResultType[mapsResult.resultType];
				if (typeof mapsResult.place?.status !== "undefined") mapsResult.place.status = StatusCode[mapsResult.place.status];
				if (typeof mapsResult.place?.component !== "undefined")
					mapsResult.place.component = mapsResult.place.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				if (typeof mapsResult.collection?.status !== "undefined") mapsResult.collection.status = StatusCode[mapsResult.collection.status];
				if (typeof mapsResult.collection?.component !== "undefined")
					mapsResult.collection.component = mapsResult.collection.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				if (typeof mapsResult.publisher?.status !== "undefined") mapsResult.publisher.status = StatusCode[mapsResult.publisher.status];
				if (typeof mapsResult.publisher?.component !== "undefined")
					mapsResult.publisher.component = mapsResult.publisher.component.map(component => {
						if (typeof component.type !== "undefined") component.type = ComponentType[component.type];
						if (typeof component.status !== "undefined") component.status = StatusCode[component.status];
						if (typeof component.cacheControl !== "undefined") component.cacheControl = Component_CacheControlType[component.cacheControl];
						return component;
					});
				return mapsResult;
			});
		const rawBody = PlaceResponse.toBinary(body);
		Console.log("✅ GEOPDPlaceResponse.encode");
		return rawBody;
	}

	static composite(AutoNaviDispatcher = {}, AppleDispatcher = {}) {
		Console.log("☑️ GEOPDPlaceResponse.composite");
		switch (`${AutoNaviDispatcher.status}|${AppleDispatcher.status}`) {
			case "STATUS_SUCCESS|FAILED_NO_RESULT":
				break;
			case "FAILED_NO_RESULT|STATUS_SUCCESS":
			case "FAILED_NO_RESULT|FAILED_NO_RESULT":
				AutoNaviDispatcher = AppleDispatcher;
				break;
			case "STATUS_SUCCESS|STATUS_SUCCESS":
				switch (AutoNaviDispatcher.requestType) {
					case "REQUEST_TYPE_REVERSE_GEOCODING":
						_.set(AutoNaviDispatcher, "globalResult.reverseGeocodingResult.showResult", true);
						break;
					case "REQUEST_TYPE_MAPS_HOME":
						//body.displayRegion = "US";
						//body.clientMetadata.deviceCountryCode = "US";
						break;
				}
				switch (AutoNaviDispatcher.mapsResult?.[0]?.resultType) {
					case "PLACE":
						if (AppleDispatcher.mapsResult[0]?.place?.mapsId?.shardedId?.center) _.set(AutoNaviDispatcher.mapsResult[0], "place.mapsId.shardedId.center", AppleDispatcher.mapsResult[0].place.mapsId.shardedId.center);
						if (AppleDispatcher.mapsResult[0]?.place?.mapsId?.shardedId?.mapsResultType) _.set(AutoNaviDispatcher.mapsResult[0], "place.mapsId.shardedId.mapsResultType", AppleDispatcher.mapsResult[0].place.mapsId.shardedId.mapsResultType);
						// 补全缺失的 component
						AutoNaviDispatcher.mapsResult[0].place.component = GEOPDPlaceResponse.fillMissingByType(AutoNaviDispatcher.mapsResult[0].place.component, AppleDispatcher.mapsResult[0]?.place?.component);
						// 替换为苹果的 component
						AutoNaviDispatcher.mapsResult[0].place.component = AutoNaviDispatcher.mapsResult[0].place.component.map(component => {
							switch (component.type) {
								case "ISO_3166_CODE": // 个性化修改的
									component.value = component.value.map(value => {
										if (typeof value.iso3166Code !== "undefined") value.iso3166Code.countryCode = "US";
										return value;
									});
									break;
								// case "ENTITY":
								case "PLACE_INFO": // 一定要替换的
								// case "ADDRESS_OBJECT":
								case "CAPTIONED_PHOTO":
								case "FLYOVER": // 一定要替换的
								case "RAP": // 一定要替换的
								case "VENUE_INFO": // 一定要替换的
								// case "EXPLORE_GUIDES": // 探索指南，没必要替换
								// case "UNKONWN102": // 百科-详细信息-链接
									component = AppleDispatcher.mapsResult[0]?.place?.component?.find(AppleComponent => AppleComponent.type === component.type) ?? component;
									break;
								default:
									switch (component.status) {
										case "STATUS_SUCCESS":
											break;
										default:
											component = AppleDispatcher.mapsResult[0]?.place?.component?.find(AppleComponent => AppleComponent.type === component.type) ?? component;
											break;
									}
									break;
							}
							return component;
						});
						break;
					case "BATCH_REVERSE_GEOCODE":
						AutoNaviDispatcher.mapsResult[0].batchReverseGeocode = AppleDispatcher.mapsResult[0]?.batchReverseGeocode ?? AppleDispatcher.mapsResult[0]?.batchReverseGeocode;
						break;
				}
				break;
		}
		Console.log("✅ GEOPDPlaceResponse.composite");
		return AutoNaviDispatcher;
	}

	/**
	 * 把 Apple中那些在 AutoNavi 中不存在 type 的对象「填充」到 AutoNavi 中
	 * @param {Array<Object>} AutoNavi 初始数组，元素有属性 type 等
	 * @param {Array<Object>} Apple 要“补充”的数组
	 * @param {string} key 用以比较的属性名（这里是 "type"）
	 */
	static fillMissingByType(AutoNavi = [], Apple = [], key = "type") {
		// 可以先把 A 中已有的 type 放进一个 Set，做快速查重
		const existing = new Set(AutoNavi.map(item => item[key]));

		for (const apple of Apple) {
			if (!existing.has(apple[key])) {
				AutoNavi.push(apple);
				//existing.add(apple[key]); // 重复的也要添加，所以这里注释掉
			}
		}
		// 返回 A，方便链式或调用使用
		return AutoNavi;
	}
}
