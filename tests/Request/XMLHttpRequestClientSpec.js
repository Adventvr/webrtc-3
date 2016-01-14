/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/sinon/sinon.d.ts" />
/// <reference path="../../src/Request/XMLHttpRequestClient" />
describe("AjaxClient", function () {
    var xhr;
    var requests;
    beforeEach(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
        requests = [];
    });
    afterEach(function () {
        xhr.restore();
    });
    it("should resolve when status code is >= 200 and < 300", function (done) {
        var callback = sinon.spy();
        var client = new Request.XMLHttpRequestClient();
        client.send({ url: "" })
            .then(callback)
            .then(function () {
            expect(requests[0].method).toEqual("GET");
            expect(callback.calledWith("response")).toBe(true);
        })
            .then(done);
        expect(requests.length).toBe(1);
        requests[0].respond(200, {}, "response");
    });
    it("should reject when status code > 299 or < 200", function (done) {
        var callback = sinon.spy();
        var client = new Request.XMLHttpRequestClient();
        var responses = [500, 400, 300, 199, 100], promises = [];
        responses.forEach(function (status) {
            promises.push(client.send({ url: "" }).catch(callback));
        });
        Promise.all(promises)
            .then(function () {
            expect(callback.callCount).toBe(responses.length);
        })
            .then(done);
        expect(requests.length).toBe(responses.length);
        responses.forEach(function (status, i) {
            requests[i].respond(status, {}, "");
        });
    });
    it("should resolve json response to a json object", function (done) {
        var callback = sinon.spy();
        var client = new Request.XMLHttpRequestClient();
        client.send({ url: "", responseType: Request.ResponseType.json })
            .then(callback)
            .then(function () {
            expect(callback.calledWith({ test: "test" })).toBe(true);
        })
            .then(done);
        expect(requests.length).toBe(1);
        requests[0].respond(200, {}, JSON.stringify({ test: "test" }));
    });
    it("should post json", function (done) {
        var callback = sinon.spy(), data = { test: "test" };
        var client = new Request.XMLHttpRequestClient();
        client.send({ url: "", method: Request.Method.POST, data: data, headers: { "Content-Type": "application/json;charset=utf-8" } })
            .then(callback)
            .then(function () {
            expect(requests[0].requestHeaders['Content-Type']).toEqual("application/json;charset=utf-8");
            expect(requests[0].method).toEqual("POST");
            expect(requests[0].requestBody).toEqual(data);
        })
            .then(done);
        expect(requests.length).toBe(1);
        requests[0].respond(200, {}, "string");
    });
});
