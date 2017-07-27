/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Global jevo.js configuration file. Affects only current jevo
 * instance. Other instances may have different configuration values
 *
 * @author DeadbraiN
 * TODO: find and remove unused values
 */
const QUIET_ALL               = 0;
const QUIET_IMPORTANT         = 1;
const QUIET_NO                = 2;

const ORG_MAX_MUTATION_PERIOD = 1000;
const ORG_FIRST_COLOR         = 1;
const ORG_MAX_COLOR           = Number.MAX_SAFE_INTEGER;

const Config = {
    /**
     * Constants of quite mode. This mode affects on amount and
     * types of console messages. For example in QUIET_IMPORTANT
     * mode info messages will be hidden.
     */
    QUIET_ALL              : QUIET_ALL,
    QUIET_IMPORTANT        : QUIET_IMPORTANT,
    QUIET_NO               : QUIET_NO,

    ORG_MAX_MUTATION_PERIOD: ORG_MAX_MUTATION_PERIOD,
    ORG_FIRST_COLOR        : ORG_FIRST_COLOR,
    ORG_MAX_COLOR          : ORG_MAX_COLOR,
    /**
     * {Array} Probabilities with which mutator decides what to do: 
     * add, change, delete character of the code; change amount of
     * mutations or change mutations period... Depending on these
     * values, organism may have different strategies of living.
     * For example: if add value is bigger then del and change,
     * then code size will be grow up all the time. If del value is
     * bigger then other, then it will be decreased to zero lines
     * of code and will die.
     * Format: [
     *     add          - Probability of adding of new character to the code
     *     change       - Probability of changing existing character in a code
     *     small-change - Probability of "small change" - change of expression part
     *     delete       - Probability of deleting of a character in a code
     *     clone        - Probability for amount of mutations on clone
     *     period       - Probability of period of organism mutations
     *     amount       - Probability of amount of mutations per period
     * ]
     */
    orgMutationProbs: [50,100,50,0,1,1,1,1,1],
    /**
     * {Number} Max value, which we may use in orgMutationProbs array.
     */
    orgMutationProbsMaxValue: 100,
    /**
     * {Number} Percent of mutations from code size, which will be applied to
     * organism after clonning. Should be <= 1.0
     */
    orgCloneMutation: 0.1,
    /**
     * {Number} Amount of iterations before clonning process
     */
    orgClonePeriod: 10,
    /**
     * {Number} Amount of iterations, after which crossover will be applied
     * to random organisms.
     */
    orgCrossoverPeriod: 200,
    /**
     * {Number} Amount of iterations within organism's life loop, after that we
     * do mutations according to orgRainMutationPercent config. If 0, then
     * mutations will be disabled. Should be less then ORGANISM_MAX_MUTATION_PERIOD
     */
    orgRainMutationPeriod: 1000,
    /**
     * {Number} Value, which will be used like amount of mutations per
     * orgRainMutationPeriod iterations. 0 is a possible value if
     * we want to disable mutations. Should be less then 100
     */
    orgRainMutationPercent: 0.01,
    /**
     * {Number} Amount of organisms we have to create on program start
     */
    orgStartAmount: 300,
    /**
     * {Number} Amount of energy for first organisms. They are like Adam and
     * Eve. It means that these empty (without code) organism were created
     * by operator and not by evolution.
     */
    orgStartEnergy: 100000,
    /**
     * {Number} Begin color of "empty" organism (organism without code).
     */
    orgStartColor: 0xFF0000,
    /**
     * {Number} Amount of iterations within organism's life loop, after that we decrease
     * some amount of energy. If 0, then energy decreasing will be disabled.
     */
    orgEnergySpendPeriod: 500,
    /**
     * {Number} Amount of energy, which will be decreased in case of organism's
     * code error or exception
     */
    orgEnergySpendOnError: 1000,
    /**
     * {Number} Amount of iterations when organism is alive. It will die after
     * this period. If 0, then will not be used.
     */
    orgAlivePeriod: 8000,
    /**
     * {Number} This value means the period between organism codeSizes, which
     * affects energy grabbing by the system. For example: we have two
     * organisms: org1.energy = 10, org2.energy = 10, org1.codeSize = 6,
     * org2.codeSize = 9, Config.orgGarbagePeriod = 5. It means that
     * during energy grabbing by the system org1 and org2 will spend the
     * same amount of energy - 1 unit. This is because the period goes
     * from 1..5, 6..10,... and both organisms are in the same period.
     */
    orgGarbagePeriod: 20,
    /**
     * {Number} Size of organism stack (internal memory)
     */
    orgMemSize: 256,
    /**
     * {Number} Percent of energy, which will be given to the child
     */
    orgCloneEnergyPercent: 0.5,
    /**
     * {Number} Maximum amount of arguments in custom functions. Minimum 1. Maximum
     * <= amount of default variables.
     */
    codeFuncParamAmount: 2,
    /**
     * {Number} Amount of iterations in a loop (for operator)
     */
    codeLoopAmount: 128,
    /**
     * {Number} If organism reach this limit of amount of code lines, then codeSizeCoef
     * will be used during it's energy grabbing by system. We use this approach,
     * because our CPU's are slow and organisms with big codes are very slow. But
     * it's possible for organisms to go outside the limit by inventing new
     * effective mechanisms of energy obtaining.
     */
    codeMaxSize: 100,
    /**
     * {Number} This coefficiend is used for calculating of amount of energy,
     * which grabbed from each organism depending on his codeSize.
     * This coefficient affects entire code size of population and
     * entire system speed. It depends on CPU speed also. So, for
     * different PC's it may be different.
     * Formula is the following: grabEnergy = cfg.codeSizeCoef * org.codeSize
     * See Config.codeMaxSize for details. This config will be turn on only if
     * organism reaches code size limit Config.codeMaxSize
     */
    codeSizeCoef: 10000,
    /**
     * {Number} Amount of local variables of organism's script
     */
    codeVarAmount: 4,
    /**
     * {Number} The value from -X/2 to X/2, which is used for setting
     * default value, while organism is delivering. So, if the value is
     * 1000, then ragne will be: -500..500
     */
    codeVarInitRange: 1000,
    /**
     * {Number} Every code line 'yield' operator will be inserted to prevent
     * locking of threads.
     */
    codeYieldPeriod: 10,
    /**
     * {Number} Amount of bits per one variable. It affects maximum value,
     * which this variable may contain
     */
    codeBitsPerVar: 2,
    /**
     * {Number} Amount of bits for storing operator. This is first XX bits
     * in a number.
     */
    codeBitsPerOperator: 8,
    /**
     * {Number} Amount of iterations between calls to V8 event loop. See
     * Manager._initLoop(), Manager.run() methods for details.
     */
    codeIterationsPerOnce: 10,
    /**
     * {Number} World width
     */
    worldWidth: 1000,
    /**
     * {Number} World height
     */
    worldHeight: 600,
    /**
     * {Number} Turns on ciclic world mode. It means that organisms may go outside
     * it's border, but still be inside. For example, if the world has 10x10
     * size and the organism has 10x5 position in it, one step right will move
     * this organism at the position 1x5. The same scenario regarding Y
     * coordinate (height).
     */
    worldCyclical: true,
    /**
     * {Number} Maximum amount of organisms in a world. If some organisms will
     * try to clone itself, when entire amount of organisms are equal
     * this value, then it(clonning) will not happen.
     */
    worldMaxOrgs: 500,
    /**
     * {Number} Amount of energy blocks in a world. Blocks will be placed in a
     * random way...
     */
    worldStartEnergyDots: 1000,
    /**
     * {Number} Amount of energy in every block. See worldStartEnergyDots
     * config for details.
     */
    worldStartEnergyInDot: 0x00FF00,
    /**
     * {Number} Minimum percent of energy in current world. Under percent i mean
     * percent from entire world area (100%). If the energy will be less
     * or equal then this percent, then new random energy should be added.
     * Should be less then 100.0 and more and equal to 0.0. 0.17 is a
     * normal percent for this system.
     */
    worldEnergyCheckPercent: 0.3,
    /**
     * {Number} An amount of iteration, after which we have to check world energy
     * amount. Works in pair with worldEnergyCheckPercent. May be 0 if
     * you want to disable it
     */
    worldEnergyCheckPeriod: 1000,
    /**
     * {Number} World scaling. On todays monitors pixel are so small, so we have
     * to zoom them with a coefficient.
     */
    worldZoom: 1,
    /**
     * {Number} Quite mode. This mode affects on amount and
     * types of console messages. For example in QUIET_IMPORTANT
     * mode info messages will be hidden.
     */
    worldQuiteMode: QUIET_IMPORTANT,
    /**
     * {Number} Period of milliseconds, which is user for checking IPS value. It's
     * possible to increase it to reduce amount of requests and additional
     * code in main loop
     */
    worldIpsPeriodMs: 1000,
    /**
     * {Number} Period of making automatic backup of application. In iterations
     */
    backupPeriod: 100,
    /**
     * {Number} Amount of backup files stored on HDD. Old files will be removed
     */
    backupAmount: 10,
    /**
     * {Number} The period of time between yield() calls in "stand by" mode.
     * In this mode manager waits for data in sockets and new connections.
     * In this mode yield() is called only once in a period, because
     * it eats CPU cicles. In case of data in sockets or new connections
     * yield() will be called more often.
     */
    conYieldPeriod: 0.01,
    /**
     * {Number} Percent of energy, which will be minused from organism after
     * stepping from one instance to another.
     */
    conStepEnergySpendPercent: 20,
    /**
     * {Number} Starting number for TCP/IP listening
     */
    conServerPort: 2010,
    /**
     * {String} Works in pair with conServerPort. An IP of current
     * server/instance.
     * TODO: IPv6?
     */
    conServerIp: '127.0.0.1',
    /**
     * {Number} Port number for "fast" mode. It uses, for example, for pooling
     */
    conFastServerPort: 2011,
    /**
     * {Number} Left side server's (instance) port we want connect to. May be
     * zero (0) if no left side server available.
     */
    conLeftServerPort: 0,
    /**
     * {String} Left server(instance) IP address. Works in pair with
     * conLeftServerPort
     */
    conLeftServerIp: '127.0.0.1',
    /**
     * {Number} Right side server's (instance) port we want connect to. May be
     * zero (0) if no right side server available.
     */
    conRightServerPort: 0,
    /**
     * {String} Right server(instance) IP address. Works in pair with
     * conRightServerPort
     */
    conRightServerIp: '127.0.0.1',
    /**
     * {Number} Left up server's (instance) port we want connect to. May be
     * zero (0) if no up side server available.
     */
    conUpServerPort: 0,
    /**
     * {String} Up server(instance) IP address. Works in pair with
     * conUpServerPort
     */
    conUpServerIp: '127.0.0.1',
    /**
     * {Number} Left down server's (instance) port we want connect to. May be
     * zero (0) if no down side server available.
     */
    conDownServerPort: 0,
    /**
     * {String} Down server(instance) IP address. Works in pair with
     * conDownServerPort
     */
    conDownServerIp: '127.0.0.1',
    /**
     * {Array} Array of included plugins
     */
    plugIncluded: [],
    /**
     * {Array} Array of excluded plugins. Affects plugIncluded list
     */
    plugExcluded: [],
    /**
     * {Boolean} Debug mode. This mode means, that all debug messages
     * will be posted to the terminal
     */
    modeDebug: false,
    /**
     * {Boolean} Testing mode. In this mode user may run jevo step by step
     * and test it'sinternal parts. For example, during unit tests
     */
    modeTest: false,
    /**
     * {Boolean} Is used for profiling the application with ProfileView
     * package. See run-profiling.sh for details
     */
    modeProfile: false,
    /**
     * {Number} Amount of iterations in profile mode after which ProfileView
     * package will draw performance flame chart
     */
    modeProfilePeriod: 2000,
    /**
     * {Number} Amount of seconds for status showing in terminal
     */
    modeStatusPeriod: 10.0,
    /**
     * {Boolean} In this mode status report will be short or full
     */
    modeStatusFull: false,
    /**
     * {Number} Mode for showing/supressing of messages. Possible values:
     *   0 - all messages
     *   1 - only important messages
     *   2 - no messages
     */
    modeQuiet: 1
};

