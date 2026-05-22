const API_URL = 'http://localhost:3000/usuarios';

document.getElementById('contatoEmergencia').addEventListener('change', (e) => {
  if (e.target.value === 'Sim') {
    campoTelefone.classList.remove('oculto');
  } else {
    campoTelefone.classList.add('oculto');
  }
});

// Cadastro

document.getElementById('formCadastro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById('nome').value,
    endereco: document.getElementById('endereco').value,
    violencia: document.getElementById('violencia').value,
    arma: document.getElementById('arma').value,
    tipoArma: document.getElementById('tipoArma').value,
    contatoEmergencia: document.getElementById('contatoEmergencia').value,
    telefone: document.getElementById('telefone').value
  };

  if (!dados.nome || !dados.endereco || !dados.violencia || !dados.arma) {
    mostrarMensagem('Preencha todos os campos obrigatórios.', 'erro');
    return;
  }

  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (resposta.ok) {
      mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');
      document.getElementById('formCadastro').reset();
      campoTipoArma.classList.add('oculto');
      campoTelefone.classList.add('oculto');
    } else {
      mostrarMensagem('Erro ao cadastrar.', 'erro');
    }

  } catch (erro) {
    mostrarMensagem('Erro de conexão com o servidor.', 'erro');
  }
});

function mostrarMensagem(texto, tipo) {
  mensagem.innerHTML = `
    <div class="alerta ${tipo}">
      ${texto}
    </div>
  `;
}

// DARK MODE

const darkBtn = document.getElementById('darkModeBtn');

if (darkBtn) {
  darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}