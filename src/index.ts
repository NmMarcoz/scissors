import { Elysia } from "elysia";
import {swagger} from "@elysiajs/swagger"
import {UserRoute} from "./routes/UserRoute";

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .use(UserRoute).onError(({ error, code, set }) => {
      console.error("ERROR ON ELYSIA CATCH", error);
      set.status = 500;
      if (code === "INTERNAL_SERVER_ERROR") {
          console.error("INTERNAL ERROR")
          return {
              message: "erro interno de servidor",
              reason: {
                  summary: error.cause ?? "Desconhecido",
                  details: error.stack,
              },
          };
      }
      if (error instanceof ReferenceError) {
          console.error("REFERENCE ERROR")
          return {
              message: "Erro interno de servidor, entre em contato",
              reason: { summary: error.cause },
          };
      }
      return {
          message: "Erro desconhecido",
          reason: { summary: error?.message ?? "Internal error" },
      };
  })
    .use(swagger())
    .listen(3000);
    

console.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
