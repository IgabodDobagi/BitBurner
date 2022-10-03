// Syntax for using this script:
// run basic-hack.js (TargetNameHere) -t (ThreadCount)
// e.g. run basic-hack.js n00dles -t 500
// will set the script to hack n00dles with 500 threads
// -Igabod

/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0]; // This var sets the target of the hack based on the first argument you typed in when running the script.

	// Disables standard log output from showing up. We'll be putting the relevant info in the log ourselves.
	ns.disableLog("ALL");

	// This will automatically pull up the tail window so you can see what is happening.
	// Comment it out if you don't want it to come up automatically.
	ns.tail();
	// Must await ns.sleep(0) so that the resizeTail will work. Otherwise it won't make any changes to the size of the tail window.
	await ns.sleep(0);
	// resizeTail lets you set the exact dimensions of the tail window. In this case it is set to show only the info for the phase
	// of the cycle you are currently on plus the results line from the last phase completed.
	// Default tail window size is 500, 500 in case you want to change it back. Or you could comment out the sleep and resizeTail
	// lines to do away with it. Your choice.
	ns.resizeTail(400, 250);
	
	while (true) { // Begins the while loop.

		let moneyThresh = ns.getServerMaxMoney(target) * 0.75; // Threshold to make sure there is enough money on the server to hack it.
		let securityThresh = ns.getServerMinSecurityLevel(target) + 3; // Threshold to make sure security isn't high enough to slow you down.
		let maxcash = ns.getServerMaxMoney(target); // variable to make it easier to display max money info in the log.
		let cashnow = ns.getServerMoneyAvailable(target); // variable to make it easier to display current money info in the log.
		let minsec = ns.getServerMinSecurityLevel(target); // variable to make it easier to display minimum security info in the log.
		let secnow = ns.getServerSecurityLevel(target); // variable to make it easier to display current security info in the log.
		let weaktime = ns.getWeakenTime(target); // variable to make it easier to display time to complete weaken action in the log.
		let growtime = ns.getGrowTime(target); // variable to make it easier to display time to complete grow action in the log.
		let hacktime = ns.getHackTime(target); // variable to make it easier to display time to complete hack action in the log.

		// Begin the log output which displays all the relevant information. This is a single command multi-line print.
		ns.print(
`\x1b[37m========================================\x1b[0m
\x1b[37mHacking\x1b[31m ${target}\x1b[0m
\x1b[37m========================================\x1b[0m
\x1b[37mCash:\x1b[33m $${ns.nFormat(cashnow, "0.00a")} \x1b[37m/\x1b[38;5;11m $${ns.nFormat(maxcash, "0.00a")}\x1b[0m
\x1b[37mSec:\x1b[36m ${ns.nFormat(secnow, "0.00a")}\x1b[37m /\x1b[38;5;14m ${ns.nFormat(minsec, "0.00a")}\x1b[0m
\x1b[37m--------------------\x1b[0m`);

		// Here is where all the action takes place.
		// First line checks that the current security level is not above the threshold we defined earlier in the securityThresh var above.
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			// Second line prints the info for how long the weaken action will take into the log.
			ns.print('\x1b[31mWEAKENING \x1b[37mSTARTED: \x1b[31m' + ns.tFormat(weaktime, "t=") + '\x1b[37m.\x1b[0m');
			// Third line just prints a division line of = symbols to make the log easier to read.
			ns.print('\x1b[37m========================================\x1b[0m');
			// Fourth line does two things, it runs the weaken command and also displays the results from it.
			ns.print(`\n\x1b[32mWEAKEN RESULTS: \x1b[36m${ns.nFormat(await ns.weaken(target), "0.00a")}\x1b[37m.\x1b[0m`);
			// The Fifth line says that if the security doesn't need to be weakened we check to see if there is enough money to begin the hack.
			// If the money is below the threshold defined in the moneyThresh var above then we proceed to do the grow action.
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			// Sixth line prints the info for how long the grow action will take into the log.
			ns.print('\x1b[31mGROW \x1b[37mSTARTED: \x1b[31m' + ns.tFormat(growtime, "t=") + '\x1b[37m.\x1b[0m');
			// Seventh line is the same aesthetic division line as the third line.
			ns.print('\x1b[37m========================================\x1b[0m');
			// Eighth line runs the grow command and then prints the results.
			ns.print(`\n\x1b[32mGROW RESULTS: \x1b[33m${ns.nFormat(await ns.grow(target), "$0.00a")}\x1b[37m.\x1b[0m`);
			// Ninth line basically says as long as we don't need to weaken or grow we move on to the hack action.
		} else {
			// Tenth line prints the info for how long the hack action will take into the log.
			ns.print('\x1b[31mHACK \x1b[37mSTARTED: \x1b[31m' + ns.tFormat(hacktime, "t=") + '\x1b[37m.\x1b[0m');
			// Eleventh line is more aesthetic division for readability.
			ns.print('\x1b[37m========================================\x1b[0m');
			// Twelth line runs hack and prints the results in the log.
			ns.print(`\n\x1b[32mHACK RESULTS: \x1b[33m${ns.nFormat(await ns.hack(target), "$0.00a")}\x1b[37m.\x1b[0m`);
		}
	}
}
