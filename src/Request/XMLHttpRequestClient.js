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
