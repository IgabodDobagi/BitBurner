// Syntax for use:
// run colortest.js
// Code is simple but was taken from the Bitburner Discord and provided by Thatman and modified by me.
// -Igabod
/** @param {NS} ns */
export async function main(ns) {

    const col = {
        "r": "\x1b[31m",        // foreground red
        "g": "\x1b[32m",        // foreground green
        "b": "\x1b[34m",        // foreground blue
        "c": "\x1b[36m",        // foreground cyan
        "m": "\x1b[35m",        // foreground magenta
        "y": "\x1b[33m",        // foreground yellow
        "k": "\x1b[30m",        // foreground black
        "w": "\x1b[37m",        // foreground white
        "bgr": "\x1b[48;5;9m",  // background red
        "bgg": "\x1b[48;5;10m", // background green
        "bgb": "\x1b[48;5;12m", // background blue
        "bgc": "\x1b[48;5;14m", // background cyan
        "bgm": "\x1b[48;5;13m", // background magenta
        "bgy": "\x1b[48;5;3m",  // background yellow
        "bgk": "\x1b[48;5;0m",  // background black
        "bgw": "\x1b[48;5;7m",  // background white
        "line": "\x1b[4m",      // underline text
        "ital": "\x1b[3m",      // Italic text NOT WORKING
        "bold": "\x1b[1m",      // Bold text
        "blnk": "\x1b[5m",      // Blink text. NOT WORKING
        "strk": "\x1b[9m",      // strikethrough text NOT WORKING
        "d": "\x1b[0m"          // default color
    }
    ns.tprint(col.k + "black " + col.r + "red " + col.g + "green " + col.y + "yellow "
        + col.b + "blue " + col.m + "magenta " + col.c + "cyan " + col.w + "white " + col.d + "default")
    ns.tprint(col.bgr + "bg red" + col.d + " " + col.bgg + "bg green" + col.d + " " + col.bgb + "bg blue" 
        + col.d + " " + col.bgc + "bg cyan" + col.d + " " + col.bgm + "bg magenta" + col.d + " " + col.bgy + "bg yellow"
        + col.d + " " + col.bgk + "bg black" + col.d + " " + col.bgw + "bg white" + col.d + " " + ".")
    ns.tprint(col.line + "underline text" + col.d + " " + col.ital + "italic text" + col.d + " " + col.bold + "bold text"
        + col.d + " " + col.blnk + "blinking text" + col.d + " " + col.strk + "strikethrough text")
    ns.tprint("For more color options go to https://talyian.github.io/ansicolors/")

}
