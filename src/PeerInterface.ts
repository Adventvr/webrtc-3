/**
 * This is the main interface the user handles with
 */
module WebRTC {
	interface ConnectedFunc {
		():void
	}
	
    export interface PeerInterface {
		id: string;
		connected: boolean;
		
		connect():Promise<ConnectedFunc>;
    }
}