/* harmony default export */ __webpack_exports__["a"] = (Config);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Config__ = __webpack_require__(0);
/**
 * Global helper class
 *
 * @author DeadbraiN
 */


class Helper {
    static posId(x, y) {
        return y * __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* default */].worldWidth + x;
    }
    /**
     * Overrides specified function in two ways: softly - by
     * calling new function and after that original; hardly - by
     * erasing old function by new one. It's still possible to
     * unoverride erasing by copy old function from fn.fn property.
     * @param {Object} obj Destination object, we want to override
     * @param {String} fnName Function name
     * @param {Function} fn Destination function
     * @param {Boolean} hard true - erase old function, false - call
     * new function and aol after that.
     */
    static override(obj, fnName, fn, hard = false) {
        fn.fn = obj[fnName];
        if (!hard) {
            obj[fnName] = (...args) => {
                fn.fn.apply(obj, args);
                return fn(...args);
            };
            return;
        }
        obj[fnName] = fn;
    }

    /**
     * Opposite to override. Removes overridden method.
     * @param {Object} obj Destination object, we want to override
     * @param {String} fnName Function name
     * @param {Function} fn Destination function
     */
    static unoverride(obj, fnName, fn) {
        obj[fnName] = fn.fn;
        delete fn.fn;
    }
    /**
     * Generates random Int number in range 0:n-1
     * @param {Number} n Right number value in a range
     * @return {Number}
     */
    static rand(n) {return Math.trunc(Math.random() * n);}
    /**
     * It calculates probability index from variable amount of components.
     * Let's imagine we have two actions: one and two. We want
     * these actions to be called randomly, but with different probabilities.
     * For example it may be [3,2]. It means that one should be called
     * in half cases, two in 1/3 cases. Probabilities should be greater then -1.
     * @param {Array} probs Probabilities array. e.g.: [3,2] or [1,3]
     * @return {Number} -1 Means that index is invalid
     */
    static probIndex(probs) {
        let len = probs.length;
        if (len < 1) {return -1;}
        let sum = probs.reduce((a, b) => a + b, 0);
        if (sum < 1) {return -1;}
        let num = Helper.rand(sum) + 1;
        let i;
        //
        // This is small optimization trick. if random number in
        // a left part of all numbers sum, the we have to go to it from
        // left to right, if not - then from right to left. Otherwise,
        // going every time from left to right will be a little bit
        // slower then this approach.
        //
        if (num < sum / 2) {
            sum = 0;
            for (i = 0; i < len; i++)  {if (num <= (sum += probs[i])) break;}
        } else {
            for (i = len-1; i>-1; i--) {if (num >  (sum -= probs[i])) break;}
        }

        return i;
    }
    /**
     * Checks if position is empty. x == y == 0 - this is empty
     * @param {Object} pos Position to check
     */
    static empty(pos) {return pos.x === 0 && pos.y === 0;}
    /**
     * Saves custom data into the file. If file exists, it will
     * be overrided. It's only rewrites existing file and not
     * append it. It also doesn't work with native types, in sense
     * that you can't save native values into the file without *
     * meta information. For example, you can't store ascii string
     * in a file without special prefic before it.
     * @param {Object} data Data to save
     * @param {String} file File name/Key name
     * TODO: FileApi should be used
     */
    static save(data, file = "backup.data") {
        localStorage[file] = JSON.stringify(data);
    }
   /**
    * Loads custom data from the file
    * @param file File name
    * @return {Object} loading result or nothing
    * TODO: FileApi should be used
    */
    static load(file = "backup.data") {
        return JSON.parse(localStorage[file]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Helper;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * List of all available event ids. New events should be added to
 * the end of the list.
 *
 * @author DeadbraiN
 * TODO: find unused and remove. But after main code is done.
 */
const Events = {
    YIELD: 1,
    ITERATION: 2,
    IPS: 3,
    REQUEST: 4,
    BACKUP: 5,
    YIELDTO: 6,
    ORGANISM: 7,
    GRAB_ENERGY: 8,
    UPDATE_ENERGY: 9,
    KILL_ORGANISM: 10,
    MUTATIONS: 11,
    CLONE: 12,
    EAT: 13,
    STEP: 17,
    EAT_ORGANISM: 21,
    EAT_ENERGY: 22,
    BORN_ORGANISM: 23,
    DOT_REQUEST: 24,
    STEP_YIELD: 25,
    BEFORE_RESPONSE: 26,
    AFTER_REQUEST: 27,
    GET_ENERGY: 28,
    PROP_LEFT: 29,
    PROP_RIGHT: 30,
    PROP_UP: 31,
    PROP_DOWN: 32,
    DOT: 33,
    MOVE: 34,
    GRAB_LEFT: 35,
    GRAB_RIGHT: 36,
    GRAB_UP: 37,
    GRAB_DOWN: 38,
    DESTROY: 39
};

/* harmony default export */ __webpack_exports__["a"] = (Events);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Observer implementation. May fire, listen(on()) and clear all the event
 * handlers
 *
 * Usage:
 *   import Events from '.../Events.js'
 *   let bus = new Observer();
 *   bus.on(Events.EVENT, () => console.log(arguments));
 *   bus.fire(Events.EVENT, 1, 2, 3);
 *
 * @author DeadbraiN
 */
class Observer {
    constructor() {
        this._handlers = {};
    }

    on (event, handler) {
        (this._handlers[event] || (this._handlers[event] = [])).push(handler);
    }

    off (event, handler) {
        let index;
        let handlers = this._handlers[event];

        if (typeof(handlers) === 'undefined' || (index = this._handlers[event].indexOf(handler)) < 0) {return false;}
        this._handlers[event].splice(index, 1);
        if (this._handlers[event].length === 0) {delete this._handlers[event];}

        return true;
    }

    fire (event, ...args) {
        let handler;
        let handlers = this._handlers[event];
        if (typeof(handlers) === 'undefined') {return false;}

        for (handler of handlers) {handler(...args);}

        return true;
    }

    clear () {
        this._handlers = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Observer;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Config__ = __webpack_require__(0);
/**
 * Class - helper for working with with byte code numbers
 *
 * @author DeadbraiN
 */



const BITS_PER_VAR        = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].codeBitsPerVar;
const BITS_PER_OPERATOR   = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].codeBitsPerOperator;
const NO_OPERATOR_MASK    = 0xffffffff >>> BITS_PER_OPERATOR;
const BITS_OF_TWO_VARS    = BITS_PER_VAR * 2;
const BITS_OF_FIRST_VAR   = 32 - BITS_PER_VAR;
const MAX_VAR             = 1 << BITS_PER_VAR;
const MAX_OPERATOR        = 1 << BITS_PER_OPERATOR;
const VAR_BITS_OFFS       = 32 - BITS_PER_OPERATOR;
const BITS_WITHOUT_2_VARS = 1 << (VAR_BITS_OFFS - BITS_PER_VAR * 2);

class Number {
    static get BITS_PER_VAR()        {return BITS_PER_VAR;}
    static get BITS_PER_OPERATOR()   {return BITS_PER_OPERATOR;}
    static get VARS()                {return (32 - BITS_PER_OPERATOR) / BITS_PER_VAR;}
    static get MAX_VAR()             {return MAX_VAR;}
    static get BITS_OF_TWO_VARS()    {return BITS_OF_TWO_VARS;}
    static get MAX_OPERATOR()        {return MAX_OPERATOR;}
    static get BITS_WITHOUT_2_VARS() {return BITS_WITHOUT_2_VARS;}

    /**
     * Sets amount of available operators for first bits
     * @param {Number} amount
     */
    static setOperatorAmount(amount) {
        this._operatorsCls = amount;
    }

    /**
     * We have to use >>> 0 at the end, because << operator works
     * with signed 32bit numbers, but not with unsigned like we need
     * @returns {number}
     */
    static get() {
        const rand = __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand;
        return (rand(this._operatorsCls) << (VAR_BITS_OFFS) | rand(NO_OPERATOR_MASK)) >>> 0;
    }

    static getOperator(num) {
        return num >>> VAR_BITS_OFFS;
    }

    static setOperator(num, op) {
        return (op << VAR_BITS_OFFS | (num & NO_OPERATOR_MASK)) >>> 0;
    }

    static getVar(num, index = 0) {
        return num << (BITS_PER_OPERATOR + index * BITS_PER_VAR) >>> BITS_OF_FIRST_VAR;
    }

    /**
     * Sets variable bits into value 'val' and returns updated full number.
     * Example: _setVar(0xaabbccdd, 2, 0x3) -> 0x
     * @param {Number} num Original number
     * @param {Number} index Variable index
     * @param {Number} val New variable value
     * @returns {Number}
     */
    static setVar(num, index, val) {
        const bits  = index * BITS_PER_VAR;
        const lBits = VAR_BITS_OFFS - bits;
        const rBits = BITS_PER_OPERATOR + bits + BITS_PER_VAR;

        return (num >>> lBits << lBits | val << (VAR_BITS_OFFS - bits - BITS_PER_VAR) | num << rBits >>> rBits) >>> 0;
    }

    /**
     * Returns specified bits from 32bit number. e.g.: getBits(0b11001100, 3, 2) -> 01
     * @param {Number} num
     * @param {Number} start first bit offset
     * @param {Number} len Amount of bits to get
     * @return {Number} Cut bits (number)
     */
    static getBits(num, start, len) {
        return num << start >>> (32 - len);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Number;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Config__ = __webpack_require__(0);
/**
 * Module for working with a browser console
 *
 * Usage:
 *   import Console from '.../Console';
 *   Console.msg('msg');
 *
 * @author DeadbraiN
 */


class Console {
    static error(...msg) {
        if (this._mode === __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* default */].QUIET_NO) {return;}
        console.log(`%c${msg.join('')}`, 'background: #fff; color: #aa0000');
    }
    static warn (...msg) {
        if (this._mode === __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* default */].QUIET_NO) {return;}
        console.log(`%c${msg.join('')}`, 'background: #fff; color: #cc7a00');
    }
    static info (...msg) {
        if (this._mode !== __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* default */].QUIET_ALL) {return;}
        console.log(`%c${msg.join('')}`, 'background: #fff; color: #1a1a00');
    }
    static mode (mode = __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* default */].QUIET_IMPORTANT) {this._mode = mode;}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Console;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Observer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Code__ = __webpack_require__(14);
/**
 * TODO: add description:
 * TODO:   - events
 * TODO:   -
 * @author DeadbraiN
 */






const IS_NUM = $.isNumeric;

class Organism extends __WEBPACK_IMPORTED_MODULE_1__global_Observer__["a" /* default */] {
    /**
     * Creates organism instance. If parent parameter is set, then
     * a clone of parent organism will be created.
     * @param {String} id Unique identifier of organism
     * @param {Number} x Unique X coordinate
     * @param {Number} y Unique Y coordinate
     * @param {Boolean} alive true if organism is alive
     * @param {Object} item Reference to the Queue item, where
     * this organism is located
     * @param {Function} codeEndCb Callback, which is called at the
     * end of every code iteration.
     * @param {Function} operatorsCls Organism's available operators class
     * @param {Organism} parent Parent organism if cloning is needed
     */
    constructor(id, x, y, alive, item, codeEndCb, operatorsCls, parent = null) {
        super();

        this._codeEndCb             = codeEndCb;
        this._operatorsCls          = operatorsCls;

        if (parent === null) {this._create();}
        else {this._clone(parent);}

        this._id                    = id;
        this._x                     = x;
        this._y                     = y;

        this._alive                 = alive;
        this._item                  = item;
        this._mutationProbs         = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgMutationProbs;
        this._mutationClonePercent  = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgCloneMutation;
        this._mutationPeriod        = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgRainMutationPeriod;
        this._mutationPercent       = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgRainMutationPercent;
        this._color                 = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgStartColor;
        this._iterations            = 0;
        this._cloneEnergyPercent    = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgCloneEnergyPercent;
        this._fnId                  = 0;
    }

    get id()                    {return this._id;}
    get x()                     {return this._x;}
    get y()                     {return this._y;}
    get alive()                 {return this._alive;}
    get item()                  {return this._item;}
    get mutationProbs()         {return this._mutationProbs;}
    get mutationPeriod()        {return this._mutationPeriod;}
    get mutationPercent()       {return this._mutationPercent;}
    get mutationClonePercent()  {return this._mutationClonePercent;}
    get adds()                  {return this._adds;}
    get changes()               {return this._changes;}
    get energy()                {return this._energy;}
    get color()                 {return this._color;}
    get mem()                   {return this._mem;}
    get cloneEnergyPercent()    {return this._cloneEnergyPercent;}
    get code()                  {return this._code;}
    get posId()                 {return __WEBPACK_IMPORTED_MODULE_3__global_Helper__["a" /* default */].posId(this._x, this._y);}
    get iterations()            {return this._iterations;}

    set x(newX)                 {this._x = newX;}
    set y(newY)                 {this._y = newY;}
    set mutationClonePercent(m) {this._mutationClonePercent = m;}
    set mutationPeriod(m)       {this._mutationPeriod = m;}
    set mutationPercent(p)      {this._mutationPercent = p;}
    set cloneEnergyPercent(p)   {this._cloneEnergyPercent = p;}
    set energy(e)               {this._energy = e;}
    set adds(a) {
        this._adds = a;
        this._updateColor();
    }
    set changes(c) {
        this._changes = c;
        this._updateColor();
    }

    /**
     * Runs one code iteration and returns
     * @return {Boolean} false means that organism was destroyed
     */
    run() {
        this._iterations++;
        this._code.run(this);
        return this._updateDestroy() && this._updateEnergy();
    }

    grabEnergy(amount) {
        if (!IS_NUM(amount)) {return true;}
        const noEnergy = (this._energy -= amount) < 1;
        noEnergy && this.destroy();
        return !noEnergy;
    }

    destroy() {
        this.fire(__WEBPACK_IMPORTED_MODULE_2__global_Events__["a" /* default */].DESTROY, this);
        this._alive     = false;
        this._energy    = 0;
        this._item      = null;
        this._mem       = null;
        this._code.destroy();
        this._code      = null;
        this._codeEndCb = null;
        this.clear();
    }

    _updateColor() {
        if ((this._color += this._adds * this._changes) > __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].ORG_MAX_COLOR) {
            this._color = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].ORG_FIRST_COLOR;
        }
    }

    _create() {
        this._code    = new __WEBPACK_IMPORTED_MODULE_4__Code__["a" /* default */](this._codeEndCb, this._operatorsCls, this);
        this._energy  = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgStartEnergy;
        this._mem     = [];
        this._adds    = 1;
        this._changes = 1;
    }

    _clone(parent) {
        this._code    = new __WEBPACK_IMPORTED_MODULE_4__Code__["a" /* default */](this._codeEndCb, this._operatorsCls, this, parent.code.vars);
        this._energy  = parent.energy;
        this._mem     = parent.mem.slice();
        this._adds    = parent.adds;
        this._changes = parent.changes;
        this._code.clone(parent.code);
    }

    /**
     * Checks if organism need to be killed/destroyed, because of age or zero energy
     * @return {Boolean} false means that organism was destroyed.
     * @private
     */
    _updateDestroy() {
        const alivePeriod = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgAlivePeriod;
        const needDestroy = this._energy < 1 || alivePeriod > 0 && this._iterations >= alivePeriod;

        needDestroy && this.destroy();

        return !needDestroy;
    }

    /**
     * This is how our system grabs an energy from organism if it's age is
     * divided into Config.orgEnergySpendPeriod.
     * @return {Boolean} false means that organism was destroyed.
     * @private
     */
    _updateEnergy() {
        if (__WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgEnergySpendPeriod === 0 || this._iterations % __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgEnergySpendPeriod !== 0) {return true;}
        const codeSize = this._code.size;
        let   grabSize = (((codeSize / __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].orgGarbagePeriod) + 0.5) << 1) >>> 1; // analog of Math.round(), but faster

        if (codeSize > __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].codeMaxSize) {grabSize = codeSize * __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].codeSizeCoef;}
        if (grabSize < 1) {grabSize = 1;}
        grabSize = Math.min(this._energy, grabSize);
        this.fire(__WEBPACK_IMPORTED_MODULE_2__global_Events__["a" /* default */].GRAB_ENERGY, grabSize);

        return this.grabEnergy(grabSize);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organism;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Observer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__visual_World__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__visual_Canvas__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_Organisms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_Mutator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_Energy__ = __webpack_require__(11);
