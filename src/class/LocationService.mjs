import { $app, Console, fetch, Lodash as _, Storage } from "@nsnanocat/util";
import aRPC from "../aRPC/aRPC.mjs";
import GEOPDPlaceResponse from "./GEOPDPlaceResponse.mjs";

export default class LocationService {
	constructor(parameters) {
		this.Name = "LocationService";
		this.Version = "0.0.1";
		Console.log(`🟧 ${this.Name} v${this.Version}`);
		this.version = parameters.version;
		this.language = parameters.language;
		this.country = parameters.country;
	}

	static async Dispatcher(request = $request) {
		Console.info("☑️ Dispatcher");
		//Console.debug(`request: ${JSON.stringify(request, null, 2)}`);
		const newRequest = { ...request };
		newRequest.url = "https://gsp-ssl.ls.apple.com/dispatcher.arpc";
		newRequest["binary-mode"] = true;
		let dispatcher = {};
		try {
			dispatcher = await fetch(newRequest).then(response => {
				const rawBody = $app === "Quantumult X" ? new Uint8Array(response.bodyBytes ?? []) : (response.body ?? new Uint8Array());
				/******************  initialization start  *******************/
				// 先拆分aRPC校验头和protobuf数据体
				const arpc = aRPC.response.unpack(rawBody);
				// Console.debug(`arpc.unknown: ${JSON.stringify(arpc.unknown, null, 2)}`);
				/******************  initialization finish  *******************/
				// Console.debug(`arpc.message base64: ${Buffer.from(arpc.message).toString("base64")}`);
				// return GEOPDPlaceResponse.decode(arpc.message);
				return arpc.message;
			});
		} catch (error) {
			Console.error(`Dispatcher: ${error}`);
		} finally {
			//Console.debug(`Dispatcher: ${JSON.stringify(dispatcher, null, 2)}`);
			Console.info("✅ Dispatcher");
		}
		return dispatcher;
	}

	static setDispatcherCache(request = $request, dispatcher, cache = {}) {
		Console.info("☑️ setDispatcherCache");
		//Console.debug(`request: ${JSON.stringify(request, null, 2)}`);
		//Console.debug(`response: ${JSON.stringify(response, null, 2)}`);
		switch ($app) {
			case "Loon":
			case "Quantumult X":
			case "Stash":
				break;
			case "Surge":
			case "Egern":
				cache.Dispatcher.set(request.id, Buffer.from(dispatcher).toString("base64"));
				break;
			default:
				break;
		}
		cache.Dispatcher = Array.from(cache.Dispatcher).slice(-10);
		Console.info("✅ setDispatcherCache");
		return Storage.setItem("@iRingo.LocationService.Caches", cache);
	}
}
