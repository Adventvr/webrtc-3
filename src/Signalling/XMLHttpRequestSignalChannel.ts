/// <reference path="../../lib/DefinitelyTyped/webrtc/RTCPeerConnection" />
/// <reference path="SignalChannelInterface" />

module WebRTC.Signalling {
	interface XMLHttpRequestSignallingServer {
		url: string;
	}
	
	/**
	 * Handles signalling using xmlhttprequests
	 */
	export class XMLHttpRequestSignalChannel implements SignalChannelInterface {
		
		private _server: XMLHttpRequestSignallingServer;
		
		constructor(server:XMLHttpRequestSignallingServer) {
			this._server = server;
		}
		
		/**
		 * Offers own sdp. Resolves with ICE candidate information 
		 * when successful
		 */
		offer(session:RTCSessionDescription):Promise<RTCIceCandidate> {
			var self = this;
			
			return new Promise( function(resolve, reject) {
				var req = new XMLHttpRequest();
				req.open("POST", self._server.url, true);
				req.onreadystatechange = function() {
					if(this.readyState === 4 && this.status === 200) {
						resolve();
						return;
					}
					
					reject(new Error("Error while offering sdp. Status: " + 
										this.status + "; Response:" + 
										this.responseText));
				};
				req.send();
			} );
		}
		
		/**
		 * Answers a received sdp offer. Resolves with ICE candidate 
		 * information when successful
		 */
		answer(session:RTCSessionDescription):Promise<RTCIceCandidate> {
			return Promise.reject(new Error("Not implemented"));
		}
		
		private createRequest(url:string, )
	}
}