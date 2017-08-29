describe("src/organism/JSVM", () => {
    let JSVM         = require('../../../src/organism/JSVM').default;
    let Num          = require('../../../src/organism/Num').default;
    let Observer     = require('../../../src/global/Observer').default;
    let Operators    = require('../../../src/organism/base/Operators').default;
    let Config       = require('../../../src/global/Config').Config;
    let api          = require('../../../src/global/Config').api;
    let cls          = null;

    beforeEach(() => {cls = Config.codeOperatorsCls;api.set('codeOperatorsCls', 'ops')});
    afterEach(() => api.set('codeOperatorsCls', cls));

    it("Checking jsvm creation", () => {
        let   flag = false;
        const obs  = new Observer(1);
        const clss = {ops: () => {}};
        const jsvm = new JSVM(() => flag = true, obs, clss);

        jsvm.run();
        expect(flag).toEqual(false);

        jsvm.destroy();
    });

    it("Checking parent argument and 'cloning' mode", () => {
        const clss   = {ops: () => {}};
        const obs    = new Observer(1);
        const parent = new JSVM(()=>{}, obs, clss);

        parent.insertLine();
        const jsvm   = new JSVM(()=>{}, obs, clss, parent);

        expect(jsvm.code[0] === parent.code[0]).toEqual(true);
        expect(jsvm.size === parent.size).toEqual(true);
        expect(jsvm.vars[0] === parent.vars[0]).toEqual(true);

        parent.destroy();
        jsvm.destroy();
    });

    it("Checking 'vars' getter for non 'cloning' mode", () => {
        const clss = {ops: () => {}};
        const obs  = new Observer(2);
        const jsvm = new JSVM(()=>{}, obs, clss);

        expect(jsvm.vars.length === Config.codeVarAmount).toEqual(true);

        jsvm.destroy();
    });

    it("Checking no code size", () => {
        const clss = {ops: () => {}};
        const obs  = new Observer(2);
        const jsvm = new JSVM(()=>{}, obs, clss);

        expect(jsvm.size).toEqual(0);
        jsvm.run();
        expect(jsvm.size).toEqual(0);

        jsvm.destroy();
    });

    it("Checking destroy", () => {
        const clss = {ops: () => {}};
        const obs  = new Observer(2);
        const jsvm = new JSVM(()=>{}, obs, clss);

        jsvm.destroy();
        expect(jsvm.code).toEqual(null);
    });

    it("Checking 'code' and 'size' properties", () => {
        const clss = {ops: () => {}};
        const obs  = new Observer(2);
        const jsvm = new JSVM(()=>{}, obs, clss);

        expect(jsvm.code instanceof Array).toEqual(true);
        expect(jsvm.size).toEqual(0);

        jsvm.insertLine();
        expect(jsvm.code instanceof Array).toEqual(true);
        expect(jsvm.size).toEqual(1);

        jsvm.insertLine();
        expect(jsvm.size).toEqual(2);
        jsvm.removeLine();
        expect(jsvm.size).toEqual(1);
        jsvm.removeLine();
        expect(jsvm.size).toEqual(0);

        jsvm.destroy();
    });

    it("Checking 'operators' property", () => {
        function Ops() {}
        const clss = {ops: Ops};
        const obs  = new Observer(2);
        const jsvm = new JSVM(()=>{}, obs, clss);

        expect(jsvm.operators instanceof Ops).toEqual(true);

        jsvm.destroy();
    });

    // it("Checking run method", () => {
    //     let   flag = 0;
    //     function Ops() {
    //         this.operators = () => {return {1: (n,l)=>{flag=n+''+l;return l+1}}};
    //         this.size      = () => 1;
    //     }
    //     const clss = {ops: Ops};
    //     const obs  = new Observer(1);
    //     const jsvm = new JSVM(()=>{}, obs, clss);
    //     //
    //     // Small hack. for this test only
    //     //
    //     jsvm._code.push(0b1000000000000000000000000);
    //     jsvm.run();
    //     expect(flag === '167772160').toEqual(true);
    //
    //     jsvm.destroy();
    // });

    //
    // it("Checking clone()", () => {
    //     let code1 = new JSVM((()=>{}));
    //     let code2 = new JSVM(()=>{});
    //     let bc1;
    //     let bc2;
    //
    //     expect(code1.size).toEqual(0);
    //     code1.insertLine();
    //     expect(code1.size).toEqual(1);
    //     code2.clone(code1);
    //     expect(code2.size).toEqual(1);
    //     bc1 = code1.cloneByteCode();
    //     bc2 = code2.cloneByteCode();
    //     expect(bc1[0] === bc2[0]).toEqual(true);
    //
    //     code1.destroy();
    // });
    //
    // it("Checking cloneCode()", () => {
    //     let code1 = new JSVM((()=>{}));
    //     let bc1;
    //
    //     expect(code1.size).toEqual(0);
    //     code1.insertLine();
    //     expect(code1.size).toEqual(1);
    //     bc1 = code1.cloneCode();
    //     expect(code1._code !== bc1).toEqual(true);
    //     expect(bc1[0] === code1._code[0]).toEqual(true);
    //
    //     code1.destroy();
    // });
    //
    // it("Checking cloneByteCode()", () => {
    //     let code1 = new JSVM((()=>{}));
    //     let bc1;
    //
    //     expect(code1.size).toEqual(0);
    //     code1.insertLine();
    //     expect(code1.size).toEqual(1);
    //     bc1 = code1.cloneByteCode();
    //     expect(code1._byteCode !== bc1).toEqual(true);
    //     expect(bc1[0] === code1._byteCode[0]).toEqual(true);
    //
    //     code1.destroy();
    // });
    //
    // it('Checking insertLine() method', () => {
    //     let code = new JSVM((()=>{}));
    //
    //     code.insertLine();
    //     expect(code.size).toEqual(1);
    //     code.insertLine();
    //     expect(code.size).toEqual(2);
    //
    //     code.destroy();
    // });
    // it('Checking insertLine() method 2', () => {
    //     let code = new JSVM((()=>{}));
    //     let get  = Num.get;
    //     let bc;
    //
    //     Num.get = () => 0xabcdefff;
    //     expect(code.size).toEqual(0);
    //     code.insertLine();
    //     expect(code.size).toEqual(1);
    //
    //     bc = code.cloneByteCode();
    //     expect(bc[0]).toEqual(0xabcdefff);
    //
    //     Num.get = get;
    //     code.destroy();
    // });
    //
    // it('Checking updateLine() method', () => {
    //     let code = new JSVM((()=>{}));
    //     let get  = Num.get;
    //     let bc;
    //
    //     Num.get = () => 0xabcdefff;
    //     code.insertLine();
    //     bc = code.cloneByteCode();
    //     expect(bc[0]).toEqual(0xabcdefff);
    //
    //     code.updateLine(0, 0xffffffff);
    //     bc = code.cloneByteCode();
    //     expect(bc[0]).toEqual(0xffffffff);
    //
    //     code.updateLine(0, 0x12345678);
    //     bc = code.cloneByteCode();
    //     expect(bc[0]).toEqual(0x12345678);
    //
    //
    //     Num.get = get;
    //     code.destroy();
    // });
    //
    // it('Checking removeLine() method', () => {
    //     let code = new JSVM((()=>{}));
    //
    //     code.insertLine();
    //     expect(code.size).toEqual(1);
    //     code.removeLine();
    //     expect(code.size).toEqual(0);
    //
    //     code.destroy();
    // });
    //
    // it('Checking removeLine() for empty jsvm', () => {
    //     let code = new JSVM((()=>{}));
    //
    //     expect(code.size).toEqual(0);
    //     code.removeLine();
    //     expect(code.size).toEqual(0);
    //
    //     code.destroy();
    // });
    //
    // it('Checking getLine()', () => {
    //     let code = new JSVM((()=>{}));
    //     let get  = Num.get;
    //
    //     Num.get = () => 0xabcdefff;
    //     expect(code.size).toEqual(0);
    //     expect(code.getLine(0)).toEqual(undefined);
    //     expect(code.getLine(1)).toEqual(undefined);
    //     code.insertLine();
    //     expect(code.size).toEqual(1);
    //     expect(code.getLine(0)).toEqual(0xabcdefff);
    //
    //     code.removeLine();
    //     expect(code.size).toEqual(0);
    //     expect(code.getLine(0)).toEqual(undefined);
    //     expect(code.getLine(1)).toEqual(undefined);
    //     expect(code.getLine(9)).toEqual(undefined);
    //
    //     Num.get = get;
    //     code.destroy();
    // });
    //
    // it('Checking compile()', () => {
    //     let code = new JSVM((()=>{}));
    //     let get  = Num.get;
    //
    //     Num.get = () => 0x01cdefff;
    //     expect(code.size).toEqual(0);
    //     code.insertLine();
    //     expect(code.size).toEqual(1);
    //     expect(code.cloneCode().length).toEqual(0);
    //
    //     code.compile({});
    //     expect(code.cloneCode().length).toEqual(1);
    //
    //     Num.get = get;
    //     code.destroy();
    // });
    // it('Checking compile() with no byte jsvm', () => {
    //     let code = new JSVM((()=>{}));
    //
    //     expect(code.size).toEqual(0);
    //     code.compile({});
    //     expect(code.cloneCode().length).toEqual(0);
    //
    //     code.destroy();
    // });
});