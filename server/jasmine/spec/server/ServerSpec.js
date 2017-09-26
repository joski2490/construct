describe("server/src/server/Server", () => {
    const WebSocket = require('ws');
    const Server    = require('./../../../src/server/Server').Server;
    const EVENTS    = require('./../../../src/server/Server').EVENTS;
    const Console   = require('./../../../src/global/Console');
    const Helper    = require('./../../../../tests/spec/Helper').default;

    const WAIT_TIME = 10000;

    let error;
    let warn;
    let info;

    beforeAll(() => {
        error = Console.error;
        warn  = Console.warn;
        info  = Console.info;
        Console.error = () => {};
        Console.warn  = () => {};
        Console.info  = () => {};
    });
    afterAll(() => {
        Console.error = error;
        Console.warn  = warn;
        Console.info  = info;
    });

    it("Checking server creation", () => {
        let server = new Server(8899);

        server.destroy();
    });
    it("Checking two servers creation", () => {
        let server1 = new Server(8898);
        let server2 = new Server(8899);

        server2.destroy();
        server1.destroy();
    });
    it("Checking two servers creation on the same port", () => {
        let server1 = new Server(8899);
        let server2 = new Server(8899);

        server2.destroy();
        server1.destroy();
    });

    it("Checking server run", (done) => {
        let server  = new Server(8899);
        let waitObj = {done: false};

        server.on(EVENTS.RUN, () => waitObj.done = true);
        expect(server.run()).toEqual(true);
        Helper.waitFor(waitObj, () => {
            waitObj.done = false;
            server.on(EVENTS.STOP, () => waitObj.done = true);
            server.stop();
            Helper.waitFor(waitObj, () => {
                server.destroy();
                done();
            });
        });
    });

    it("Checking server run + one client connection", (done) => {
        let server  = new Server(8899);
        let waitObj = {done: false};

        server.on(EVENTS.CONNECT, () => waitObj.done = true);
        expect(server.run()).toEqual(true);
        const ws = new WebSocket('ws://127.0.0.1:8899');
        Helper.waitFor(waitObj, () => {
            waitObj.done = false;
            server.on(EVENTS.STOP, () => waitObj.done = true);
            server.stop();
            Helper.waitFor(waitObj, () => {
                server.destroy();
                done();
            });
        });
    });
    it("Checking server run + two clients connection", (done) => {
        let server  = new Server(8899);
        let waitObj = {done: false};
        let cons    = 0;

        server.on(EVENTS.CONNECT, () => {if (++cons === 2) {waitObj.done = true}});
        expect(server.run()).toEqual(true);
        const ws1 = new WebSocket('ws://127.0.0.1:8899');
        const ws2 = new WebSocket('ws://127.0.0.1:8899');
        Helper.waitFor(waitObj, () => {
            waitObj.done = false;
            server.on(EVENTS.STOP, () => waitObj.done = true);
            server.stop();
            Helper.waitFor(waitObj, () => {
                server.destroy();
                done();
            });
        });
    });
});