/**
 * This plugin is a primitive version of real time charts. It shows
 * different parameters of the jevo.js system, like average energy,
 * iq (energy picking speed), average code size and so on. Here labels
 * explanation:
 *   ips: Iterations Per Second - amount of all organisms full code
 *        runs per one second
 *   lps: Lines Per Second - average run code lines per second
 *   org: Average amount of organisms
 *   nrg: Amount of energy of average organism
 *   iq : Energy picking speed per time
 *   che: Average changes amount
 *   fit: Fitness of one average organism
 *   cod: Average code size
 *
 * @author flatline
 */
const Configurable = require('./../../../../../common/src/Configurable');
const EVENTS       = require('./../../../share/Events').EVENTS;
const Config       = require('./../../../share/Config').Config;
const StatusConfig = require('./Config');

const GREEN  = 'color: #00aa00';
const RED    = 'color: #aa0000';

class Status extends Configurable {
    static _format(value, name, orgs, fixed, pad, coef = 1, perOrg = false) {
        orgs = perOrg ? orgs : 1;
        return `${name}:${((value / orgs) * coef).toFixed(fixed)}`.padEnd(pad);
    }

    constructor(manager) {
        super(manager, {Config, cfg: StatusConfig});

        this._manager      = manager;
        this._stamp        = 0;
        this._curEnergy    = 0;
        this._energy       = 0;
        this._fitness      = 0;
        this._changes      = 0;
        this._codeSize     = 0;
        this._runLines     = 1;
        this._times        = 0;
        this._ipsTimes     = 0;
        this._oldValues    = [0, 0];
        this._onIpsCb      = this._onIps.bind(this);
        this._onOrganismCb = this._onOrganism.bind(this);

        manager.on(EVENTS.IPS, this._onIpsCb);
        manager.on(EVENTS.ORGANISM, this._onOrganismCb);
    }

    destroy() {
        this._manager.off(EVENTS.IPS, this._onIpsCb);
        this._manager.off(EVENTS.ORGANISM, this._onOrganismCb);
        this._onIpsCb      = null;
        this._onOrganismCb = null;
        this._manager      = null;
        this._oldValues    = null;
        super.destroy();
    }

    _onIps(ips, orgs) {
        if (!StatusConfig.showMessages) {return}
        const stamp     = Date.now();
        this._ipsTimes++;
        if (stamp - this._stamp < StatusConfig.period) {return}

        this._onBeforeLog(ips, orgs);
        const format    = Status._format;
        const times     = this._times;
        const orgAmount = orgs.size || 1;
        const sips      = `ips:${ips.toFixed(ips < 10 ? 2 : 0)}`.padEnd(10);
        const slps      = format(this._runLines / this._ipsTimes, 'lps', orgAmount, 0, 14, 1       );
        const sorgs     = format(orgAmount,                       'org', orgAmount, 0, 10, 1       );
        const senergy   = format(this._curEnergy,                 'nrg', orgAmount, 0, 14, 1       );
        const siq       = format(this._energy   / times,          'iq',  orgAmount, 3, 13, 0.001   );
        const sfit      = format(this._fitness  / times,          'fit', orgAmount, 3, 14, 0.000001);
        const schanges  = format(this._changes,                   'che', orgAmount, 3, 12, 1, true );
        const scode     = format(this._codeSize,                  'cod', orgAmount, 1, 12, 1, true );

        console.log(`%c${sips}${slps}${sorgs}%c${siq}${senergy}${schanges}${sfit}${scode}`, GREEN, RED);
        this._manager.hasView && this._manager.canvas.text(5, 15, sips);
        this._onAfterLog(stamp);
    }

    _onOrganism(org, lines) {
	    if (!StatusConfig.showMessages) {return}
        this._runLines += lines;
    }

    _onBeforeLog(ips, orgs) {
        const olds      = this._oldValues;
        const size      = orgs.size || 1;
        let   energy    = 0;
        let   fitness   = 0;
        let   changes   = 0;
        let   codeSize  = 0;
        let   item      = orgs.first;
        let   org;

        while(item && (org = item.val)) {
            energy   += org.energy;
            changes  += org.changes;
            fitness  += org.fitness();
            codeSize += org.vm.size;
            item      = item.next;
        }

        this._curEnergy = (energy   /= size);
        this._energy    = (energy    - olds[0]);
        this._fitness   = ((fitness /= size) - olds[1]);
        this._changes   = changes;
        this._codeSize  = codeSize;
        this._oldValues = [energy, fitness];
        this._times++;
    }

    _onAfterLog(stamp) {
        this._ipsTimes = 0;
        this._runLines = 0;
        this._stamp    = stamp;
    }
}

module.exports = Status;