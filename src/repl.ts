import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./command.js";

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
        // otherwise, clean input into array and use first word as command
        const wordsArray = cleanInput(input);
        const command = wordsArray[0];
        const commands = getCommands();
        if (command in commands) {
            try {
                commands[command].callback(commands);
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        } else {
            console.log("Unknown command");
        }
        rl.prompt();
    })
}