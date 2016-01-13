/// <reference path="../../lib/DefinitelyTyped/webrtc/RTCPeerConnection" />
/// <reference path="Signalling/SignalChannelInterface" />
var Request;
(function (Request) {
    var XMLHttpRequestClient = (function () {
        function XMLHttpRequestClient() {
        }
        XMLHttpRequestClient.prototype.sendRequest = function (url, data, method, responseType) {
            if (data === void 0) { data = null; }
            if (method === void 0) { method = "GET"; }
            if (responseType === void 0) { responseType = ""; }
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
var WebRTC;
(function (WebRTC) {
    var Signalling;
    (function (Signalling) {
        /**
         * Handles signalling using xmlhttprequests
         */
        var XMLHttpRequestSignalChannel = (function () {
            function XMLHttpRequestSignalChannel(server) {
                this._server = server;
            }
            /**
             * Offers own sdp. Resolves with ICE candidate information
             * when successful
             */
            XMLHttpRequestSignalChannel.prototype.offer = function (session) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open("POST", self._server.url, true);
                    req.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            resolve();
                            return;
                        }
                        reject(new Error("Error while offering sdp. Status: " +
                            this.status + "; Response:" +
                            this.responseText));
                    };
                    req.send();
                });
            };
            /**
             * Answers a received sdp offer. Resolves with ICE candidate
             * information when successful
             */
            XMLHttpRequestSignalChannel.prototype.answer = function (session) {
                return Promise.reject(new Error("Not implemented"));
            };
            return XMLHttpRequestSignalChannel;
        })();
        Signalling.XMLHttpRequestSignalChannel = XMLHttpRequestSignalChannel;
    })(Signalling = WebRTC.Signalling || (WebRTC.Signalling = {}));
})(WebRTC || (WebRTC = {}));
//# sourceMappingURL=webrtc.js.map