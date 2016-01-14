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
			
			return this.send({
				url: this._server.url + "/offer",
				method: Request.Method.POST,
				data: {
					sdp: session.sdp
				},
				responseType: Request.ResponseType.json
			});
		}
		
		answer(session:RTCSessionDescription):Promise<RTCIceCandidate> {
			if(session.type !== "answer") {
				throw new Error("sdp.type is not 'answer'");
			}
			
			return this.send({
				url: this._server.url + "/answer",
				method: Request.Method.POST,
				data: {
				},
				responseType: Request.ResponseType.json
			});
		}
	}
}