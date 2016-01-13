module Request {
	export class XMLHttpRequestClient {
		public sendRequest(url:string, data:any=null, method:string="GET", responseType:string=""):Promise<any> {
			return new Promise( function(resolve, reject) {
				var req = new XMLHttpRequest();
				// Since we return a promise, we always use async requests
				req.open(method, url, true);
				req.responseType = responseType;
				req.onreadystatechange = function() {
					if(req.readyState === 4) {
						if(req.status >= 200 && req.status < 300) {
							resolve(req.response);
						}
						else {
							reject(new Error("Error while offering sdp. Status: " + 
											req.status + "; Response:" + 
											req.response));
						}
					}
				};
				req.send(data);
			} );
		};
	}
}