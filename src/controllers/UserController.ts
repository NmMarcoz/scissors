import { Elysia } from "elysia";
import { CreateUserRequest } from "../infra/utils/typeValidations";
import { type } from "arktype";
import * as userService from "../services/UserService";
import { validator } from "../infra/utils/validator";

export const UserController = new Elysia()
    .get("/", async ({set}) => {
        const users = await userService.getAllUsers();
        if(!users){
            set.status = 404
            return{
                message : "Sem usuários cadastrados",
                users: null
            }
        }
        set.status = 200;
        return{
            message: "Usuários encontrados",
            users
        }

    })
    .post("/", async ({ body, set, headers }) => {
        type User = typeof CreateUserRequest.infer;
        const user = validator(CreateUserRequest, body) as User;
        await userService.createUser(user)
        set.status = 201
        const {password, ...ommited} = user;
        return{
            message: "Usuário criado",
            user: ommited
        }
    });
