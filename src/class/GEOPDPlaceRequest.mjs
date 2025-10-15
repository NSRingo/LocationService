import { Console } from "@nsnanocat/util";
//import { MESSAGE_TYPE, reflectionMergePartial, BinaryReader, WireType, UnknownFieldHandler, isJsonObject, typeofJsonValue, jsonWriteOptions, MessageType } from "@protobuf-ts/runtime";
import { Location_LocationType, GeoServiceType, MapsResultType, NameInfo_PhoneticType } from "../proto/apple/geo/protobuf/geo3.js";
import { ResolvedItemType, ClientMetadata_ClientRevision, ComponentType, PlaceRequest, PlaceRequestType, PlaceType } from "../proto/apple/geo/protobuf/geo3/placedata.js";
export default class GEOPDPlaceRequest {
	static decode(rawBody = new Uint8Array([])) {
		Console.log("☑️ GEOPDPlaceRequest.decode");
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
		const body = PlaceRequest.fromBinary(rawBody);
		if (typeof body?.analyticMetadata?.serviceTag !== "undefined")
			body.analyticMetadata.serviceTag.map(serviceTag => {
				if (typeof serviceTag.serviceType !== "undefined") serviceTag.serviceType = GeoServiceType[serviceTag.serviceType];
				return serviceTag;
			});
		if (typeof body?.clientMetadata?.knownClientResolvedType !== "undefined") body.clientMetadata.knownClientResolvedType = body.clientMetadata.knownClientResolvedType.map(knownClientResolvedType => ResolvedItemType[knownClientResolvedType]);
		if (typeof body?.clientMetadata?.deviceExtendedLocation?.type !== "undefined") body.clientMetadata.deviceExtendedLocation.type = Location_LocationType[body.clientMetadata.deviceExtendedLocation.type];
		if (typeof body?.clientMetadata?.deviceHistoricalLocation !== "undefined")
			body.clientMetadata.deviceHistoricalLocation = body.clientMetadata.deviceHistoricalLocation.map(location => {
				if (typeof location.type !== "undefined") location.type = Location_LocationType[location.type];
				return location;
			});
		if (typeof body?.clientMetadata?.supportedMapsResultType !== "undefined") body.clientMetadata.supportedMapsResultType = body.clientMetadata.supportedMapsResultType.map(supportedMapsResultType => MapsResultType[supportedMapsResultType]);
		if (typeof body?.clientMetadata?.clientRevisions !== "undefined") body.clientMetadata.clientRevisions = body.clientMetadata.clientRevisions.map(clientRevision => ClientMetadata_ClientRevision[clientRevision]);
		if (typeof body?.clientMetadata?.localizationCapabilities?.supportedPhoneticType !== "undefined") body.clientMetadata.localizationCapabilities.supportedPhoneticType = body.clientMetadata.localizationCapabilities.supportedPhoneticType.map(supportedPhoneticType => NameInfo_PhoneticType[supportedPhoneticType]);
		if (typeof body?.requestedComponent !== "undefined")
			body.requestedComponent.map(requestedComponent => {
				if (typeof requestedComponent.type !== "undefined") requestedComponent.type = ComponentType[requestedComponent.type];
				return requestedComponent;
			});
		if (typeof body?.requestType !== "undefined") body.requestType = PlaceRequestType[body.requestType];
		if (typeof body?.placeRequestParameters?.reverseGeocodingParameters?.extendedLocation !== "undefined")
			body.placeRequestParameters.reverseGeocodingParameters.extendedLocation = body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.map(location => {
				if (typeof location.type !== "undefined") location.type = Location_LocationType[location.type];
				return location;
			});
		if (typeof body?.placeRequestParameters?.batchReverseGeocodingParameters?.additionalPlaceType !== "undefined") body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType = body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType.map(placeType => PlaceType[placeType]);
		Console.log("✅ GEOPDPlaceRequest.decode");
		return body;
	}

	static encode(body = {}) {
		Console.log("☑️ GEOPDPlaceRequest.encode");
		if (typeof body?.analyticMetadata?.serviceTag !== "undefined")
			body.analyticMetadata.serviceTag.map(serviceTag => {
				if (typeof serviceTag.serviceType !== "undefined") serviceTag.serviceType = GeoServiceType[serviceTag.serviceType];
				return serviceTag;
			});
		if (typeof body?.clientMetadata?.knownClientResolvedType !== "undefined") body.clientMetadata.knownClientResolvedType = body.clientMetadata.knownClientResolvedType.map(knownClientResolvedType => ResolvedItemType[knownClientResolvedType]);
		if (typeof body?.clientMetadata?.supportedMapsResultType !== "undefined") body.clientMetadata.supportedMapsResultType = body.clientMetadata.supportedMapsResultType.map(supportedMapsResultType => MapsResultType[supportedMapsResultType]);
		if (typeof body?.clientMetadata?.deviceHistoricalLocation !== "undefined")
			body.clientMetadata.deviceHistoricalLocation = body.clientMetadata.deviceHistoricalLocation.map(location => {
				if (typeof location.type !== "undefined") location.type = Location_LocationType[location.type];
				return location;
			});
		if (typeof body?.clientMetadata?.deviceExtendedLocation?.type !== "undefined") body.clientMetadata.deviceExtendedLocation.type = Location_LocationType[body.clientMetadata.deviceExtendedLocation.type];
		if (typeof body?.clientMetadata?.clientRevisions !== "undefined") body.clientMetadata.clientRevisions = body.clientMetadata.clientRevisions.map(clientRevision => ClientMetadata_ClientRevision[clientRevision]);
		if (typeof body?.clientMetadata?.localizationCapabilities?.supportedPhoneticType !== "undefined") body.clientMetadata.localizationCapabilities.supportedPhoneticType = body.clientMetadata.localizationCapabilities.supportedPhoneticType.map(supportedPhoneticType => NameInfo_PhoneticType[supportedPhoneticType]);
		if (typeof body?.requestedComponent !== "undefined")
			body.requestedComponent.map(requestedComponent => {
				if (typeof requestedComponent.type !== "undefined") requestedComponent.type = ComponentType[requestedComponent.type];
				return requestedComponent;
			});
		if (typeof body.requestType !== "undefined") body.requestType = PlaceRequestType[body.requestType];
		if (typeof body?.placeRequestParameters?.reverseGeocodingParameters?.extendedLocation !== "undefined")
			body.placeRequestParameters.reverseGeocodingParameters.extendedLocation = body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.map(location => {
				if (typeof location.type !== "undefined") location.type = Location_LocationType[location.type];
				return location;
			});
		if (typeof body?.placeRequestParameters?.batchReverseGeocodingParameters?.additionalPlaceType !== "undefined") body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType = body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType.map(placeType => PlaceType[placeType]);
		const rawBody = PlaceRequest.toBinary(body);
		Console.log("✅ GEOPDPlaceRequest.encode");
		return rawBody;
	}
}
