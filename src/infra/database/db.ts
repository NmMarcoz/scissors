import {Database} from "bun:sqlite"

export const db = new Database("/Users/nogueira/Desenvolvimento/Study (old)/projetos/scissors/database/scissors.db", {
    readwrite: true,
    create: true
});


