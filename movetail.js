// Syntax for using this script.
// run movetail.js (horizontal position) (vertical position) (pid of the script)
// make sure you type ps first to check the pid numbers of all active scripts.
// e.g. run movetail.js 2240 0 31512
// will move the tail window for the script with the pid of 31512 all the way right and up
// on my particular monitor resolution. You may want to start with smaller numbers to start
// with and experiment to see what fits your own resolution. --Igabod

/** @param {NS} ns */
export async function main(ns) {
    let tailx = (ns.args[0]);
    let taily = (ns.args[1]);
    let scriptpid = (ns.args[2]);

    if (tailx == undefined) {
        ns.tprint("Please enter the x and y coords as well as the pid for the script of which you want to move the tail.");
        return;

    } else if (taily == undefined) {
        ns.tprint("Please enter the x and y coords as well as the pid for the script of which you want to move the tail.");
        return;

    } else if (scriptpid == undefined) {
        ns.tprint("Please enter the x and y coords as well as the pid for the script of which you want to move the tail.");
        return;

    } else {
        ns.moveTail(tailx, taily, scriptpid);
    }

}
