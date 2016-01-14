/// <reference path="../../lib/DefinitelyTyped/webrtc/RTCPeerConnection" />
/// <reference path="Signalling/SignalChannelInterface" />
var Request;
(function (Request) {
    (function (Method) {
        Method[Method["GET"] = 0] = "GET";
        Method[Method["POST"] = 1] = "POST";
        Method[Method["PUT"] = 2] = "PUT";
        Method[Method["PATCH"] = 3] = "PATCH";
        Method[Method["DELETE"] = 4] = "DELETE";
        Method[Method["HEAD"] = 5] = "HEAD";
    })(Request.Method || (Request.Method = {}));
    var Method = Request.Method;
    (function (ResponseType) {
        ResponseType[ResponseType["arraybuffer"] = 0] = "arraybuffer";
        ResponseType[ResponseType["blob"] = 1] = "blob";
        ResponseType[ResponseType["document"] = 2] = "document";
        ResponseType[ResponseType["json"] = 3] = "json";
        ResponseType[ResponseType["text"] = 4] = "text";
    })(Request.ResponseType || (Request.ResponseType = {}));
    var ResponseType = Request.ResponseType;
    var XMLHttpRequestClient = (function () {
        function XMLHttpRequestClient() {
        }
        Object.defineProperty(XMLHttpRequestClient, "defaultConfig", {
            get: function () {
                return XMLHttpRequestClient._defaultConfig;
            },
            set: function (config) {
                XMLHttpRequestClient._defaultConfig = config;
            },
            enumerable: true,
            configurable: true
        });
        XMLHttpRequestClient.prototype.send = function (config) {
            return new Promise(function (resolve, reject) {
                var def = XMLHttpRequestClient.defaultConfig;
                var req = new XMLHttpRequest();
                req.open(Method[config.method || def.method], config.url, true, config.username, config.password);
                req.responseType = ResponseType[config.responseType || def.responseType];
                req.timeout = config.timeout || def.timeout;
                if (typeof config.withCredentials !== "undefined") {
                    req.withCredentials = config.withCredentials;
                }
                if (typeof config.headers !== "undefined") {
                    for (var i in config.headers) {
                        if (config.headers.hasOwnProperty(i) === false) {
                            continue;
                        }
                        req.setRequestHeader(i, config.headers[i]);
                    }
                }
                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        if (req.status >= 200 && req.status < 300) {
                            resolve(req.response);
                        }
                        else {
                            reject(new Error("GET " + config.url + " failed: " + req.status));
                        }
                    }
                };
                req.send(config.data);
            });
        };
        XMLHttpRequestClient._defaultConfig = {
            url: "",
            method: Method.GET,
            timeout: 10000,
            responseType: ResponseType.text,
            withCredentials: false
        };
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
                return this.send({
                    url: this._server.url + "/offer",
                    method: Request.Method.POST,
                    data: {
                        sdp: session.sdp
                    },
                    responseType: Request.ResponseType.json
                });
            };
            XMLHttpRequestSignalChannel.prototype.answer = function (session) {
                if (session.type !== "answer") {
                    throw new Error("sdp.type is not 'answer'");
                }
                return this.send({
                    url: this._server.url + "/answer",
                    method: Request.Method.POST,
                    data: {},
                    responseType: Request.ResponseType.json
                });
            };
            return XMLHttpRequestSignalChannel;
        })(Request.XMLHttpRequestClient);
        Signalling.XMLHttpRequestSignalChannel = XMLHttpRequestSignalChannel;
    })(Signalling = WebRTC.Signalling || (WebRTC.Signalling = {}));
})(WebRTC || (WebRTC = {}));
//# sourceMappingURL=webrtc.js.map