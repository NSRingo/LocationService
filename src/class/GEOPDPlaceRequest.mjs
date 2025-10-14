import { Console } from "@nsnanocat/util";
//import { MESSAGE_TYPE, reflectionMergePartial, BinaryReader, WireType, UnknownFieldHandler, isJsonObject, typeofJsonValue, jsonWriteOptions, MessageType } from "@protobuf-ts/runtime";
import { Location_LocationType, GeoServiceType, MapsResultType, NameInfo_PhoneticType } from "../proto/apple/geo/protobuf/geo3.js";
import { ResolvedItemType, ClientMetadata_ClientRevision, ComponentType, PlaceRequest, PlaceRequestType, PlaceType } from "../proto/apple/geo/protobuf/geo3/placedata.js";
export default class GEOPDPlaceRequest {
	static decode(rawBody = new Uint8Array([])) {
		Console.log("☑️ GEOPDPlaceRequest.decode");
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
		if (typeof body?.placeRequestParameters?.reverseGeocodingParameters?.extendedLocation?.type !== "undefined") body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type = Location_LocationType[body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type];
		if (typeof body?.placeRequestParameters?.batchReverseGeocodingParameters?.additionalPlaceType !== "undefined") body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType = PlaceType[body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType];
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
		if (typeof body?.placeRequestParameters?.reverseGeocodingParameters?.extendedLocation?.type !== "undefined") body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type = Location_LocationType[body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type];
		if (typeof body?.placeRequestParameters?.batchReverseGeocodingParameters?.additionalPlaceType !== "undefined") body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType = PlaceType[body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType];
		const rawBody = PlaceRequest.toBinary(body);
		Console.log("✅ GEOPDPlaceRequest.encode");
		return rawBody;
	}
}
