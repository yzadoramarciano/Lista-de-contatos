import {randomUUID} from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {

    async list () {

        const contatos = await sql `select * from contatos`


        return contatos
    }


    async create (contato) {

        const contId = randomUUID()

        const { nomeCont, teleCont, emailCont} = contato;

        await sql `insert into contatos (id, nomecont, telecont, emailcont) VALUES (${contId}, ${nomeCont}, ${teleCont}, ${emailCont})`;
    }



    async delete (id) {


        await sql `delete from contatos where id = ${id}`
    }


    async update (id, contato) {

        const {nomeCont, teleCont, emailCont} = contato;


        await sql `update contatos set nomecont =${nomeCont}, telecont = ${teleCont}, emailcont = ${emailCont} where id=${id}`



    }


    async getById (id) {

        const contato = await sql ` select * from contatos where id=${id}`
        return contato[0];
    }


}