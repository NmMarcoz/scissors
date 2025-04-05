import { Elysia } from "elysia";
import { UserController } from "../controllers/UserController";
import { SQLiteError } from "bun:sqlite";
import { errorHandler } from "../infra/handlers/errorHandler";

export const UserRoute = new Elysia().group("/users", (app) =>
    app.use(UserController)
        .onError(({ error, code, set }) => errorHandler(error, code, set))
);
