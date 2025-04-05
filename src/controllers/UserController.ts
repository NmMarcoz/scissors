import { Elysia } from "elysia";
import { CreateUserRequest } from "../infra/utils/typeValidations";
import { type } from "arktype";
import * as userService from "../services/UserService";

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
        const out = CreateUserRequest(body);
        if (out instanceof type.errors) {
            set.status = 400;
            return {
                message: "Erro de validação",
                reason: {
                    summary: out.summary,
                    expected: CreateUserRequest.description,
                },
            };
        }
        const user: User = out;
        const databaseResponse = await userService.createUser(user)
        set.status = 201
        const {password, ...ommited} = user;
        return{
            message: "Usuário criado",
            user: ommited
        }
    });
