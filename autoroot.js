// Syntax for use:
// run autoroot.js
// Code provided by Bean on the Bitburner Discord and then modified slightly by me.
// -Igabod
/** @param {NS} ns **/
export async function main(ns) {
	//count breachable ports
	var portsAvailable = ns.fileExists("BruteSSH.exe", "home") + ns.fileExists("FTPCrack.exe", "home") + ns.fileExists("RelaySMTP.exe", "home") + ns.fileExists("HTTPWorm.exe", "home") + ns.fileExists("SQLInject.exe", "home");

	//populate initial hostnames array
	var hostnames = ns.scan(hostname, true);

	//define uniqueness filter for recursive scan
	function unique(item) {
		return hostnames.indexOf(item) < 0;
	}
	//loop through each hostname in hostnames
	for (var i = 0; i < hostnames.length; i++) {
		var hostname = hostnames[i];
		//payload
		if (ns.getServerNumPortsRequired(hostname) <= portsAvailable) {
			if (ns.hasRootAccess(hostname) === false) {
				if (ns.fileExists("BruteSSH.exe", "home")) { ns.brutessh(hostname) }
				if (ns.fileExists("FTPCrack.exe", "home")) { ns.ftpcrack(hostname) }
				if (ns.fileExists("RelaySMTP.exe", "home")) { ns.relaysmtp(hostname) }
				if (ns.fileExists("HTTPWorm.exe", "home")) { ns.httpworm(hostname) }
				if (ns.fileExists("SQLInject.exe", "home")) { ns.sqlinject(hostname) }
				ns.nuke(hostname);
				ns.tprint("nuked " + hostname + ".")
			}
			if (ns.hasRootAccess(hostname)) {
				//recursive scan
				var newhostnames = ns.scan(hostname, true).filter(unique);
				var hostnames = hostnames.concat(newhostnames);
			}
		}
		//Do something at the end of the list
		if (i == hostnames.length - 1) { ns.tprint("All rootable machines rooted.") }
	}
}
