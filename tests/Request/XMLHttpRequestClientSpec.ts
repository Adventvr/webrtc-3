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
	
	it("should resolve when status code is >= 200 and < 300", (done) => {
		var callback = sinon.spy();
		
		var client = new Request.XMLHttpRequestClient();
		client.send({url:""})
			.then(callback)
			.then(() => {
				expect(requests[0].method).toEqual("GET");
				expect(callback.calledWith("response")).toBe(true);
			}) 
			.then(done);
			 
		expect(requests.length).toBe(1);
		
        requests[0].respond(200, {}, "response");
	});
	
	it("should reject when status code > 299 or < 200", (done) => {
		var callback = sinon.spy();
		
		var client = new Request.XMLHttpRequestClient();
		var responses = [500, 400, 300, 199, 100],
			promises:Promise<any>[] = [];
		
		responses.forEach( (status) => {
			promises.push(client.send({url:""}).catch(callback));
		} );
		
		Promise.all(promises)
			.then(() => {
				expect(callback.callCount).toBe(responses.length);
			}) 
			.then(done);
			 
		expect(requests.length).toBe(responses.length);
		
		responses.forEach( (status, i) => {
        	requests[i].respond(status, {}, "")
		} );
	});
	
	it("should resolve json response to a json object", (done) => {
		var callback = sinon.spy();
		
		var client = new Request.XMLHttpRequestClient();
		client.send({url:"", responseType: Request.ResponseType.json}) 
			.then(callback)
			.then(() => {
				expect(callback.calledWith({ test: "test" })).toBe(true); 
			}) 
			.then(done);
			 
		expect(requests.length).toBe(1);
		
        requests[0].respond(200, {}, JSON.stringify({ test: "test" }));
	});
	
	it("should post json", (done) => {
		var callback = sinon.spy(),
			data:Object = { test: "test" };
		
		var client = new Request.XMLHttpRequestClient();
		client.send({url:"", method: Request.Method.POST, data: data, headers: {"Content-Type": "application/json;charset=utf-8"}})
			.then(callback)
			.then(() => {
				expect(requests[0].requestHeaders['Content-Type']).toEqual("application/json;charset=utf-8");
				expect(requests[0].method).toEqual("POST");
				expect(requests[0].requestBody).toEqual(data);
			}) 
			.then(done);
			 
		expect(requests.length).toBe(1);
		
        requests[0].respond(200, {}, "string");
	});
	
} );