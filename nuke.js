// Syntax for use:
// run nuke.js (target server)
// e.g. run nuke.js n00dles
// This will automatically root one server that you specify
// as long as you have the required programs to open enough
// ports to nuke it. It will still open the ports for which
// you have the programs. But if you don't have enough ports
// opened it still won't nuke the server and you'll need to
// run it again once you get the required programs. If you
// want to root all servers at the same time I recommend you
// check out autoroot.js in my github repo where you got this.
// -Igabod
/** @param {NS} ns **/
export async function main(ns) {
	var serv = ns.args[0];
	if (ns.fileExists("BruteSSH.exe"))
		ns.brutessh(serv);

	if (ns.fileExists("FTPCrack.exe"))
		ns.ftpcrack(serv);

	if (ns.fileExists("relaySMTP.exe"))
		ns.relaysmtp(serv);

	if (ns.fileExists("HTTPWorm.exe"))
		ns.httpworm(serv);

	if (ns.fileExists("SQLInject.exe"))
		ns.sqlinject(serv);

	ns.nuke(serv);

}
