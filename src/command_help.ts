import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("");
    for (const command in commands) {
        console.log(`${command}: ${commands[command].description}`);
    };
}