/**
 * Main manager class of application. Contains all parts of jevo.js app
 * like World, Connection, Console etc... Runs infinite loop inside run()
 * method.
 *
 * Usage:
 *   import Manager from '.../Manager';
 *   const manager = new Manager();
 *   manager.run();
 *
 * @author DeadbraiN
 * TODO: what about destroy of manager instance? We have to destroy plugins
 * TODO: by calling of destroy() method for every of them
 */








/**
 * {Array} Plugins for Manager
 */
const PLUGINS = {
    Organisms: __WEBPACK_IMPORTED_MODULE_5__plugins_Organisms__["a" /* default */],
    Mutator  : __WEBPACK_IMPORTED_MODULE_6__plugins_Mutator__["a" /* default */],
    Energy   : __WEBPACK_IMPORTED_MODULE_7__plugins_Energy__["a" /* default */]
};

class Manager extends __WEBPACK_IMPORTED_MODULE_1__global_Observer__["a" /* default */] {
    /**
     * Is called on every iteration in main loop. May be overridden in plugins
     * @abstract
     */
    onIteration() {}

    /**
     * Is called at the end on move() method
     * @abstract
     */
    onAfterMove() {}

    constructor() {
        super();
        this._world     = new __WEBPACK_IMPORTED_MODULE_3__visual_World__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].worldWidth, __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].worldHeight);
        this._canvas    = new __WEBPACK_IMPORTED_MODULE_4__visual_Canvas__["a" /* default */]();
        this._plugins   = PLUGINS;
        this._stopped   = false;
        this.api        = {};

        this._initLoop();
        this._initPlugins();
        this._addHandlers();
    }

    get world()   {return this._world;}
    get canvas()  {return this._canvas;}
    get plugins() {return this._plugins;}

    /**
     * Runs main infinite loop of application
     */
    run () {
        let counter = 1;
        let timer   = Date.now;
        let stamp   = timer();
        let call    = this.zeroTimeout;
        let me      = this;

        function loop () {
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].codeIterationsPerOnce; i++) {
                me.onIteration(counter, stamp);

                counter++;
                stamp = timer();
            }
            call(loop);
        }
        call(loop);
    }

    stop() {
        this._stopped = true;
    }

    visualize(visualize) {
        this._canvas.visualize(visualize);
    }

    destroy() {
        const plugins = this._plugins;
        this._world.destroy();
        this._canvas.destroy();
        for (let p in plugins) {if (plugins.hasOwnProperty(p) && plugins[p].destroy) {plugins[p].destroy();}}
        this._plugins = null;
        this.clear();
    }

    move(x1, y1, x2, y2, org) {
        let moved = false;

        if (__WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].worldCyclical) {
            if (x2 < 0)                        {x2 = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].worldWidth - 1;}
            else if (x2 >= __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].worldWidth)  {x2 = 0;}
            else if (y2 < 0)                   {y2 = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].worldHeight - 1;}
            else if (y2 >= __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].worldHeight) {y2 = 0;}
        }
        if (this._isFree(x2, y2) === false) {return false;}

        if (x1 !== x2 || y1 !== y2) {moved = true; this._world.setDot(x1, y1, 0);}
        this._world.setDot(x2, y2, org.color);
        org.x = x2;
        org.y = y2;

        this.onAfterMove(x1, y1, x2, y2, org);

        return moved;
    }

    /**
     * This hacky function is obtained from here: https://dbaron.org/log/20100309-faster-timeouts
     * It runs a setTimeout() based infinite loop, but faster, then simply using native setTimeout().
     * See this article for details.
     * @return {Boolean} Initialization status. false if function has already exist
     * @private
     * @hack
     */
    _initLoop() {
        if (this.zeroTimeout) {return false;}
        //
        // Only add zeroTimeout to the Manager object, and hide everything
        // else in a closure.
        //
        (() => {
            let   callback;
            const msgName   = 'zm';

            window.addEventListener('message', (event) => {
                if (event.data === msgName) {
                    event.stopPropagation();
                    if (this._stopped) {
                        Console.warn('Manager has stopped');
                        return;
                    }
                    callback();
                }
            }, true);
            //
            // Like setTimeout, but only takes a function argument. There's
            // no time argument (always zero) and no arguments (you have to
            // use a closure).
            //
            this.zeroTimeout = (fn) => {
                callback = fn;
                window.postMessage(msgName, '*');
            };
        })();

        return true;
    }

    _initPlugins() {
        let plugins = this._plugins;
        for (let p in plugins) {
            plugins[p] = new plugins[p](this);
        }
    }

    _addHandlers() {
        this._world.on(__WEBPACK_IMPORTED_MODULE_2__global_Events__["a" /* default */].DOT, this._onDot.bind(this));
    }

    _onDot(x, y, color) {
        this._canvas.dot(x, y, color);
    }

    _isFree(x, y) {
        return this._world.getDot(x, y) === 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Manager;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manager_Manager__ = __webpack_require__(7);
/**
 * This is an entry point of jevo.js application. Compiled version of
 * this file should be included into index.html
 *
 * Usage:
 *   <script src="./app.js"></script>
 *
 * @author DeadbraiN
 */


const manager = new __WEBPACK_IMPORTED_MODULE_0__manager_Manager__["a" /* default */]();
window.man = manager;
manager.run();

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Implementation of two directional Queue. Queue is a list of connected
 * items, where you may iterate back and forward using internal references
 * (next, prev). Every item of the queue contains custom value (in
 * 'val' field). This queue is used for speeding up organisms iteration.
 *
 * @author DeadbraiN
 */
class Queue {
    /**
     * At least one object should exist to exclude check
     * of empty queue in add/del methods
     */
    constructor() {
        this._last = this._first = {
            prev: null,
            next: null,
            val : null
        };
        this._size = 0;
    }

    destroy() {
        this._first = null;
        this._last  = null;
        this._size  = 0;
    }

    get first() {return this._first;}
    get last()  {return this._last;}
    get size()  {return this._size;}

    /**
     * Wraps the value into item object and adds it to the end of the queue
     * @param {*} val Value for adding
     */
    add(val) {
        if (this._size++ > 0) {
            this._last = this._last.next = {
                prev: this._last,
                next: null,
                val : val
            };
            return;
        }

        this._first.val = val;
    }

    /**
     * Removes specified item from the queue. 'item' parameter is not
     * the same as value inside this item. Remember remove position may
     * be any in a queue.
     * @param {Object} item Item to remove
     */
    del(item) {
        if (--this._size < 1) {
            this._first.val = null;
            this._size = 0;
            return;
        }

        if (item.prev !== null) {item.prev.next = item.next;}
        else {this._first = item.next;}

        if (item.next !== null) {item.next.prev = item.prev;}
        else {this._last = item.prev;}
    }

    get(index) {
        let item = this._first;
        while (--index > -1 && item) {item = item.next;}
        return item;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Queue;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Console__ = __webpack_require__(5);
/**
 * Manager's plugin, which creates backups according to population age.
 *
 * Depends on:
 *   manager/plugins/Organisms
 *
 * @author DeadbraiN
 */




class Backup {
    constructor(orgs, world, positions) {
        this._orgs      = orgs;
        this._world     = world;
        this._positions = positions;
    }

    backup() {
        this._toLocalStorage(this._toJson(this._orgs, this._world));
        __WEBPACK_IMPORTED_MODULE_2__global_Console__["a" /* default */].info('Backup has created');
    }

    _toJson(orgs, world) {
        return {
            orgs  : this._getOrgs(orgs),
            energy: this._getEnergy(world)
        };
    }

    _getOrgs(orgs) {
        let cur  = orgs.first;
        let json = [];

        while (cur) {
            let org = cur.val;
            json.push({
                id                  : org.id,
                x                   : org.x,
                y                   : org.y,
                mutationProbs       : org.mutationProbs,
                mutationClonePercent: org.mutationClonePercent,
                mutationPeriod      : org.mutationPeriod,
                mutationPercent     : org.mutationPercent,
                color               : org.color,
                vars                : org.code.vars,
                code                : org.code.cloneByteCode()
            });
            cur = cur.next;
        }

        return json;
    }

    _getEnergy(world) {
        let dot;
        let positions = this._positions;
        let posId     = __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].posId;
        let energy    = [];

        for (let x = 0; x < __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldWidth; x++) {
            for (let y = 0; y < __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldHeight; y++) {
                dot = world.getDot(x, y);
                if (dot > 0 && positions[posId(x, y)] !== null) {
                    energy.push(x, y);
                }
            }
        }

        return energy;
    }

    _toLocalStorage(json) {
        // TODO: add other organism related properties saving
        // TODO: add removing of old backups
//        localStorage[`jjs-${Date.now()}`] = JSON.stringify({
//            world: this._manager.world.data,
//            orgs : this._getOrgsByteCode(orgs)
//        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Backup;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Console__ = __webpack_require__(5);
/**
 * Manager's plugin, which tracks amount of energy in a world and updates it.
 *
 * @author DeadbraiN
 */




class Energy {
    constructor(manager) {
        this._manager       = manager;
        this._checkPeriod   = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldEnergyCheckPeriod;
        this._onIterationCb = this._onIteration.bind(this);

        __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].override(manager, 'onIteration', this._onIterationCb);
    }

    destroy() {
        __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].unoverride(this._manager, 'onIteration', this._onIterationCb);
    }

    _onIteration(counter) {
        if (counter % this._checkPeriod === 0 && this._checkPeriod > 0) {
            let   energy = 0;
            const world  = this._manager.world;
            const width  = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldWidth;
            const height = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldHeight;

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    if (world.getDot(x, y) > 0) {energy++;}
                }
            }

            if (energy * 100 / (width * height) <= __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldEnergyCheckPercent) {
                this._updateEnergy(__WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldStartEnergyDots, __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldStartEnergyInDot);
            }
        }
    }

    _updateEnergy(dotAmount, energyInDot) {
        const world  = this._manager.world;
        const width  = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldWidth;
        const height = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldHeight;
        const rand   = __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand;

        __WEBPACK_IMPORTED_MODULE_2__global_Console__["a" /* default */].info('Creating random energy');
        for (let dot = 0; dot < dotAmount; dot++) {
            world.setDot(rand(width), rand(height), energyInDot);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Energy;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__organism_Organism__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__organism_Num__ = __webpack_require__(4);
/**
 * Plugin for Manager class, which is tracks when and how many mutations
 * should be added to special organism's code at special moment of it's
 * life.
 *
 * Depends on:
 *   manager/Manager
 *   manager/plugins/Organisms
 *
 * @author DeadbraiN
 */






class Mutator {
    constructor(manager) {
        this._manager = manager;
        this._MUTATION_TYPES = [
            this._onAdd,
            this._onChange,
            this._onDel,
            this._onSmallChange,
            this._onClone,
            this._onPeriod,
            this._onAmount,
            this._onProbs,
            this._onCloneEnergyPercent
        ]

        manager.on(__WEBPACK_IMPORTED_MODULE_0__global_Events__["a" /* default */].ORGANISM, this._onOrganism.bind(this));
        manager.on(__WEBPACK_IMPORTED_MODULE_0__global_Events__["a" /* default */].CLONE, this._onCloneOrg.bind(this));
    }

    destroy() {
    }

    _onOrganism(org) {
        if (__WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].orgRainMutationPeriod > 0 && org.mutationPeriod > 0 && org.iterations % org.mutationPeriod === 0) {
            this._mutate(org, false);
        }
    }

    _onCloneOrg(parent, child) {
        if (child.energy > 0) {this._mutate(child);}
    }

    _mutate(org, clone = true) {
        const code      = org.code;
        const probIndex = __WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].probIndex;
        const mTypes    = this._MUTATION_TYPES;
        let   mutations = Math.round(code.size * org.mutationPercent) || 1;
        let   type;

        for (let i = 0; i < mutations; i++) {
            type = code.size < 1 ? 0 : probIndex(org.mutationProbs);
            if (type === 0)      {org.adds++;}
            else if (type === 1) {org.changes++;}
            else if (type === 2) {org.changes += 0.5;}
            else if (type === 3) {org.adds--;}
            mTypes[type](org);
        }
        this._manager.fire(__WEBPACK_IMPORTED_MODULE_0__global_Events__["a" /* default */].MUTATIONS, org, mutations, clone);

        return mutations;
    }

    _onAdd(org) {
        org.code.insertLine();
    }

    _onChange(org) {
        const code = org.code;
        code.updateLine(__WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(code.size), __WEBPACK_IMPORTED_MODULE_4__organism_Num__["a" /* default */].get());
    }

    _onDel(org) {
        org.code.removeLine();
    }

    /**
     * Operator type or one variable may mutate
     * @param {Organism} org
     * @private
     */
    _onSmallChange(org) {
        const index = __WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(org.code.size);
        const code  = org.code;

        if (__WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(2) === 0) {
            code.updateLine(index, __WEBPACK_IMPORTED_MODULE_4__organism_Num__["a" /* default */].setOperator(code.getLine(index), __WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(code.operators)));
        } else {
            code.updateLine(index, __WEBPACK_IMPORTED_MODULE_4__organism_Num__["a" /* default */].setVar(code.getLine(index), __WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(__WEBPACK_IMPORTED_MODULE_4__organism_Num__["a" /* default */].VARS), __WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(__WEBPACK_IMPORTED_MODULE_4__organism_Num__["a" /* default */].MAX_VAR)));
        }
    }

    _onClone(org) {
        org.mutationClonePercent = Math.random();
    }

    _onPeriod(org) {
        org.mutationPeriod = __WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(__WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].ORG_MAX_MUTATION_PERIOD);
    }

    _onAmount(org) {
        org.mutationPercent = Math.random();
    }

    _onProbs(org) {
        org.mutationProbs[__WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(org.mutationProbs.length)] = __WEBPACK_IMPORTED_MODULE_2__global_Helper__["a" /* default */].rand(__WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].orgMutationProbsMaxValue);
    }

    _onCloneEnergyPercent(org) {
        org.cloneEnergyPercent = Math.random();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mutator;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Console__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_Events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_Queue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__organism_Organism__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__organism_Operators__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__organism_Code2String__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Backup__ = __webpack_require__(10);
/**
 * Plugin for Manager module, which handles organisms population
 *
 * Events od Manager:
 *   ORGANISM(org) Fires after one organism has processed
 *
 * Depends on:
 *   manager/Manager
 *
 * @author DeadbraiN
 */










class Organisms {
    constructor(manager) {
        this._orgs          = new __WEBPACK_IMPORTED_MODULE_4__global_Queue__["a" /* default */]();
        this._backup        = new __WEBPACK_IMPORTED_MODULE_8__Backup__["a" /* default */]();
        this._codeRuns      = 0;
        this._stamp         = Date.now();
        this._manager       = manager;
        this._positions     = {};
        this._orgId         = 0;
        this._code2Str      = new __WEBPACK_IMPORTED_MODULE_7__organism_Code2String__["a" /* default */]();
        this._onIterationCb = this._onIteration.bind(this);
        this._onAfterMoveCb = this._onAfterMove.bind(this);

        __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].override(manager, 'onIteration', this._onIterationCb);
        __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].override(manager, 'onAfterMove', this._onAfterMoveCb);
        //
        // API of the Manager for accessing outside. (e.g. from Console)
        //
        manager.api.formatCode = (code) => this._code2Str.format(code);
    }

    get orgs() {return this._orgs;}

    destroy() {
        __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].unoverride(man, 'onAfterMove', this._onAfterMoveCb);
        __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].unoverride(man, 'onIteration', this._onIterationCb);
        for (let org of this._orgs) {org.destroy();}
        this._orgs.destroy();
        this._orgs          = null;
        this._positions     = null;
        this._manager       = null;
        this._code2Str.destroy();
        this._code2Str      = null;
        this._onIterationCb = null;
        this._onAfterMoveCb = null;
    }

    /**
     * Override of Manager.onIteration() method. Is called on every
     * iteration of main loop. The counter is an analog of time.
     * @param {Number} counter Value of main loop counter.
     * @param {Number} stamp Time stamp of current iteration
     * @private
     */
    _onIteration(counter, stamp) {
        const man  = this._manager;
        let   item = this._orgs.first;
        let   org;

        while (item && (org = item.val)) {
            man.fire(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].ORGANISM, org);
            org.run();
            item = item.next;
        }

        this._updateClone(counter);
        this._updateCrossover(counter);
        this._updateCreate();
        this._updateIps(stamp);
        this._updateBackup(counter);
    }

    /**
     * Cloning parents are chosen according to tournament principle
     * @param {Number} counter Current counter
     * @returns {boolean}
     * @private
     */
    _updateClone(counter) {
        const orgs      = this._orgs;
        const orgAmount = orgs.size;
        const needClone = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].orgClonePeriod === 0 ? false : counter % __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].orgClonePeriod === 0;
        if (!needClone || orgAmount < 1 || orgAmount >= __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldMaxOrgs) {return false;}

        let org1 = orgs.get(__WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand(orgAmount)).val;
        let org2 = orgs.get(__WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand(orgAmount)).val;

        if (!org1.alive && !org2.alive) {return false;}
        if ((org2.alive && !org1.alive) || (org2.energy * org2.adds * org2.changes > org1.energy * org1.adds * org1.changes)) {
            [org1, org2] = [org2, org1];
        }
        if (org2.alive && orgAmount >= __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldMaxOrgs) {org2.destroy();}
        this._clone(org1);

        return true;
    }

    _updateCrossover(counter) {
        const orgs      = this._orgs;
        const orgAmount = orgs.size;
        const needCrossover = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].orgCrossoverPeriod === 0 ? false : counter % __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].orgCrossoverPeriod === 0;
        if (!needCrossover || orgAmount < 1 || orgAmount >= __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldMaxOrgs) {return false;}

        let org1   = this._tournament();
        let org2   = this._tournament();
        let winner = this._tournament(org1, org2);
        let looser = winner.id === org1.id ? org2 : org1;

        if (looser.alive && orgAmount < __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldMaxOrgs) {
            this._crossover(org1, org2);
        }

        return true;
    }

    _updateCreate() {
        if (this._orgs.size < 1) {
            this._createPopulation();
        }
    }

    _updateIps(stamp) {
        const ts   = stamp - this._stamp;
        if (ts < __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldIpsPeriodMs) {return;}
        const man  = this._manager;
        const orgs = this._orgs.size;
        let   ips  = this._codeRuns / orgs / (ts / 1000);
        const text = 'ips: ' + ips.toFixed(4);

        // TODO: these outputs should be moved to separate plugin
        man.canvas.text(5, 15, text);
        __WEBPACK_IMPORTED_MODULE_2__global_Console__["a" /* default */].warn(text);
        man.fire(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].IPS, ips);
        this._codeRuns = 0;
        this._stamp = stamp;
    }

    _updateBackup(counter) {
        if (counter % __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].backupPeriod !== 0 || __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].backupPeriod === 0) {return;}
        // TODO: done this
        //this._backup.backup(this._orgs);
    }

    _tournament(org1 = null, org2 = null) {
        const orgs      = this._orgs;
        const orgAmount = orgs.size;
        org1            = org1 || orgs.get(__WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand(orgAmount)).val;
        org2            = org2 || orgs.get(__WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand(orgAmount)).val;

        if (!org1.alive && !org2.alive) {return false;}
        if ((org2.alive && !org1.alive) || (org2.energy * org2.adds * org2.changes > org1.energy * org1.adds * org1.changes)) {
            return org2;
        }

        return org1;
    }

    _crossover(org1, org2) {
        this._clone(org1);
        let child = this._orgs.last.val;

        if (child.alive && org2.alive) {
            child.adds += child.code.crossover(org2.code);
        }
    }

    _clone(org) {
        if (org.energy < 1) {return false;}
        let pos = this._manager.world.getNearFreePos(org.x, org.y);
        if (pos === false || this._createOrg(pos, org) === false) {return false;}
        let child  = this._orgs.last.val;
        let energy = (((org.energy * org.cloneEnergyPercent) + 0.5) << 1) >>> 1; // analog of Math.round()

        org.grabEnergy(energy);
        child.grabEnergy(child.energy - energy);
        this._manager.fire(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].CLONE, org, child);

        return true;
    }

    _createPopulation() {
        const world = this._manager.world;

        this._orgId = 0;
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].orgStartAmount; i++) {
            this._createOrg(world.getFreePos());
        }
    }

    _onAfterMove(x1, y1, x2, y2, org) {
        if (x1 !== x2 || y1 !== y2) {
            delete this._positions[__WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].posId(x1, y1)];
            this._positions[__WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].posId(x2, y2)] = org;
        }

        return true;
    }

    _addHandlers(org) {
        org.on(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].DESTROY, this._onKillOrg.bind(this));
        org.on(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].GET_ENERGY, this._onGetEnergy.bind(this));
        org.on(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].EAT, this._onEat.bind(this));
        org.on(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].STEP, this._onStep.bind(this));
    }

    _onGetEnergy(org, x, y, ret) {
        if (x < 0 || y < 0 || !Number.isInteger(x) || !Number.isInteger(y)) {return;}
        const posId = __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].posId(x, y);

        if (typeof(this._positions[posId]) === 'undefined') {
            ret.ret = this._manager.world.getDot(x, y)
        } else {
            ret.ret = this._positions[posId].energy;
        }
    }

    _onEat(org, x, y, ret) {
        const world = this._manager.world;
        const positions = this._positions;

        if (__WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldCyclical) {
            if (x < 0)                        {x = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldWidth - 1;}
            else if (x >= __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldWidth)  {x = 0;}
            else if (y < 0)                   {y = __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldHeight - 1;}
            else if (y >= __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldHeight) {y = 0;}
        }

        const posId = __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].posId(x, y);
        if (typeof(positions[posId]) === 'undefined') {
            ret.ret = world.grabDot(x, y, ret.ret);
        } else {
            ret.ret = ret.ret < 0 ? 0 : (ret.ret > positions[posId].energy ? positions[posId].energy : ret.ret);
            positions[posId].grabEnergy(ret.ret);
        }
    }

    _onStep(org, x1, y1, x2, y2, ret) {
        if (org.alive) {
            ret.ret = +this._manager.move(x1, y1, x2, y2, org)
        }
    }

    _onCodeEnd() {
        this._codeRuns++;
    }

    _createOrg(pos, parent = null) {
        const orgs = this._orgs;
        if (orgs.size >= __WEBPACK_IMPORTED_MODULE_1__global_Config__["a" /* default */].worldMaxOrgs || pos === false) {return false;}
        orgs.add(null);
        let last   = orgs.last;
        let org    = new __WEBPACK_IMPORTED_MODULE_5__organism_Organism__["a" /* default */](++this._orgId + '', pos.x, pos.y, true, last, this._onCodeEnd.bind(this), __WEBPACK_IMPORTED_MODULE_6__organism_Operators__["a" /* default */], parent);

        last.val = org;
        this._addHandlers(org);
        this._manager.move(pos.x, pos.y, pos.x, pos.y, org);
        this._positions[org.posId] = org;
        this._manager.fire(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].BORN_ORGANISM, org);
        __WEBPACK_IMPORTED_MODULE_2__global_Console__["a" /* default */].info(org.id, ' born');

        return true;
    }

    _onKillOrg(org) {
        this._orgs.del(org.item);
        this._manager.world.setDot(org.x, org.y, 0);
        delete this._positions[org.posId];
        this._manager.fire(__WEBPACK_IMPORTED_MODULE_3__global_Events__["a" /* default */].KILL_ORGANISM, org);
        __WEBPACK_IMPORTED_MODULE_2__global_Console__["a" /* default */].info(org.id, ' die');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organisms;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Observer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Num__ = __webpack_require__(4);
/**
 * Implements organism's code logic.
 * TODO: explain here code one number format,...
 *
 * @author DeadbraiN
 * TODO: may be this module is redundant
 * TODO: think about custom operators callbacks from outside. This is how
 * TODO: we may solve custom tasks
 */





class Code extends __WEBPACK_IMPORTED_MODULE_2__global_Observer__["a" /* default */] {
    constructor(codeEndCb, operatorsCls, org, vars = null) {
        super();

        /**
         * {Function} Callback, which is called on every organism
         * code iteration. On it's end.
         */
        this._onCodeEnd = codeEndCb;
        /**
         * {Array} Array of two numbers. first - line number where we have
         * to return if first line appears. second - line number, where ends
         * closing block '}' of for or if operator.
         */
        this._offsets   = [];
        this._vars      = vars || this._getVars();
        /**
         * {Array} Array of offsets for closing braces. For 'for', 'if'
         * and all block operators.
         */
        this._operators = new operatorsCls(this._offsets, this._vars, org);
        this._code      = [];
        this._line      = 0;
    }

    get code() {return this._code;}
    get size() {return this._code.length;}
    get operators() {return this._operators.size;};
    get vars() {return this._vars;}

    run(param) {
        let line  = this._line;
        let len   = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].codeYieldPeriod;
        let ops   = this._operators.operators;
        let code  = this._code;
        let lines = code.length;
        let getOp = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].getOperator;
        let ret   = false;
        let offs  = this._offsets;

        while (lines > 0 && len-- > 0) {
            line = ops[getOp(code[line])](code[line], line, param, lines, ret);

            if (ret = (offs.length > 0 && line === offs[offs.length - 1])) {
                offs.pop();
                line = offs.pop();
                continue;
            }
            if (line >= lines) {
                line = 0;
                this._offsets.length = 0;
                this._onCodeEnd();
            }
        }

        this._line = line;
    }

    destroy() {
        this._operators.destroy();
        this._operators = null;
        this._vars      = null;
        this._code      = null;
        this._onCodeEnd = null;
        this.clear();
    }

    /**
     * Clones both byte and string code from 'code' argument
     * @param {Code} code Source code, from which we will copy
     */
    // TODO: do we need this?
    clone(code) {
        this._code = code.cloneCode();
    }

    crossover(code) {
        const rand   = __WEBPACK_IMPORTED_MODULE_1__global_Helper__["a" /* default */].rand;
        const len    = this._code.length;
        const len1   = code.code.length;
        let   start  = rand(len);
        let   end    = rand(len);
        let   start1 = rand(len1);
        let   end1   = rand(len1);

        if (start > end) {[start, end] = [end, start];}
        if (start1 > end1) {[start1, end1] = [end1, start1];}

        this._code.splice.apply(this._code, [start, end - start].concat(code.code.slice(start1, end1)));
        this._reset();

        return end1 - start1 - end + start;
    }

    /**
     * Is used for cloning byte code only. This is how you
     * can get separate copy of the byte code.
     * @return {Array} Array of 32bit numbers
     */
    cloneCode() {
        return this._code.slice();
    }

    /**
     * Inserts random generated number into the byte code at random position
     */
    insertLine() {
        this._code.splice(__WEBPACK_IMPORTED_MODULE_1__global_Helper__["a" /* default */].rand(this._code.length), 0, __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].get());
        this._reset();
    }

    updateLine(index, number) {
        this._code[index] = number;
        this._reset();
    }

    /**
     * Removes random generated number into byte code at random position
     */
    removeLine() {
        this._code.splice(__WEBPACK_IMPORTED_MODULE_1__global_Helper__["a" /* default */].rand(this._code.length), 1);
        this._reset();
    }

    getLine(index) {
        return this._code[index];
    }

    _reset() {
        this._line           = 0;
        this._offsets.length = 0;
    }

    /**
     * Generates default variables code. It should be in ES5 version, because
     * speed is important. Amount of vars depends on Config.codeVarAmount config.
     * @returns {Array} vars code
     * @private
     */
    _getVars() {
        if (this._vars && this._vars.length > 0) {return this._vars;}

        const len    = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].codeVarAmount;
        let   vars   = new Array(len);
        const range  = __WEBPACK_IMPORTED_MODULE_0__global_Config__["a" /* default */].codeVarInitRange;
        const range2 = range / 2;
        const rand   = __WEBPACK_IMPORTED_MODULE_1__global_Helper__["a" /* default */].rand;

        for (let i = 0; i < len; i++) {
            vars[i] = rand(range) - range2;
        }

        return (this._vars = vars);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Code;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Num__ = __webpack_require__(4);
