/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/sinon/sinon.d.ts" />
/// <reference path="../../src/Request/XMLHttpRequestClient" />

describe( "AjaxClient", () => {
	var xhr:Sinon.SinonFakeXMLHttpRequest;
	var requests: Sinon.SinonFakeXMLHttpRequest[];
	
	beforeEach(() => {
		xhr = sinon.useFakeXMLHttpRequest();
		
        xhr.onCreate = (xhr) => {
            requests.push(xhr);
        };
		
		requests = [];
	});
	
	afterEach(() => {
		xhr.restore();
	});
	
	it("GET http://example.com resolves promise with response body", (done) => {
		var callback = sinon.spy();
		
		var client = new Request.XMLHttpRequestClient();
		client.sendRequest("")
			.then(callback)
			.then(() => {
				expect(callback.calledWith("response")).toBe(true);
			}) 
			.then(done);
			 
		expect(requests.length).toBe(1);
		
        requests[0].respond(200, {}, "response");
	});
	
	it("should reject when status code > 299", (done) => {
		var callback = sinon.spy();
		
		var client = new Request.XMLHttpRequestClient();
		client.sendRequest("")
			.catch(callback)
			.then(() => {
				expect(callback.called).toBe(true);
			}) 
			.then(done);
			 
		expect(requests.length).toBe(1);
		
        requests[0].respond(300, {}, "");
	});
	
	it("should reject when status code < 200", (done) => {
		var callback = sinon.spy();
		
		var client = new Request.XMLHttpRequestClient();
		client.sendRequest("")
			.catch(callback)
			.then(() => {
				expect(callback.called).toBe(true);
			}) 
			.then(done);
			 
		expect(requests.length).toBe(1);
		
        requests[0].respond(199, {}, "");
	});
} );