import { SQLiteError } from "bun:sqlite";

export const errorHandler = (error, code, set) =>{
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
        if(error instanceof SQLiteError){
            set.status = 500
            return{
                message: "Erro ao salvar dados no banco",
                reason:{
                    summary: error.message, details: error.cause ?? "no details"
                }
            }
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
}