/**
 * This class is used only for code visualization in readable human like form.
 * It converts numeric based byte code into JS string. This class must be
 * synchronized with 'Operators' one.
 *
 * @author DeadbraiN
 */



/**
 * {Function} Just a shortcuts
 */
const VAR0                  = __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].getVar;
const VAR1                  = (n) => __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].getVar(n, 1);
const VAR2                  = (n) => __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].getVar(n, 2);
const BITS_AFTER_THREE_VARS = __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].BITS_PER_OPERATOR + __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].BITS_PER_VAR * 3;
const HALF_OF_VAR           = __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].MAX_VAR / 2;

class Code2String {
    constructor() {
        /**
         * {Array} Array of offsets for closing braces. For 'for', 'if'
         * and all block operators.
         */
        this._offsets = [];
        /**
         * {Object} These operator handlers should return string representation
         * of numeric based byte code.
         */
        this._OPERATORS_CB = {
            0 : this._onVar.bind(this),
            //1: this._onFunc.bind(this),
            1 : this._onCondition.bind(this),
            2 : this._onLoop.bind(this),
            3 : this._onOperator.bind(this),
            4 : this._onNot.bind(this),
            5 : this._onPi.bind(this),
            6 : this._onTrig.bind(this),
            7 : this._onLookAt.bind(this),
            8 : this._onEatLeft.bind(this),
            9 : this._onEatRight.bind(this),
            10: this._onEatUp.bind(this),
            11: this._onEatDown.bind(this),
            12: this._onStepLeft.bind(this),
            13: this._onStepRight.bind(this),
            14: this._onStepUp.bind(this),
            15: this._onStepDown.bind(this),
            16: this._onFromMem.bind(this),
            17: this._onToMem.bind(this),
            18: this._onMyX.bind(this),
            19: this._onMyY.bind(this)
        };
        this._OPERATORS_CB_LEN = Object.keys(this._OPERATORS_CB).length;
        /**
         * {Array} Available conditions for if operator. Amount should be
         * the same like (1 << BITS_PER_VAR)
         */
        this._CONDITIONS = ['<', '>', '==', '!='];
        /**
         * {Array} Available operators for math calculations
         */
        this._OPERATORS = [
            '+', '-', '*', '/', '%', '&', '|', '^', '>>', '<<', '>>>', '<', '>', '==', '!=', '<='
        ];
        this._TRIGS = ['sin', 'cos', 'tan', 'abs'];

        __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].setOperatorAmount(this._OPERATORS_CB_LEN);
    }

	destroy() {
        this._offsets = null;
	}

    format(code, separator = '\n') {
        const len       = code.length;
        const operators = this._OPERATORS_CB;
        let   codeArr   = new Array(len);
        let   offsets   = this._offsets;
        let   operator;

        for (let i = 0; i < len; i++) {
            operator = operators[__WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].getOperator(code[i])](code[i], i, len);
            //
            // This code is used for closing blocks for if, for and other
            // blocked operators.
            //
            if (offsets[offsets.length - 1] === i && offsets.length > 0) {
                operator = operator + '}';
                offsets.pop();
            }
            codeArr[i] = operator;
        }
        if (offsets.length > 0) {
            codeArr[codeArr.length - 1] += ('}'.repeat(offsets.length));
            offsets.length = 0;
        }

        return js_beautify(codeArr.join(separator), {indent_size: 4});
    }

    /**
     * Parses variable operator. Format: let = const|number. Num bits format:
     *   BITS_PER_OPERATOR bits - operator id
     *   BITS_PER_VAR bits  - destination var index
     *   BITS_PER_VAR bits  - assign type (const (half of bits) or variable (half of bits))
     *   BITS_PER_VAR bits  - variable index or all bits till the end for constant
     *
     * @param {Num} num Packed into number code line
     * @return {String} Parsed code line string
     */
    _onVar(num) {
        const var1    = VAR1(num);
        const isConst = var1 >= HALF_OF_VAR;

        return `v${VAR0(num)}=${isConst ? __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand(__WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].BITS_WITHOUT_2_VARS) : ('v' + var1)}`;
    }

    _onFunc(num) {
        return '';
    }

    _onCondition(num, line, lines) {
        const var3    = __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].getBits(num, BITS_AFTER_THREE_VARS, __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].BITS_OF_TWO_VARS);
        this._offsets.push(line + var3 < lines ? line + var3 : lines - 1);
        return `if(v${VAR0(num)}${this._CONDITIONS[VAR2(num)]}v${VAR1(num)}){`;
    }

    _onLoop(num, line, lines) {
        const var0    = VAR0(num);
        const var3    = __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].getBits(num, BITS_AFTER_THREE_VARS, __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].BITS_OF_TWO_VARS);
        const index   = line + var3 < lines ? line + var3 : lines - 1;

        this._offsets.push(index);
        return `for(v${var0}=v${VAR1(num)};v${var0}<v${VAR2(num)};v${var0}++){`;
    }

    _onOperator(num) {
        return `v${VAR0(num)}=v${VAR1(num)}${this._OPERATORS[__WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].getBits(num, BITS_AFTER_THREE_VARS, __WEBPACK_IMPORTED_MODULE_1__Num__["a" /* default */].BITS_OF_TWO_VARS)]}v${VAR2(num)}`;
    }

    _onNot(num) {
        return `v${VAR0(num)}=+!v${VAR1(num)}`;
    }

    _onPi(num) {
        return `v${VAR0(num)}=Math.PI`;
    }

    _onTrig(num) {
        return `v${VAR0(num)}=Math.${this._TRIGS[VAR2(num)]}(v${VAR1(num)})`;
    }

    _onLookAt(num) {
        return `v${VAR0(num)}=org.lookAt(v${VAR1(num)},v${VAR2(num)})`;
    }

    _onEatLeft(num) {
        return `v${VAR0(num)}=org.eatLeft(v${VAR1(num)})`;
    }

    _onEatRight(num) {
        return `v${VAR0(num)}=org.eatRight(v${VAR1(num)})`;
    }

    _onEatUp(num) {
        return `v${VAR0(num)}=org.eatUp(v${VAR1(num)})`;
    }

    _onEatDown(num) {
        return `v${VAR0(num)}=org.eatDown(v${VAR1(num)})`;
    }

    _onStepLeft(num) {
        return `v${VAR0(num)}=org.stepLeft()`;
    }

    _onStepRight(num) {
        return `v${VAR0(num)}=org.stepRight()`;
    }

    _onStepUp(num) {
        return `v${VAR0(num)}=org.stepUp()`;
    }

    _onStepDown(num) {
        return `v${VAR0(num)}=org.stepDown()`;
    }

    _onFromMem(num) {
        return `v${VAR0(num)}=org.fromMem()`;
    }

    _onToMem(num) {
        return `v${VAR0(num)}=org.toMem(v${VAR1(num)})`;
    }

    _onMyX(num) {
        return `v${VAR0(num)}=org.myX()`;
    }

    _onMyY(num) {
        return `v${VAR0(num)}=org.myY()`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Code2String;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Num__ = __webpack_require__(4);
/**
 * This file contains all available operators implementation. For example:
 * for, if, variable declaration, steps, eating etc... User may override
 * this class for own needs and change operator list to custom.
 *
 * @author DeadbraiN
 */





/**
 * {Function} Just a shortcuts
 */
const VAR0                  = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].getVar;
const VAR1                  = (n) => __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].getVar(n, 1);
const VAR2                  = (n) => __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].getVar(n, 2);
const BITS_AFTER_THREE_VARS = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].BITS_PER_OPERATOR + __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].BITS_PER_VAR * 3;
const BITS_WITHOUT_2_VARS   = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].BITS_WITHOUT_2_VARS;
const BITS_OF_TWO_VARS      = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].BITS_OF_TWO_VARS;
const IS_NUM                = $.isNumeric;
const HALF_OF_VAR           = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].MAX_VAR / 2;

