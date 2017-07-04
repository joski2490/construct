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
import Events   from './../../global/Events';
import Config   from './../../global/Config';
import Helper   from './../../global/Helper';
import Organism from './../../organism/Organism';
import Code     from './../../organism/Code';

export default class Mutator {
    constructor(manager) {
        this._manager = manager;
        this._MUTATION_TYPES = [
            this._onAdd.bind(this),
            this._onChange.bind(this),
            this._onDel.bind(this),
            this._onSmallChange.bind(this),
            this._onClone.bind(this),
            this._onPeriod.bind(this),
            this._onAmount.bind(this),
            this._onProbs.bind(this),
            this._onCloneEnergyPercent.bind(this)
        ]

        manager.on(Events.ORGANISM, this._onOrganism.bind(this));
        manager.on(Events.CLONE, this._onCloneOrg.bind(this));
    }

    destroy() {
    }

    _onOrganism(org) {
        if (Config.orgRainMutationPeriod > 0 && org.mutationPeriod > 0 && org.age % org.mutationPeriod === 0) {
            this._mutate(org, false);
        }
    }

    _onCloneOrg(parent, child) {
        if (child.energy > 0) {this._mutate(child);}
    }

    _mutate(org, clone = true) {
        const bCode     = org.byteCode;
        let   mutations = Math.round(bCode.length * org.mutationPercent) || 1;
        const probIndex = Helper.probIndex;
        const mTypes    = this._MUTATION_TYPES;

        for (let i = 0; i < mutations; i++) {
            mTypes[bCode.length < 1 ? 0 : probIndex(org.mutationProbs)](org);
        }
        org.mutations += mutations;
        org.updateColor(mutations);
        org.code.compile();
        this._manager.fire(Events.MUTATIONS, org, mutations, clone);

        return mutations;
    }

    _onAdd(org) {
        org.byteCode.splice(Helper.rand(org.byteCode.length), 0, org.number());
    }

    _onChange(org) {
        org.byteCode[Helper.rand(org.byteCode.length)] = org.number();
    }

    _onDel(org) {
        org.byteCode.splice(Helper.rand(org.byteCode.length), 1);
    }

    /**
     * Operator type or one variable may mutate
     * @param {Organism} org
     * @private
     */
    _onSmallChange(org) {
        let pos = Helper.rand(org.byteCode.length);
        if (Helper.rand(1) === 0) {
            org.byteCode[pos] = org.setOperator(org.byteCode[pos], Helper.rand(256));
        } else {
            org.byteCode[pos] = org.setVar(org.byteCode[pos], Helper.rand(Code.VARS), Helper.rand(1 << Code.BITS_PER_VAR));
        }
    }

    _onClone(org) {
        org.mutationClonePercent = Math.random();
    }

    _onPeriod(org) {
        org.mutationPeriod = Helper.rand(Config.ORG_MAX_MUTATION_PERIOD);
    }

    _onAmount(org) {
        org.mutationPercent = Math.random();
    }

    _onProbs(org) {
        org.mutationProbs[Helper.rand(org.mutationProbs.length)] = Helper.rand(Config.orgMutationProbsMaxValue);
    }

    _onCloneEnergyPercent(org) {
        org.cloneEnergyPercent = Math.random();
    }
}