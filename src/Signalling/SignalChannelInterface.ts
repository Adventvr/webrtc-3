/// <reference path="../../lib/DefinitelyTyped/webrtc/RTCPeerConnection" />

module WebRTC.Signalling {
	export interface SignalChannelInterface {
		/**
		 * Offers own sdp. Resolves with ICE candidate information 
		 * when successful
		 */
		offer(session:RTCSessionDescription):Promise<RTCIceCandidate>;
		
		/**
		 * Answers a received sdp offer. Resolves with ICE candidate 
		 * information when successful
		 */
		answer(session:RTCSessionDescription):Promise<RTCIceCandidate>;
	}
}