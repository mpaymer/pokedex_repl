import { createInterface, type Interface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";

export type State = {
    readline: Interface // readline interface
    commands: Record<string, CLICommand>; // commands registry
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export function initState(): State {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    });

    return {
        readline: rl,
        commands: getCommands(),
    }
}