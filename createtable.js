import {sql} from './db.js'

sql `

    create table contatos (
    
    id UUID primary key,
    nomeCont varchar(30) not null,
    teleCont text not null,
    emailCont  text unique not null 
    );





`

.then (() => {

    console.log('Tabela criada!!')
})