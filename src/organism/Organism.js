/**
 * TODO: add description:
 * TODO:   - events
 * TODO:   -
 * @author DeadbraiN
 */
import {Config}       from './../global/Config';
import Observer       from './../global/Observer';
import {EVENTS}       from './../global/Events';
import {EVENT_AMOUNT} from './../global/Events';
import Helper         from './../global/Helper';
import JSVM           from './JSVM';

const IS_NUM = $.isNumeric;

export default class Organism extends Observer {
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
     * @param {Object} classMap Available classes map. Maps class names into
     * classe functions
     * @param {Organism} parent Parent organism if cloning is needed
     */
    constructor(id, x, y, alive, item, codeEndCb, classMap, parent = null) {
        super(EVENT_AMOUNT);

        this._jsvmEndCb   = codeEndCb;
        this._classMap    = classMap;

        if (parent === null) {this._create();}
        else {this._clone(parent);}

        this._id          = id;
        this._x           = x;
        this._y           = y;
        this._changes     = 1;
        this._alive       = alive;
        this._item        = item;
        this._iterations  = 0;
        this._fnId        = 0;
        this._fitnessMode = Config.codeFitnessCls !== null;
        if (this._fitnessMode) {
            this._needRun = true;
        }

        this._jsvm.on(EVENTS.RESET_CODE, this._onResetCode.bind(this));
    }

    get id()                    {return this._id}
    get x()                     {return this._x}
    get y()                     {return this._y}
    get alive()                 {return this._alive}
    get item()                  {return this._item}
    get mutationProbs()         {return this._mutationProbs}
    get mutationPeriod()        {return this._mutationPeriod}
    get mutationPercent()       {return this._mutationPercent}
    get cloneMutationPercent()  {return this._cloneMutationPercent}
    get changes()               {return this._changes}
    get energy()                {return this._energy}
    get color()                 {return this._color}
    get mem()                   {return this._mem}
    get cloneEnergyPercent()    {return this._cloneEnergyPercent}
    get jsvm()                  {return this._jsvm}
    get posId()                 {return Helper.posId(this._x, this._y)}
    get iterations()            {return this._iterations}

    set x(newX)                 {this._x = newX}
    set y(newY)                 {this._y = newY}
    set cloneMutationPercent(m) {this._cloneMutationPercent = m}
    set mutationPeriod(m)       {this._mutationPeriod = m}
    set mutationPercent(p)      {this._mutationPercent = p}
    set cloneEnergyPercent(p)   {this._cloneEnergyPercent = p}
    set energy(e)               {this._energy = e}
    set changes(c) {
        this._changes = c;
        this._updateColor(c);
    }

    /**
     * Runs one code iteration and returns
     * @return {Boolean} false means that organism was destroyed
     */
    run() {
        this._iterations++;
        if (this._needRun === false) {return true}

        let fitnessCls;
        if (this._fitnessMode && (fitnessCls = Config.codeFitnessCls && this._classMap[Config.codeFitnessCls])) {
            if (fitnessCls.run(this)) {this.fire(EVENTS.STOP, this)}
            this._needRun = false;
        } else {
            this._jsvm.run(this);
        }

        return this._updateDestroy() && this._updateEnergy();
    }

    grabEnergy(amount) {
        if (!IS_NUM(amount)) {return true;}
        const noEnergy = (this._energy -= amount) < 1;
        noEnergy && this.destroy();
        return !noEnergy;
    }

    fitness() {
        return this._energy * this._changes;
    }

    destroy() {
        this.fire(EVENTS.DESTROY, this);
        this._alive      = false;
        this._energy     = 0;
        this._item       = null;
        this._mem        = null;
        this._jsvm.destroy();
        this._jsvm       = null;
        this._jsvmEndCb  = null;
        this.clear();
    }

    _updateColor(changes) {
        if ((this._color += changes) > Config.ORG_MAX_COLOR) {
            this._color = Config.ORG_FIRST_COLOR;
        }
    }

    _create() {
        this._jsvm                  = new JSVM(this._jsvmEndCb.bind(this, this), this, this._classMap);
        this._energy                = Config.orgStartEnergy;
        this._color                 = Config.orgStartColor;
        this._mutationProbs         = Config.orgMutationProbs;
        this._cloneMutationPercent  = Config.orgCloneMutationPercent;
        this._mutationPeriod        = Config.orgRainMutationPeriod;
        this._mutationPercent       = Config.orgRainMutationPercent;
        this._cloneEnergyPercent    = Config.orgCloneEnergyPercent;
        this._mem                   = [];
    }

    _clone(parent) {
        this._jsvm                  = new JSVM(this._jsvmEndCb.bind(this, this), this, this._classMap, parent);
        this._energy                = parent.energy;
        this._color                 = parent.color;
        this._mutationProbs         = parent.mutationProbs.slice();
        this._cloneMutationPercent  = parent.cloneMutationPercent;
        this._mutationPeriod        = parent.mutationPeriod;
        this._mutationPercent       = parent.mutationPercent;
        this._cloneEnergyPercent    = parent.cloneEnergyPercent;
        this._mem                   = parent.mem.slice();
    }

    /**
     * Checks if organism need to be killed/destroyed, because of age or zero energy
     * @return {Boolean} false means that organism was destroyed.
     * @private
     */
    _updateDestroy() {
        const alivePeriod = Config.orgAlivePeriod;
        const needDestroy = alivePeriod > 0 && (this._energy < 1 || this._iterations >= alivePeriod);

        needDestroy && this.destroy();

        return !needDestroy;
    }

    /**
     * Is called when some modifications in code appeared and we have
     * to re-execute it again
     * @private
     */
    _onResetCode() {
        this._needRun    = true;
    }

    /**
     * This is how our system grabs an energy from organism if it's age is
     * divided into Config.orgEnergySpendPeriod.
     * @return {Boolean} false means that organism was destroyed.
     * @private
     */
    _updateEnergy() {
        if (Config.orgEnergySpendPeriod === 0 || this._iterations % Config.orgEnergySpendPeriod !== 0) {return true;}
        const codeSize = this._jsvm.size;
        let   grabSize = Math.floor(codeSize / Config.orgGarbagePeriod);

        if (codeSize > Config.codeMaxSize) {grabSize = codeSize * Config.codeSizeCoef;}
        if (grabSize < 1) {grabSize = 1;}
        grabSize = Math.min(this._energy, grabSize);
        this.fire(EVENTS.GRAB_ENERGY, grabSize);

        return this.grabEnergy(grabSize);
    }
}