import {Elysia} from "elysia"

export const UserController = new Elysia()
    .get("/", ()=> "Hello!")