import {Elysia} from "elysia"
import {UserController} from "../controllers/UserController";

export const UserRoute = new Elysia()
    .group("/users", (app) =>
        app.use(UserController)
            .onError(({error, code, set})=>{
                if(code === "VALIDATION"){
                    return {
                        message:  "Erro de validação"
                    }
                }
            })
    )
