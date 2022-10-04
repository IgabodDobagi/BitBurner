// Syntax for use:
// run dispatch.js (script to copy)
// e.g. run dispatch.js basic-hack.js
// This will copy the chosen script to every server which you have rooted.
// Then it will run the script at max threads for the server. It kills all
// other scripts running on every server except for home. And it reserves
// 16gb of ram on your home server so you can run other things on there.
// This code was given to me by someone on the official discord for bitburner
// and slightly modified by me. -Igabod
async function copyAndRunMax(ns, script, server) {
    await ns.scp(script, server)
    const homeReserveGb = 16
    if(server !== 'home') ns.killall(server)
    let freeRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server)
    if(server === 'home') freeRam -= homeReserveGb
    const threads = Math.floor(freeRam / ns.getScriptRam(script))
    if(threads <= 0) return
    ns.exec(script, server, threads, ns.args[1] ?? 0)
}

function deepscan(ns) {
    let servers = new Set(['.'])
    for(const next of servers) 
        ns.scan(next).forEach(server => servers.add(server))
    return [...servers]
}

export async function main(ns) {
    const script = ns.args[0]
    for(const server of deepscan(ns))
        await copyAndRunMax(ns, script, server)
}
