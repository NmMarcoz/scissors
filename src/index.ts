import { Elysia } from "elysia";
import {swagger} from "@elysiajs/swagger"
import {UserRoute} from "./routes/UserRoute";

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .use(UserRoute)
    .use(swagger())
    .listen(3000);

console.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
