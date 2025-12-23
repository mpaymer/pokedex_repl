import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export async function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", async (input: string) => {
        // if empty (including blank spaces), prompt and early return
        if (!input.trim()) {
            state.readline.prompt();
            return;
        }
        // otherwise, clean input into array and use first word as command
        const wordsArray = cleanInput(input);
        const command = wordsArray[0];
        const commands = state.commands;
        if (command in commands) {
            try {
                await commands[command].callback(state, ...wordsArray.slice(1));
            } catch (error) {
                console.log(`${(error as Error).message}`);
            }
        } else {
            console.log(`Unknown command: "${command}". Type "help" for a list of commands.`);
        }
        state.readline.prompt();
    })
}