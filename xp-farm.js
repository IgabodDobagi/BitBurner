// Syntax for use:
// run xp-farm.js (target) -t (max threads)
// The optimal target is joesguns and max threads is everything you have
// the ability to throw at it on your home server. Don't be shy now.
// Give it all you've got.
// This script is purely for gaining as much hacking xp as possible as
// fast as possible. - Igabod

/** @param {NS} ns **/
export async function main(ns) {

    let target = ns.args[0];
    let securitygoal = ns.getServerMinSecurityLevel(target);

    while (true) {
        if (ns.getServerSecurityLevel(target) > securitygoal) {
            await ns.weaken(target);
        } else {
            await ns.grow(target);
        }
    }
}
