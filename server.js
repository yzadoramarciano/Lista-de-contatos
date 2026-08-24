import {fastify} from 'fastify'
import cors from '@fastify/cors'

import { DatabasePostgres} from './database_postgres.js'

const server = fastify()

const database = new DatabasePostgres()


server.register(cors, {
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://yzadoramarciano.github.io'],
  methods: ["GET" , "POST", "PUT", "DELETE"]
})

server.post ('/contatos', async (request,reply)=> {


    const { nomeCont, teleCont, emailCont } = request.body;

    await database.create ({

        nomeCont,
        teleCont,
        emailCont,

    });


    return reply.status(201).send();
})


server.get ('/contatos' , async (request) => {

    const contatos = await database.list()

    return contatos;
})


server.delete ('/contatos/:id' , async (request,reply) =>{

    const id = request.params.id

    await database.delete (id)

    return reply.status(204).send()
})


server.put ('/contatos/:id' , async (request,reply) => {

    const id= request.params.id

    const { nomeCont, teleCont, emailCont } = request.body;



    await database.update (id, {

            nomeCont,
            teleCont,
            emailCont,

    })

    return reply.status(204).send()

})


server.get ('/contatos/:id' , async (request, reply) =>{

    const id = request.params.id;
    const contato = await database.getById(id);

    if (!contato) {
        return reply.status(404).send({ erro: 'Contato não encontrado' });
    }

    return reply.send(contato);
});




server.listen ({

    host: '0.0.0.0',
   port: process.env.PORT ?? 8080,

}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});