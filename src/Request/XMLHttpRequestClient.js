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
