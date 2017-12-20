/**
 * Digital Organisms Script - (DOS) is a simple language for VM.
 * This file contains all available operators implementation. For example:
 * for, if, variable declaration, steps, eating etc... User may override
 * this class for own needs and change operator list to custom.
 *
 * @author flatline
 */
const DIR       = require('./../../../../../../common/src/Directions').DIR;
const Helper    = require('./../../../../../../common/src/Helper');
const EVENTS    = require('./../../../../../src/share/Events').EVENTS;
const OConfig   = require('./../Config');
const Operators = require('./../../../../vm/Operators');
const Num       = require('./../../../../vm/Num');

/**
 * {Function} Just a shortcuts
 */
const VAR0                  = Num.getVar0;
const VAR1                  = Num.getVar1;
const VAR2                  = Num.getVar2;
const BITS_AFTER_THREE_VARS = Num.BITS_PER_OPERATOR + Num.BITS_PER_VAR * 3;
const FOUR_BITS             = 4;
const BLOCK_MAX_LEN         = OConfig.codeBitsPerBlock;
const BITS_FOR_NUMBER       = 16;
const IS_NUM                = Helper.isNumeric;
const HALF_OF_VAR           = Num.MAX_VAR / 2;
const CONDITION_BITS        = 2;
const BITS                  = Num.getBits;

/**
 * {Array} Available conditions for if operator. Amount should be
 * the same like (1 << BITS_PER_VAR)
 */
const CONDITIONS = [(a,b)=>a<b, (a,b)=>a>b, (a,b)=>a===b, (a,b)=>a!==b];
/**
 * {Array} Available operators for math calculations
 */
const OPERATORS = [(a,b)=>a+b, (a,b)=>a-b, (a,b)=>a*b, (a,b)=>a/b, (a,b)=>a%b, (a,b)=>a&b, (a,b)=>a|b, (a,b)=>a^b, (a,b)=>a>>b, (a,b)=>a<<b, (a,b)=>a>>>b, (a,b)=>+(a<b), (a,b)=>+(a>b), (a,b)=>+(a===b), (a,b)=>+(a!==b), (a,b)=>+(a<=b)];

class OperatorsDos extends Operators {
    constructor(offs, vars, obs) {
        super(offs, vars, obs);
        /**
         * {Object} These operator handlers should return string, which
         * will be added to the final string script for evaluation.
         */
        this._OPERATORS_CB = [
            this.onVar.bind(this),
            //this.onFunc.bind(this),
            this.onCondition.bind(this),
            this.onLoop.bind(this),
            this.onOperator.bind(this),
            //this.onNot.bind(this),
            //this.onPi.bind(this),
            //this.onTrig.bind(this),
            this.onLookAt.bind(this),
            this.onEatLeft.bind(this),
            this.onEatRight.bind(this),
            this.onEatUp.bind(this),
            this.onEatDown.bind(this),
            this.onStepLeft.bind(this),
            this.onStepRight.bind(this),
            this.onStepUp.bind(this),
            this.onStepDown.bind(this),
            this.onFromMem.bind(this),
            this.onToMem.bind(this),
            this.onMyX.bind(this),
            this.onMyY.bind(this),
            this.onCheckLeft.bind(this),
            this.onCheckRight.bind(this),
            this.onCheckUp.bind(this),
            this.onCheckDown.bind(this)
        ];
        //this._TRIGS = [(a)=>Math.sin(a), (a)=>Math.cos(a), (a)=>Math.tan(a), (a)=>Math.abs(a)];
        //
        // We have to set amount of available operators for correct
        // working of mutations of operators.
        //
        Num.setOperatorAmount(this._OPERATORS_CB.length);
    }

    destroy() {
        super.destroy();
        this._OPERATORS_CB = null;
        //this._TRIGS        = null;
    }

    get operators() {return this._OPERATORS_CB}

    /**
     * Parses variable operator. Format: var = number|var. 'num' bits format:
     * TODO:
     *
     * @param {Number} num Packed into number vm line
     * @param {Number} line Current line in vm
     * @return {Number} Parsed vm line string
     */
    onVar(num, line) {
        this.vars[VAR0(num)] = VAR2(num) < HALF_OF_VAR ? BITS(num, BITS_AFTER_THREE_VARS, BITS_FOR_NUMBER) : this.vars[VAR1(num)];
        return ++line;
    }

    //onFunc(num, line) {
    //    return ++line;
    //}

    onCondition(num, line, org, lines) {
        const val3 = BITS(num, BITS_AFTER_THREE_VARS, BLOCK_MAX_LEN);
        const offs = this._getOffs(line, lines, val3);
        const cond = VAR2(num) >>> (OConfig.codeBitsPerVar - CONDITION_BITS);

        if (CONDITIONS[cond](this.vars[VAR0(num)], this.vars[VAR1(num)])) {
            return ++line;
        }

        return offs;
    }

    /**
     * for(v0=v1; v0<v2; v0++)
     */
    onLoop(num, line, org, lines, afterIteration = false) {
        const vars = this.vars;
        const var0 = VAR0(num);
        const val3 = BITS(num, BITS_AFTER_THREE_VARS, BLOCK_MAX_LEN);
        const offs = this._getOffs(line, lines, val3);
        //
        // If last iteration has done and we've returned to the line,
        // where "for" operator is located
        //
        if (afterIteration === true) {
            if (++vars[var0] < vars[VAR2(num)]) {
                this.offs.push(line, offs);
                return ++line;
            }
            return offs;
        }
        //
        // This is first time we are running "for" operator. No
        // iterations have done, yet
        //
        vars[var0] = vars[VAR1(num)];
        if (vars[var0] < vars[VAR2(num)]) {
            this.offs.push(line, offs);
            return ++line;
        }

        return offs;
    }

