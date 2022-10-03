// Syntax for use:
// run karma-watch.js
// Just shows you your karma score in the terminal.
// -Igabod
/** @param {NS} ns */
export async function main(ns) {
	ns.tprint(`\x1b[36mYour karma score is currently \x1b[31m${ns.nFormat(ns.heart.break(), "0.00a")}`);
}
