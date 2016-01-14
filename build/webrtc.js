/// <reference path="../../lib/DefinitelyTyped/webrtc/RTCPeerConnection" />
/// <reference path="Signalling/SignalChannelInterface" />
var Request;
(function (Request) {
    var XMLHttpRequestClient = (function () {
        function XMLHttpRequestClient() {
        }
        XMLHttpRequestClient.prototype.sendRequest = function (url, data, method, responseType, charset) {
            if (data === void 0) { data = null; }
            if (method === void 0) { method = "GET"; }
            if (responseType === void 0) { responseType = ""; }
            if (charset === void 0) { charset = "utf-8"; }
            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                // Since we return a promise, we always use async requests
                req.open(method, url, true);
                req.responseType = responseType;
                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        if (req.status >= 200 && req.status < 300) {
                            resolve(req.response);
                        }
                        else {
                            reject(new Error("Error while offering sdp. Status: " +
                                req.status + "; Response:" +
                                req.response));
                        }
                    }
                };
                if (data !== null) {
                    req.setRequestHeader("Content-Type", "application/json;charset=" + charset);
                }
                else {
                    req.setRequestHeader("Content-Type", "text/plain;charset=" + charset);
                }
                req.send(data);
            });
        };
        ;
        return XMLHttpRequestClient;
    })();
    Request.XMLHttpRequestClient = XMLHttpRequestClient;
})(Request || (Request = {}));
/// <reference path="../../lib/DefinitelyTyped/webrtc/RTCPeerConnection" />
/// <reference path="SignalChannelInterface" />
/// <reference path="../Request/XMLHttpRequestClient" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WebRTC;
(function (WebRTC) {
    var Signalling;
    (function (Signalling) {
        /**
         * Handles signalling using xmlhttprequests
         */
        var XMLHttpRequestSignalChannel = (function (_super) {
            __extends(XMLHttpRequestSignalChannel, _super);
            function XMLHttpRequestSignalChannel(server) {
                _super.call(this);
                this._server = server;
            }
            /**
             * Offers own sdp. Resolves with ICE candidate information
             * when successful
             */
            XMLHttpRequestSignalChannel.prototype.offer = function (session) {
                if (session.type !== "offer") {
                    throw new Error("sdp.type is not 'offer'");
                }
                var data = {
                    sdp: session.sdp
                };
                return this.sendRequest(this._server.url + "/offer", {}, "POST", "json");
            };
            XMLHttpRequestSignalChannel.prototype.answer = function (session) {
                if (session.type !== "answer") {
                    throw new Error("sdp.type is not 'answer'");
                }
                return this.sendRequest(this._server.url + "/answer", {}, "POST", "json");
            };
            return XMLHttpRequestSignalChannel;
        })(Request.XMLHttpRequestClient);
        Signalling.XMLHttpRequestSignalChannel = XMLHttpRequestSignalChannel;
    })(Signalling = WebRTC.Signalling || (WebRTC.Signalling = {}));
})(WebRTC || (WebRTC = {}));
//# sourceMappingURL=webrtc.js.map