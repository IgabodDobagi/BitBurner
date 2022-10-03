// Syntax for using this script:
// run resizetail.js (width) (height) (script pid)
// be sure you type ps first to find the pid of all active scripts
// e.g. run resizetail.js 500 1000 3234
// will set the size of the log window to 500x1000 which is the same width
// with double the height of the default size. 3234 would be replaced with
// the pid of the script you are trying to resize the tail for.
// -Igabod
/** @param {NS} ns */
export async function main(ns) {
	var width = ns.args[0];
	var height = ns.args[1];
	var scriptpid = ns.args[2];

	if (!width   || !height  || !scriptpid ) {
		ns.tprint("Please enter the width and height as well as the pid for the script for which you want to resize the tail.");
		return;
		
	} else {
		ns.resizeTail(width, height, scriptpid);
	}

}
