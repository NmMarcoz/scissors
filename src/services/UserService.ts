import { User } from "../infra/utils/typeValidations";
import { db } from "../infra/database/db";
import { v7 as uuid } from "uuid";
import { ElysiaErrors } from "elysia/dist/error";

export const createUser = async (data: User) => {
    const query =  db.query(`INSERT INTO Users 
      (name, password, email, birthdate, phone_number) 
      VALUES 
      ( '${data.name}' , '${data.password}', '${data.email}', '${data.birthdate}', '${data.phone}') `)

    console.log("query", query);
    const response = await db.run(query.toString());
    //db.close();
    return response;
};

export const getAllUsers = async ()=>{
    const query = "SELECT * FROM Users"
    const operation = db.prepare(query)
    const users = await operation.all() as User[]
    const ommited = users.map((item)=>{
        //@ts-ignore
        const {id, password, ...ommited} = item;
        return ommited;
    })
    console.log("[INFO] ", users);
    //db.close();
    return ommited;
}