    onOperator(num, line) {
        const vars = this.vars;
        vars[VAR0(num)] = OPERATORS[BITS(num, BITS_AFTER_THREE_VARS, FOUR_BITS)](vars[VAR1(num)], vars[VAR2(num)]);
        return ++line;
    }

    // onNot(num, line) {
    //     this.vars[VAR0(num)] = +!this.vars[VAR1(num)];
    //     return ++line;
    // }

    //onPi(num, line) {
    //    this.vars[VAR0(num)] = Math.PI;
    //    return ++line;
    //}

    //onTrig(num, line) {
    //    this.vars[VAR0(num)] = this._TRIGS[VAR2(num)](this.vars[VAR1(num)]);
    //    return ++line;
    //}

    onLookAt(num, line, org) {
        const vars = this.vars;
        let   x    = vars[VAR1(num)];
        let   y    = vars[VAR2(num)];

        if (!IS_NUM(x) || !IS_NUM(y) || Helper.normalize(x, y)[2] !== DIR.NO) {
            vars[VAR0(num)] = 0;
            return ++line;
        }

        let ret = {ret: 0};
        this.obs.fire(EVENTS.GET_ENERGY, org, x, y, ret);
        vars[VAR0(num)] = ret.ret;

        return ++line;
    }

    onEatLeft(num, line, org)   {this.vars[VAR0(num)] = this._eat(org, num, org.x - 1, org.y); return ++line}
    onEatRight(num, line, org)  {this.vars[VAR0(num)] = this._eat(org, num, org.x + 1, org.y); return ++line}
    onEatUp(num, line, org)     {this.vars[VAR0(num)] = this._eat(org, num, org.x, org.y - 1); return ++line}
    onEatDown(num, line, org)   {this.vars[VAR0(num)] = this._eat(org, num, org.x, org.y + 1); return ++line}

    onStepLeft(num, line, org)  {this.vars[VAR0(num)] = this._step(org, org.x, org.y, org.x - 1, org.y); return ++line}
    onStepRight(num, line, org) {this.vars[VAR0(num)] = this._step(org, org.x, org.y, org.x + 1, org.y); return ++line}
    onStepUp(num, line, org)    {this.vars[VAR0(num)] = this._step(org, org.x, org.y, org.x, org.y - 1); return ++line}
    onStepDown(num, line, org)  {this.vars[VAR0(num)] = this._step(org, org.x, org.y, org.x, org.y + 1); return ++line}

    onFromMem(num, line, org) {this.vars[VAR0(num)] = org.mem.pop() || 0; return ++line}
    onToMem(num, line, org) {
        const val = this.vars[VAR1(num)];

        if (IS_NUM(val) && org.mem.length < OConfig.orgMemSize) {
            this.vars[VAR0(num)] = org.mem.push(val);
        } else {
            this.vars[VAR0(num)] = 0;
        }

        return ++line;
    }

    onMyX(num, line, org) {this.vars[VAR0(num)] = org.x; return ++line}
    onMyY(num, line, org) {this.vars[VAR0(num)] = org.y; return ++line}

    onCheckLeft(num, line, org)  {return this._checkAt(num, line, org, org.x - 1, org.y)}
    onCheckRight(num, line, org) {return this._checkAt(num, line, org, org.x + 1, org.y)}
    onCheckUp(num, line, org)    {return this._checkAt(num, line, org, org.x, org.y - 1)}
    onCheckDown(num, line, org)  {return this._checkAt(num, line, org, org.x, org.y + 1)}

    _checkAt(num, line, org, x, y) {
        const ret = {ret: 0};
        org.fire(EVENTS.CHECK_AT, x, y, ret);
        this.vars[VAR0(num)] = ret.ret;
        return ++line;
    }

    _eat(org, num, x, y) {
        const vars   = this.vars;
        const amount = vars[VAR1(num)];
        if (!IS_NUM(amount) || amount === 0) {return 0}

        let ret = {ret: amount};
        this.obs.fire(EVENTS.EAT, org, x, y, ret);
        if (!IS_NUM(ret.ret)) {return 0}
        org.energy += ret.ret;

        return ret.ret;
    }

    _step(org, x1, y1, x2, y2) {
        let ret = {ret: 0};

        this.obs.fire(EVENTS.STEP, org, x1, y1, x2, y2, ret);
        if (ret.ret > 0) {
            org.x = ret.x;
            org.y = ret.y;
        }

        return ret.ret;
    }

    /**
     * Returns offset for closing bracket of blocked operators like
     * "if", "for" and so on. These operators shouldn't overlap each
     * other. for example:
     *
     *     for (...) {     // 0
     *         if (...) {  // 1
     *             ...     // 2
     *         }           // 3
     *     }               // 4
     *
     * Closing bracket in line 3 shouldn't be after bracket in line 4.
     * So it's possible to set it to one of  1...3. So we change it in
     * real time to fix the overlap problem.
     * @param {Number} line Current line index
     * @param {Number} lines Amount of lines
     * @param {Number} offs Local offset of closing bracket we want to set
     * @returns {Number}
     * @private
     */
    _getOffs(line, lines, offs) {
        let   offset  = line + offs < lines ? line + offs + 1 : lines;
        const offsets = this.offs;
        const length  = offsets.length;

        if (length > 0 && offset >= offsets[length - 1]) {
            return offsets[length - 1];
        }

        return offset;
    }
}

module.exports = OperatorsDos;