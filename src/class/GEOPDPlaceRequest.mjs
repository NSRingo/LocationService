import { Console } from "@nsnanocat/util";
//import { MESSAGE_TYPE, reflectionMergePartial, BinaryReader, WireType, UnknownFieldHandler, isJsonObject, typeofJsonValue, jsonWriteOptions, MessageType } from "@protobuf-ts/runtime";
import { Location_LocationType, GeoServiceType, MapsResultType, NameInfo_PhoneticType } from "../proto/apple/geo/protobuf/geo3.js";
import { ResolvedItemType, ClientMetadata_ClientRevision, ComponentType, PlaceRequest, PlaceRequestType, PlaceType } from "../proto/apple/geo/protobuf/geo3/placedata.js";
export default class GEOPDPlaceRequest {
	static decode(rawBody = new Uint8Array([])) {
		Console.log("☑️ GEOPDPlaceRequest.decode");
		const body = PlaceRequest.fromBinary(rawBody);
		if (body?.analyticMetadata?.serviceTag)
			body.analyticMetadata.serviceTag.map(serviceTag => {
				if (serviceTag.serviceType) serviceTag.serviceType = GeoServiceType[serviceTag.serviceType];
				return serviceTag;
			});
		if (body?.clientMetadata?.knownClientResolvedType) body.clientMetadata.knownClientResolvedType = body.clientMetadata.knownClientResolvedType.map(knownClientResolvedType => ResolvedItemType[knownClientResolvedType]);
		if (body?.clientMetadata?.deviceExtendedLocation?.type) body.clientMetadata.deviceExtendedLocation.type = Location_LocationType[body.clientMetadata.deviceExtendedLocation.type];
		if (body?.clientMetadata?.deviceHistoricalLocation)
			body.clientMetadata.deviceHistoricalLocation = body.clientMetadata.deviceHistoricalLocation.map(location => {
				if (location.type) location.type = Location_LocationType[location.type];
				return location;
			});
		if (body?.clientMetadata?.supportedMapsResultType) body.clientMetadata.supportedMapsResultType = body.clientMetadata.supportedMapsResultType.map(supportedMapsResultType => MapsResultType[supportedMapsResultType]);
		if (body?.clientMetadata?.clientRevisions) body.clientMetadata.clientRevisions = body.clientMetadata.clientRevisions.map(clientRevision => ClientMetadata_ClientRevision[clientRevision]);
		if (body?.clientMetadata?.localizationCapabilities?.supportedPhoneticType) body.clientMetadata.localizationCapabilities.supportedPhoneticType = body.clientMetadata.localizationCapabilities.supportedPhoneticType.map(supportedPhoneticType => NameInfo_PhoneticType[supportedPhoneticType]);
		if (body?.requestedComponent)
			body.requestedComponent.map(requestedComponent => {
				if (requestedComponent.type) requestedComponent.type = ComponentType[requestedComponent.type];
				return requestedComponent;
			});
		if (body?.requestType) body.requestType = PlaceRequestType[body.requestType];
		if (body?.placeRequestParameters?.reverseGeocodingParameters?.extendedLocation?.type) body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type = Location_LocationType[body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type];
		if (body?.placeRequestParameters?.batchReverseGeocodingParameters?.additionalPlaceType) body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType = PlaceType[body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType];
		Console.log("✅ GEOPDPlaceRequest.decode");
		return body;
	}

	static encode(body = {}) {
		Console.log("☑️ GEOPDPlaceRequest.encode");
		if (body?.analyticMetadata?.serviceTag)
			body.analyticMetadata.serviceTag.map(serviceTag => {
				if (serviceTag.serviceType) serviceTag.serviceType = GeoServiceType[serviceTag.serviceType];
				return serviceTag;
			});
		if (body?.clientMetadata?.knownClientResolvedType) body.clientMetadata.knownClientResolvedType = body.clientMetadata.knownClientResolvedType.map(knownClientResolvedType => ResolvedItemType[knownClientResolvedType]);
		if (body?.clientMetadata?.supportedMapsResultType) body.clientMetadata.supportedMapsResultType = body.clientMetadata.supportedMapsResultType.map(supportedMapsResultType => MapsResultType[supportedMapsResultType]);
		if (body?.clientMetadata?.deviceHistoricalLocation)
			body.clientMetadata.deviceHistoricalLocation = body.clientMetadata.deviceHistoricalLocation.map(location => {
				if (location.type) location.type = Location_LocationType[location.type];
				return location;
			});
		if (body?.clientMetadata?.deviceExtendedLocation?.type) body.clientMetadata.deviceExtendedLocation.type = Location_LocationType[body.clientMetadata.deviceExtendedLocation.type];
		if (body?.clientMetadata?.clientRevisions) body.clientMetadata.clientRevisions = body.clientMetadata.clientRevisions.map(clientRevision => ClientMetadata_ClientRevision[clientRevision]);
		if (body?.clientMetadata?.localizationCapabilities?.supportedPhoneticType) body.clientMetadata.localizationCapabilities.supportedPhoneticType = body.clientMetadata.localizationCapabilities.supportedPhoneticType.map(supportedPhoneticType => NameInfo_PhoneticType[supportedPhoneticType]);
		if (body?.requestedComponent)
			body.requestedComponent.map(requestedComponent => {
				if (requestedComponent.type) requestedComponent.type = ComponentType[requestedComponent.type];
				return requestedComponent;
			});
		if (body.requestType) body.requestType = PlaceRequestType[body.requestType];
		if (body?.placeRequestParameters?.reverseGeocodingParameters?.extendedLocation?.type) body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type = Location_LocationType[body.placeRequestParameters.reverseGeocodingParameters.extendedLocation.type];
		if (body?.placeRequestParameters?.batchReverseGeocodingParameters?.additionalPlaceType) body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType = PlaceType[body.placeRequestParameters.batchReverseGeocodingParameters.additionalPlaceType];
		const rawBody = PlaceRequest.toBinary(body);
		Console.log("✅ GEOPDPlaceRequest.encode");
		return rawBody;
	}
}
