

const formulario = document.getElementById ('formulario');
const btnSalvar = document.getElementById ('btnSalvar');
const btnLista = document.getElementById ('btnLista'); 
const btnAbrirLista = document.getElementById ('btnAbrirLista'); 



formulario.addEventListener ('submit' ,  async (event) => {

   event.preventDefault();

    const nomeCont = document.querySelector ('input#nomeCont').value;
    const teleCont = document.getElementById ('teleCont').value;
    const emailCont = document.getElementById ('emailCont').value;

    

    //

    try {

    const resposta = await fetch ("https://lista-de-contatos-lip4.onrender.com/contatos", {

       method: "POST",

       headers: {

    "Content-Type": "application/json"

       },

      body: JSON.stringify ({

        nomeCont,
        teleCont,
        emailCont

      })






    });

    if (!resposta.ok) {

      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    alert ("Contato salvo com sucesso.");

    formulario.reset();

} catch (erro) {
   console.log ("Erro ao salvar ", erro);
   alert ("Erro ao salvar o contato.");
};

});


 

btnAbrirLista.addEventListener ('click', abrirLista);

function abrirLista() {


   window.location.href = 'lista.html';
};









