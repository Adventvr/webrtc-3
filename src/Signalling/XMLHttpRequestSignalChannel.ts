/// <reference path="../../lib/DefinitelyTyped/webrtc/RTCPeerConnection" />
/// <reference path="SignalChannelInterface" />
/// <reference path="../Request/XMLHttpRequestClient" />

module WebRTC.Signalling {
	interface XMLHttpRequestSignallingServer {
		url: string;
	}
	
	/**
	 * Handles signalling using xmlhttprequests
	 */
	export class XMLHttpRequestSignalChannel extends Request.XMLHttpRequestClient implements SignalChannelInterface {
		
		protected _server: XMLHttpRequestSignallingServer;
		
		constructor(server:XMLHttpRequestSignallingServer) {
			super();
			this._server = server;
		}
		
		/**
		 * Offers own sdp. Resolves with ICE candidate information 
		 * when successful
		 */
		offer(session:RTCSessionDescription):Promise<RTCIceCandidate> {
			if(session.type !== "offer") {
				throw new Error("sdp.type is not 'offer'");
			}
			
			var data:{} = {
				sdp: session.sdp
			}
			return this.sendRequest(this._server.url + "/offer", {}, "POST", "json");
		}
		
		answer(session:RTCSessionDescription):Promise<RTCIceCandidate> {
			if(session.type !== "answer") {
				throw new Error("sdp.type is not 'answer'");
			}
			
			return this.sendRequest(this._server.url + "/answer", {}, "POST", "json");
		}
	}
}