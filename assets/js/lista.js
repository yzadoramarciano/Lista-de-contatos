
document.addEventListener('DOMContentLoaded',  carregarContatos);

 async function carregarContatos () {

    try {
   const respostaAPI = await fetch ("https://lista-de-contatos-lip4.onrender.com/contatos" , {

      method: "GET",

   });

   
   if (!respostaAPI.ok) {
  throw new Error(`Erro HTTP: ${respostaAPI.status}`);
}



   const ListaContatos = await respostaAPI.json();

   const container = document.getElementById ('listadeContatos');

   container.innerHTML = ListaContatos.map (c => `<div class="contato"> <p>${c.nomecont} - ${c.telecont} - ${c.emailcont}</p> <button class= "btnsDeletar" data-id="${c.id}"> Excluir</button> <button class= "btnsEditar" data-id="${c.id}"> Editar </button>  </div>`). join ('');

   } catch (erro) {

    console.log ('Deu ruim' , erro);
   }

};

const btnVoltar = document.getElementById ('btnVoltar');

btnVoltar.addEventListener ('click', voltar);

function voltar() {


   window.location.href = 'index.html';
};


const container = document.getElementById ('listadeContatos');

container.addEventListener ('click' ,  async (event) => {

   if (event.target.classList.contains('btnsDeletar')) {

      const id = event.target.dataset.id;

      deletarContato(id)
   }

   if (event.target.classList.contains('btnsEditar')) {
    const id = event.target.dataset.id;
    editarContato(id); // você define essa função depois
  }

});


async function deletarContato (id) {

   
   try {

      const respostaAPI = await fetch (`https://lista-de-contatos-lip4.onrender.com/contatos/${id}`, {

       method: "DELETE",



       });


      if (!respostaAPI.ok) {

         throw new Error (`Erro HTTP: ${respostaAPI.status}`);
      }

      carregarContatos ();
} catch (error) {

   console.log ('Erro ao deletar', error);
}
};

// Declarando fora de alguma função, assim é declarado uma só vez
const overlay = document.getElementById ('overlay');
const tabela = document.getElementById ('tabelaEdicao');
const formularioEdicao = document.getElementById ('formularioEdicao');

//Listener do overlay adicionado uma só vez, não vai ser acionado toda vez que clicar em editarContato. 

   overlay.addEventListener ('click' , () => {

      tabela.classList.remove ('ativo');
      overlay.classList.remove ('ativa');

   })

async function editarContato (id)   {

   tabela.classList.add ('ativo');
   overlay.classList.add ('ativa');


   try {
   const respostaAPI = await fetch (`https://lista-de-contatos-lip4.onrender.com/contatos/${id}` , {

      method: "GET",

   });

   if (!respostaAPI.ok) {

      throw new Error (`Erro HTTP: ${respostaAPI.status}`);
   }


   const contato = await respostaAPI.json()
  

   formularioEdicao.elements.nomeCont.value = contato.nomecont;
formularioEdicao.elements.teleCont.value = contato.telecont;
formularioEdicao.elements.emailCont.value = contato.emailcont;

}  catch (error) {

   console.log ("Erro ao carregar o contato," , error);
   return;
}


  formularioEdicao.onsubmit = async (event) => {
    event.preventDefault();

   try {
   const resposta = await fetch (`https://lista-de-contatos-lip4.onrender.com/contatos/${id}` , 

      {

          method: "PUT",

         headers: {

            "Content-Type" : "application/json"
         },

         body: JSON.stringify ({

            nomeCont: formularioEdicao.elements.nomeCont.value, 
            teleCont : formularioEdicao.elements.teleCont.value,
            emailCont : formularioEdicao.elements.emailCont.value,


         })

      });

         if (!resposta.ok) {

         throw new Error (`Erro HTTP ${resposta.status}`);
      }


      alert ('Alterações salvas com sucesso.')
      tabela.classList.remove('ativo');
      overlay.classList.remove('ativa');
      carregarContatos();

   
      

      
   } catch (error) {
      
      console.log ("Erro ao enviar as edições",  error);
   }
}



};


