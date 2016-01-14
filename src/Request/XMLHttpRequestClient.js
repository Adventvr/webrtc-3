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
                if (typeof data === "object") {
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
