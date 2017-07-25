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
import Num      from '../../organism/Num';

export default class Mutator {
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

        manager.on(Events.ORGANISM, this._onOrganism.bind(this));
        manager.on(Events.CLONE, this._onCloneOrg.bind(this));
    }

    destroy() {
    }

    _onOrganism(org) {
        if (Config.orgRainMutationPeriod > 0 && org.mutationPeriod > 0 && org.iterations % org.mutationPeriod === 0) {
            this._mutate(org, false);
        }
    }

    _onCloneOrg(parent, child) {
        if (child.energy > 0) {this._mutate(child);}
    }

    _mutate(org, clone = true) {
        const code      = org.code;
        const probIndex = Helper.probIndex;
        const mTypes    = this._MUTATION_TYPES;
        let   mutations = Math.round(code.size * org.mutationPercent) || 1;
        let   type;

        for (let i = 0; i < mutations; i++) {
            // TODO: revert this
            //type = code.size < 1 ? 0 : probIndex(org.mutationProbs);
            type = 1;
            if (type === 0)      {org.adds++;}
            else if (type === 1) {org.changes++;}
            else if (type === 2) {org.changes += 0.5;}
            else if (type === 3) {org.adds--;}
            mTypes[type](org);
        }
        this._manager.fire(Events.MUTATIONS, org, mutations, clone);

        return mutations;
    }

    _onAdd(org) {
        org.code.insertLine();
    }

    _onChange(org) {
        const code = org.code;
        code.updateLine(Helper.rand(code.size), Num.get());
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
        const index = Helper.rand(org.code.size);
        const code  = org.code;

        if (Helper.rand(2) === 0) {
            code.updateLine(index, Num.setOperator(code.getLine(index), Helper.rand(code.operators)));
        } else {
            code.updateLine(index, Num.setVar(code.getLine(index), Helper.rand(Num.VARS), Helper.rand(Num.MAX_VAR)));
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