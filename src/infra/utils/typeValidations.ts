import { type } from "arktype";


export const CreateUserRequest = type({
    name: "string",
    birthdate: "string.date",
    email: "string.email",
    password: "string",
    phone: "string"
})
export type User = typeof CreateUserRequest.infer