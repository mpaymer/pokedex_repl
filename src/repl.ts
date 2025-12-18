import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
});

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ");
}

export function startREPL() {
    rl.prompt();
    rl.on("line", (input: string) => {
        // if empty (including blank spaces), prompt and early return
        if (!input.trim()) {
            rl.prompt();
            return;
        }
        // otherwise, clean input into array and output first word to console
        const wordsArray = cleanInput(input);
        console.log(`Your command was: ${wordsArray[0]}`);
        rl.prompt();
    })
}