class Operators {
    constructor(offsets, vars, obs) {
        /**
         * {Array} Array of offsets for closing braces. For 'for', 'if'
         * and all block operators.
         */
        this._offsets = offsets;
        /**
         * {Array} Available variables
         */
        this._vars = vars;
        /**
         * {Observer} Observer for sending events outside of the code
         */
        this._obs = obs;
        /**
         * {Object} These operator handlers should return string, which
         * will be added to the final string script for evaluation.
         */
        this._OPERATORS_CB = {
            0 : this.onVar.bind(this),
            //1: this.onFunc.bind(this),
            1 : this.onCondition.bind(this),
            2 : this.onLoop.bind(this),
            3 : this.onOperator.bind(this),
            4 : this.onNot.bind(this),
            5 : this.onPi.bind(this),
            6 : this.onTrig.bind(this),
            7 : this.onLookAt.bind(this),
            8 : this.onEatLeft.bind(this),
            9 : this.onEatRight.bind(this),
            10: this.onEatUp.bind(this),
            11: this.onEatDown.bind(this),
            12: this.onStepLeft.bind(this),
            13: this.onStepRight.bind(this),
            14: this.onStepUp.bind(this),
            15: this.onStepDown.bind(this),
            16: this.onFromMem.bind(this),
            17: this.onToMem.bind(this),
            18: this.onMyX.bind(this),
            19: this.onMyY.bind(this)
        };
        this._OPERATORS_CB_LEN = Object.keys(this._OPERATORS_CB).length;
        /**
         * {Array} Available conditions for if operator. Amount should be
         * the same like (1 << BITS_PER_VAR)
         */
        this._CONDITIONS = [(a,b)=>a<b, (a,b)=>a>b, (a,b)=>a==b, (a,b)=>a!=b];
        /**
         * {Array} Available operators for math calculations
         */
        this._OPERATORS = [
            (a,b)=>a+b, (a,b)=>a-b, (a,b)=>a*b, (a,b)=>a/b, (a,b)=>a%b, (a,b)=>a&b, (a,b)=>a|b, (a,b)=>a^b, (a,b)=>a>>b, (a,b)=>a<<b, (a,b)=>a>>>b, (a,b)=>+(a<b), (a,b)=>+(a>b), (a,b)=>+(a==b), (a,b)=>+(a!=b), (a,b)=>+(a<=b)
        ];
        this._TRIGS = [(a)=>Math.sin(a), (a)=>Math.cos(a), (a)=>Math.tan(a), (a)=>Math.abs(a)];

        __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].setOperatorAmount(this._OPERATORS_CB_LEN);
    }

    destroy() {
        this._offsets      = null;
        this._OPERATORS_CB = null;
        this._CONDITIONS   = null;
        this._OPERATORS    = null;
        this._TRIGS        = null;
    }

    get operators() {return this._OPERATORS_CB;}
    get size()      {return this._OPERATORS_CB_LEN;}

    /**
     * Parses variable operator. Format: let = const|number. Num bits format:
     *   BITS_PER_OPERATOR bits - operator id
     *   BITS_PER_VAR bits  - destination var index
     *   BITS_PER_VAR bits  - assign type (const (half of bits) or variable (half of bits))
     *   BITS_PER_VAR bits  - variable index or all bits till the end for constant
     *
     * @param {Num} num Packed into number code line
     * @param {Number} line Current line in code
     * @return {Number} Parsed code line string
     */
    onVar(num, line) {
        const vars = this._vars;
        const var1 = VAR1(num);
        vars[VAR0(num)] = var1 >= HALF_OF_VAR ? __WEBPACK_IMPORTED_MODULE_0__global_Helper__["a" /* default */].rand(BITS_WITHOUT_2_VARS) : vars[var1];

        return line + 1;
    }

    onFunc(num, line) {
        return line + 1;
    }

    onCondition(num, line, org, lines) {
        const val3 = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].getBits(num, BITS_AFTER_THREE_VARS, BITS_OF_TWO_VARS);
        const offs = line + val3 < lines ? line + val3 + 1 : lines;

        if (this._CONDITIONS[VAR2(num)](this._vars[VAR0(num)], this._vars[VAR1(num)])) {
            return line + 1;
        }

        return offs;
    }

    onLoop(num, line, org, lines, ret) {
        const vars = this._vars;
        const var0 = VAR0(num);
        const val3 = __WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].getBits(num, BITS_AFTER_THREE_VARS, BITS_OF_TWO_VARS);
        const offs = line + val3 < lines ? line + val3 + 1 : lines;

        if (ret) {
            if (++vars[var0] < vars[VAR2(num)]) {
                this._offsets.push(line, offs);
                return line + 1;
            }
            return offs;
        }

        vars[var0] = vars[VAR1(num)];
        if (vars[var0] < vars[VAR2(num)]) {
            this._offsets.push(line, offs);
            return line + 1;
        }

        return offs;
    }

    onOperator(num, line) {
        const vars = this._vars;
        vars[VAR0(num)] = this._OPERATORS[__WEBPACK_IMPORTED_MODULE_3__Num__["a" /* default */].getBits(num, BITS_AFTER_THREE_VARS, BITS_OF_TWO_VARS)](vars[VAR1(num)], vars[VAR2(num)]);
        return line + 1;
    }

    onNot(num, line) {
        this._vars[VAR0(num)] = +!this._vars[VAR1(num)];
        return line + 1;
    }

    onPi(num, line) {
        this._vars[VAR0(num)] = Math.PI;
        return line + 1;
    }

    onTrig(num, line) {
        this._vars[VAR0(num)] = this._TRIGS[VAR2(num)](this._vars[VAR1(num)]);
        return line + 1;
    }

    onLookAt(num, line, org) {
        const vars = this._vars;
        let   x    = vars[VAR1(num)];
        let   y    = vars[VAR2(num)];
        if (!IS_NUM(x) || !IS_NUM(y) || x < 0 || y < 0 || x >= __WEBPACK_IMPORTED_MODULE_2__global_Config__["a" /* default */].worldWidth || y >= __WEBPACK_IMPORTED_MODULE_2__global_Config__["a" /* default */].worldHeight) {return line + 1;}

        let ret = {ret: 0};
        this._obs.fire(__WEBPACK_IMPORTED_MODULE_1__global_Events__["a" /* default */].GET_ENERGY, org, x, y, ret);
        vars[VAR0(num)] = ret.ret;

        return line + 1;
    }

    onEatLeft(num, line, org)   {this._vars[VAR0(num)] = this._eat(org, num, org.x - 1, org.y); return line + 1}
    onEatRight(num, line, org)  {this._vars[VAR0(num)] = this._eat(org, num, org.x + 1, org.y); return line + 1}
    onEatUp(num, line, org)     {this._vars[VAR0(num)] = this._eat(org, num, org.x, org.y - 1); return line + 1}
    onEatDown(num, line, org)   {this._vars[VAR0(num)] = this._eat(org, num, org.x, org.y + 1); return line + 1}

    onStepLeft(num, line, org)  {this._vars[VAR0(num)] = this._step(org, org.x, org.y, org.x - 1, org.y); return line + 1}
    onStepRight(num, line, org) {this._vars[VAR0(num)] = this._step(org, org.x, org.y, org.x + 1, org.y); return line + 1}
    onStepUp(num, line, org)    {this._vars[VAR0(num)] = this._step(org, org.x, org.y, org.x, org.y - 1); return line + 1}
    onStepDown(num, line, org)  {this._vars[VAR0(num)] = this._step(org, org.x, org.y, org.x, org.y + 1); return line + 1}

    onFromMem(num, line, org) {this._vars[VAR0(num)] = org.mem.pop() || 0; return line + 1}
    onToMem(num, line, org) {
        const val = this._vars[VAR1(num)];

        if (IS_NUM(val) && org.mem.length < __WEBPACK_IMPORTED_MODULE_2__global_Config__["a" /* default */].orgMemSize) {
            org.mem.push(val);
            this._vars[VAR0(num)] = val;
        } else {
            this._vars[VAR0(num)] = 0;
        }

        return line + 1;
    }

    onMyX(num, line, org) {this._vars[VAR0(num)] = org.x; return line + 1}
    onMyY(num, line, org) {this._vars[VAR0(num)] = org.y; return line + 1;}

    _eat(org, num, x, y) {
        const vars   = this._vars;
        const amount = vars[VAR1(num)];
        if (!IS_NUM(amount)) {return 0}

        let ret = {ret: amount};
        this._obs.fire(__WEBPACK_IMPORTED_MODULE_1__global_Events__["a" /* default */].EAT, org, x, y, ret);
        if (!IS_NUM(ret.ret)) {return 0}
        org.energy += ret.ret;
        return ret.ret;
    }

    _step(org, x1, y1, x2, y2) {
        let ret = {ret: 0};
        this._obs.fire(__WEBPACK_IMPORTED_MODULE_1__global_Events__["a" /* default */].STEP, org, x1, y1, x2, y2, ret);
        return ret.ret;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Operators;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Canvas implementation with minimum logic for drawing colored dots.
 *
 * @author DeadbraiN
 */
class Canvas {
    constructor() {
        const bodyEl = $('body');

        this._prepareDom();

        this._width     = bodyEl.width();
        this._height    = bodyEl.height();
        this._canvasEl  = bodyEl.append('<canvas id="world" width="' + this._width + '" height="' + this._height + '"></canvas>').find('#world');
        this._ctx       = this._canvasEl[0].getContext('2d');
        this._text      = {x: 0, y: 0, t: ''};
        this._imgData   = this._ctx.createImageData(this._width, this._height);
        this._data      = this._imgData.data;
        this._animate   = this._onAnimate.bind(this);
        this._visualize = true;

        this._ctx.font = "13px Consolas";
        this._ctx.fillStyle = "white";
        this.clear();
        window.requestAnimationFrame(this._animate);
    }

    destroy() {
        this._canvasEl.empty();
        this._ctx     = null;
        this._imgData = null;
        this._data    = null;
    }

    visualize(visualize = true) {
        this._visualize = visualize;
        this._onAnimate();
    }

    text(x, y, text) {
        const t = this._text;

        t.t = text;
        t.x = x;
        t.y = y;
    }

    dot(x, y, color) {
        this._dot(x, y, color);
    }

    /**
     * Clears canvas with black color
     */
    clear() {
        const size = this._width * this._height * 4;
        const data = this._data;

        for (let i = 0; i < size; i += 4) {
            data[i + 3] = 0xff;
        }
    }

    /**
     * Sets pixel to specified color with specified coordinates.
     * Color should contain red, green and blue components in one
     * decimal number. For example: 16777215 is #FFFFFF - white.
     * In case of invalid coordinates 0 value for x, color and y will
     * be used.
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Number} color Decimal color
     */
    _dot(x, y, color) {
        const data = this._data;
        const offs = (y * this._width + x) * 4;

        data[offs    ] = (color >> 16) & 0xff;
        data[offs + 1] = (color >> 8)  & 0xff;
        data[offs + 2] = color & 0xff;
    }

    _onAnimate() {
        const text = this._text;

        this._ctx.putImageData(this._imgData, 0, 0);
        this._ctx.fillText(text.t, text.x, text.y);

        if (this._visualize === true) {
            window.requestAnimationFrame(this._animate);
        }
    }

    _prepareDom() {
        $('body')
            .width('100%')
            .height('100%')
            .css('margin', 0)
        .parent()
            .width('100%')
            .height('100%')
            .css('margin', 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_Observer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_Events__ = __webpack_require__(2);
/**
 * 2D space, where all organisms are live. In reality this is
 * just a peace of memory, where all organisms are located. It
 * doesn't contain organisms codes, only rectangular with points.
 * It's possible to run our application only in memory. In this
 * case only this 2D world will be used (without visual
 * presentation)
 *
 * Usage:
 *   import World from '.../World';
 *   let world = new World(100, 100);
 *   world.setDot(50, 50, 0xFF00AA);
 *   world.getDot(50, 50); // 0xFF00AA
 *
 * Events:
 *   dot(x,y,color) Fires if one dot in a worlds field changed it's color
 *
 * @author DeadbraiN
 */




class World extends __WEBPACK_IMPORTED_MODULE_0__global_Observer__["a" /* default */] {
    constructor (width, height) {
        super();
        this._data   = [];
        this._width  = width;
        this._height = height;

        for (let x = 0; x < width; x++) {
            this._data[x] = (new Array(height)).fill(0);
        }
    }

    get data() {return this._data;}

    destroy() {
        this.clear();
        this._data   = null;
        this._width  = 0;
        this._height = 0;
    }

    setDot(x, y, color) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {return false;}
        this._data[x][y] = color;
        this.fire(__WEBPACK_IMPORTED_MODULE_2__global_Events__["a" /* default */].DOT, x, y, color);

        return true;
    }

    getDot(x, y) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {return false;}
        return this._data[x][y];
    }

    grabDot(x, y, amount) {
        let dot = Math.min(this.getDot(x, y), amount);

        if (dot > 0) {
            this.fire(__WEBPACK_IMPORTED_MODULE_2__global_Events__["a" /* default */].DOT, x, y, (this._data[x][y] -= dot));
        }

        return dot;
    }

    getFreePos() {
        const rand   = __WEBPACK_IMPORTED_MODULE_1__global_Helper__["a" /* default */].rand;
        const width  = this._width;
        const height = this._height;
        let   x      = Math.ceil(width / 2);
        let   y      = Math.ceil(height / 2);
        let   i      = width * height < 1000 ? 100 : width * height / 10;

        while (this.getDot(x, y) > 0 && i > 0) {
            x = rand(width);
            y = rand(height);
            i -= 1;
        }

        return i > 0 ? {x: x, y: y} : false
    }

    getNearFreePos(x, y) {
        const positions = [
            x + 1, y,     // right
            x + 1, y + 1, // right down
            x    , y + 1, // down
            x - 1, y + 1, // down left
            x - 1, y,     // left
            x - 1, y - 1, // left up
            x    , y - 1, // up
            x + 1, y - 1  // up right
        ];

        for (let i = 0, j = 0; i < 8; i++) {
            x = positions[j];
            y = positions[j + 1];
            if (this.getDot(x, y) === 0) {return {x: x, y: y};}
            j += 2;
        }

        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = World;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map