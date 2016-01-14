module WebRTC.Request {
	export enum Method {
		GET,
		POST,
		PUT,
		PATCH,
		DELETE,
		HEAD
	}
	
	export enum ResponseType {
		arraybuffer,
		blob,
		document,
		json,
		text
	}
	
	export interface RequestConfigInterface {
		url: string
		method?: Method
		headers?: { [s: string]: string; }
		responseType?: ResponseType
		timeout?: number
		withCredentials?: boolean
		username?: string
		password?: string
		data?: (Object|Document|ArrayBuffer|Blob|FormData)
	}
	
	export class XMLHttpRequestClient {
		private static _defaultConfig:RequestConfigInterface = {
			url: "",
			method: Method.GET,
			timeout: 10000,
			responseType: ResponseType.text,
			withCredentials: false
		};
		
		public static set defaultConfig(config:RequestConfigInterface) {
			XMLHttpRequestClient._defaultConfig = config;
		}
		public static get defaultConfig():RequestConfigInterface {
			return XMLHttpRequestClient._defaultConfig;
		}
		
		public send(config:RequestConfigInterface) {
			return new Promise((resolve, reject) => {
				var def = XMLHttpRequestClient.defaultConfig;
				
				var req = new XMLHttpRequest();
				req.open(Method[config.method || def.method], config.url, true, config.username, config.password);
				req.responseType = ResponseType[config.responseType || def.responseType];
				req.timeout = config.timeout || def.timeout;
				
				if(typeof config.withCredentials !== "undefined") {
					req.withCredentials = config.withCredentials;
				}
				
				if(typeof config.headers !== "undefined") {
					for(var i in config.headers) {
						if(config.headers.hasOwnProperty(i) === false) {
							continue;
						}
						
						req.setRequestHeader( i, config.headers[i] );
					}
				}
				
				req.onreadystatechange = function() {
					if(req.readyState === 4) {
						if(req.status >= 200 && req.status < 300) {
							resolve(req.response);
						}
						else {
							reject(new Error("GET " + config.url + " failed: " + req.status));
						}
					}
				};
				
				req.send(config.data);
			});
		}
	}
}