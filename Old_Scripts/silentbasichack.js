// THIS SCRIPT IS OUT OF DATE. It has been replaced by basic-hack.js in the same repository where this one is located.
// Syntax for using this script:
// run silentbasichack.js (TargetNameHere) -t (ThreadCount)
// e.g. run silentbasichack.js n00dles -t 500
// will set the script to hack n00dles with 500 threads
// -Igabod

/** @param {NS} ns **/
export async function main(ns) {
	var target = ns.args[0]; // This var sets the target of the hack based on the first argument you typed in when running the script.
  // Comment this out and uncomment the one below if you want to have the tail window re-opened on every loop.
  // Having it here, outside the loop, means that it can be closed and won't reopen on it's own.
	ns.tail();
	
	while (true) { // Begins the while loop.

		// Disables standard log output from showing up. We'll be putting the relevant info in the log ourselves.
		ns.disableLog("ALL");

		// this will automatically pull up the tail window so you can see what is happening.
		// move it above the while (true) line to keep it from reopening every time te loop starts again
		// in case you want to close it for whatever reason.
//		ns.tail();

		var moneyThresh = ns.getServerMaxMoney(target) * 0.75; // Threshold to make sure there is enough money on the server to hack it.
		var securityThresh = ns.getServerMinSecurityLevel(target) + 3; // Threshold to make sure security isn't high enough to slow you down.
		var maxcash = ns.getServerMaxMoney(target); // var to make it easier to display max money info in the log.
		var cashnow = ns.getServerMoneyAvailable(target); // var to make it easier to display current money info in the log.
		var minsec = ns.getServerMinSecurityLevel(target); // var to make it easier to display minimum security info in the log.
		var secnow = ns.getServerSecurityLevel(target); // var to make it easier to display current security info in the log.
		var weaktime = ns.getWeakenTime(target); // var to make it easier to display time to complete weaken action in the log.
		var growtime = ns.getGrowTime(target); // var to make it easier to display time to complete grow action in the log.
		var hacktime = ns.getHackTime(target); // var to make it easier to display time to complete hack action in the log.

		// Creates the function biprint which does both print and tprint for the same string with one command.
		// You can just use print if you only want it in the logs or tprint if you only want it in the terminal.
		ns.biprint = (text) => { ns.print(text); ns.tprint(text); }

		// Begin the log output which displays all the relevant information. This is a single command multi-line print.
		ns.print(`
\x1b[37m========================================\x1b[0m
\x1b[37mHacking\x1b[31m ${target}\x1b[0m
\x1b[37m========================================\x1b[0m
\x1b[37mCash:\x1b[33m $${ns.nFormat(cashnow, "0.0a")} \x1b[37m/\x1b[38;5;11m $${ns.nFormat(maxcash, "0.0a")}\x1b[0m
\x1b[37mSec:\x1b[36m ${secnow}\x1b[37m /\x1b[38;5;14m ${minsec}\x1b[0m
\x1b[37m--------------------\x1b[0m`);

		// Here is where all the action takes place.
		// First line checks that the current security level is not above the threshold we defined earlier in the securityThresh var above.
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			// Second line prints the info for how long the weaken action will take into the log.
			ns.print('\x1b[31mWEAKENING \x1b[37mSTARTED: \x1b[31m' + ns.tFormat(weaktime, "t=") + '\x1b[37m.\x1b[0m');
			// Third line just prints a division line of = symbols to make the log easier to read.
			ns.print('\x1b[37m========================================\x1b[0m');
			// Fourth line does two things, it runs the weaken command and also displays the results from it.
			// Important note: Putting INFO: at the beginning of the line changes the color to blue.
			// You can also use Warn: for yellow and Error: for red. Other options are Success and Fail.
			// The color displayed also depends on your theme settings.
			ns.print('SUCCESS: ' + (target) + ' WEAKEN RESULTS: ' + await ns.weaken(target)); // can change ns.print to ns.biprint if you want it on the logs and in terminal
			// The Fifth line says that if the security doesn't need to be weakened we check to see if there is enough money to begin the hack.
			// If the money is below the threshold defined in the moneyThresh var above then we proceed to do the grow action.
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			// Sixth line prints the info for how long the grow action will take into the log.
			ns.print('\x1b[31mGROW \x1b[37mSTARTED: \x1b[31m' + ns.tFormat(growtime, "t=") + '\x1b[37m.\x1b[0m');
			// Seventh line is the same aesthetic division line as the third line.
			ns.print('\x1b[37m========================================\x1b[0m');
			// Eighth line runs the grow command and then prints the results.
			ns.print('SUCCESS: ' + (target) + ' GROW RESULTS: ' + await ns.grow(target)); // can change ns.print to ns.biprint if you want it on the logs and in terminal
			// Ninth line basically says as long as we don't need to weaken or grow we move on to the hack action.
		} else {
			// Tenth line prints the info for how long the hack action will take into the log.
			ns.print('\x1b[31mHACK \x1b[37mSTARTED: \x1b[31m' + ns.tFormat(hacktime, "t=") + '\x1b[37m.\x1b[0m');
			// Eleventh line is more aesthetic division for readability.
			ns.print('\x1b[37m========================================\x1b[0m');
			// Twelth line runs hack and prints the results in the log.
			ns.print('SUCCESS: ' + (target) + ' HACK RESULTS: ' + await ns.hack(target)); // can change ns.print to ns.biprint if you want it on the logs and in terminal
		}
	}
}
