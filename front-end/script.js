/*
  Lyra — script.js
  Lógica de interações do site
  Autora: Júlia das Neves Paim, Luma Cristina, Alexandre Brito, Fredson Rafael,Murilo de Assis.
*/


// =============================================
// SAÍDA RÁPIDA DE EMERGÊNCIA
// Redireciona para o Google de forma discreta,
// sem deixar a página Lyra no histórico do navegador
// =============================================

const botaoSair = document.getElementById('quickExit');

if (botaoSair) {
  botaoSair.addEventListener('click', function (e) {
    e.preventDefault();
    // replace() substitui a entrada no histórico — ao pressionar "voltar",
    // o navegador não retorna para o Lyra
    window.location.replace('https://www.google.com.br');
  });
}

// Atalho de teclado: pressionar ESC duas vezes rapidamente também sai
let contagemEsc = 0;
let timerEsc;

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;

  contagemEsc++;
  clearTimeout(timerEsc);

  timerEsc = setTimeout(function () {
    contagemEsc = 0;
  }, 1000);

  if (contagemEsc >= 2) {
    window.location.replace('https://www.google.com.br');
  }
});


// =============================================
// MÁSCARA DE TELEFONE
// Formata o campo conforme a usuária digita:
// (XX) XXXXX-XXXX para celular
// (XX) XXXX-XXXX para fixo
// =============================================

const campTelefone = document.getElementById('telefone');

if (campTelefone) {
  campTelefone.addEventListener('input', function () {
    // remove tudo que não for número
    let numeros = this.value.replace(/\D/g, '');

    // limita a 11 dígitos (2 DDD + 9 do celular)
    if (numeros.length > 11) numeros = numeros.slice(0, 11);

    // aplica a máscara dependendo do tamanho
    if (numeros.length <= 10) {
      this.value = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      this.value = numeros.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  });
}


// =============================================
// VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
// =============================================

function cadastrarUsuario() {
  const nome      = document.getElementById('nome');
  const email     = document.getElementById('email');
  const telefone  = document.getElementById('telefone');
  const senha     = document.getElementById('senha');
  const confirmar = document.getElementById('confirmarSenha');

  // limpa qualquer erro visual anterior
  document.querySelectorAll('.form-input').forEach(function (campo) {
    campo.style.borderColor = '';
    campo.style.boxShadow   = '';
  });

  // marca o campo com erro e foca nele
  function marcarErro(campo) {
    campo.style.borderColor = '#E07A5F';
    campo.style.boxShadow   = '0 0 0 4px rgba(224, 122, 95, 0.15)';
    campo.focus();
  }

  // validações em ordem
  if (!nome || nome.value.trim() === '') {
    marcarErro(nome);
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!email || !emailValido) {
    marcarErro(email);
    return;
  }

  const telefoneLimpo = telefone.value.replace(/\D/g, '');
  if (!telefone || telefoneLimpo.length < 10) {
    marcarErro(telefone);
    return;
  }

  if (!senha || senha.value.length < 8) {
    marcarErro(senha);
    return;
  }

  if (!confirmar || confirmar.value !== senha.value) {
    marcarErro(confirmar);
    return;
  }

  // tudo certo: esconde o formulário e mostra a tela de sucesso
  const formulario = document.getElementById('formCadastro');
  const sucesso    = document.getElementById('mensagemSucesso');

  if (formulario && sucesso) {
    formulario.style.display  = 'none';
    sucesso.style.display     = 'block';
  }
}

// função chamada pelo botão da tela de boas-vindas (index.html)
function cadastroUsuario() {
  window.location.href = 'cadastro.html';
}


// =============================================
// ANIMAÇÃO DE ENTRADA DOS CARDS
// Usa IntersectionObserver para animar cada
// card conforme ele entra na viewport
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // BANNER ROTATIVO DE FRASES DE APOIO (setInterval)
  // Alterna automaticamente as frases no hero
  // da Home a cada 4 segundos
  // =============================================

  const frasesBanner = [
    {
      olho:    'Plataforma de apoio',
      titulo:  'Sua dignidade<br>é <em>inegociável.</em>',
      descricao: 'Uma plataforma digital de apoio às vítimas de violência doméstica, com suporte especializado e informações confiáveis para cada etapa do processo. Discreta, segura e acessível.'
    },
    {
      olho:    'Você não está sozinha',
      titulo:  'Estamos aqui<br><em>por você.</em>',
      descricao: 'A Lyra conecta você a uma rede de apoio real: profissionais de saúde, jurídico e social prontos para ouvir e ajudar, 24 horas por dia, com total sigilo.'
    },
    {
      olho:    'Segurança em primeiro lugar',
      titulo:  'Saia com<br><em>um clique.</em>',
      descricao: 'O botão de Saída Rápida e o atalho ESC+ESC permitem que você feche o site instantaneamente, sem deixar rastros no histórico do navegador.'
    }
  ];

  const elOlho     = document.querySelector('.hero-olho');
  const elTitulo   = document.querySelector('.hero-titulo');
  const elDescricao = document.querySelector('.hero-descricao');

  // só roda na Home, onde os elementos existem
  if (elOlho && elTitulo && elDescricao) {
    let indiceFrase = 0;

    function trocarFrase() {
      // avança para a próxima frase (volta ao início quando chega no fim)
      indiceFrase = (indiceFrase + 1) % frasesBanner.length;
      const frase = frasesBanner[indiceFrase];

      // 1. Aplica fade-out
      elOlho.style.opacity     = '0';
      elTitulo.style.opacity   = '0';
      elDescricao.style.opacity = '0';

      // 2. Troca o conteúdo no meio do fade e faz fade-in
      setTimeout(function () {
        elOlho.textContent      = frase.olho;
        elTitulo.innerHTML      = frase.titulo;
        elDescricao.textContent = frase.descricao;

        elOlho.style.opacity     = '1';
        elTitulo.style.opacity   = '1';
        elDescricao.style.opacity = '1';
      }, 400);
    }

    // adiciona a transição de opacidade via JS para não interferir com o CSS original
    [elOlho, elTitulo, elDescricao].forEach(function (el) {
      el.style.transition = 'opacity 0.4s ease';
    });

    // dispara a cada 4 segundos usando setInterval
    setInterval(trocarFrase, 4000);
  }


  // =============================================
  // CONTADOR ANIMADO NOS STAT-CARDS (setInterval)
  // Anima os números dos cards de estatística
  // ao carregar a página
  // =============================================

  const statCards = document.querySelectorAll('.stat-card');

  if (statCards.length > 0) {
    // alterna um destaque entre os cards a cada 3 segundos
    let cardAtivo = 0;

    function destacarCard() {
      statCards.forEach(function (card) {
        card.classList.remove('stat-card--ativo');
      });
      statCards[cardAtivo].classList.add('stat-card--ativo');
      cardAtivo = (cardAtivo + 1) % statCards.length;
    }

    destacarCard(); // já destaca o primeiro ao carregar
    setInterval(destacarCard, 3000);
  }


  // =============================================
  // RELÓGIO AO VIVO NA CENTRAL DE AJUDA (setInterval)
  // Atualiza o horário atual a cada segundo,
  // reforçando que o serviço está disponível agora
  // =============================================

  const relogio = document.getElementById('relogioAjuda');

  if (relogio) {
    function atualizarRelogio() {
      const agora   = new Date();
      const horas   = String(agora.getHours()).padStart(2, '0');
      const minutos = String(agora.getMinutes()).padStart(2, '0');
      const segundos = String(agora.getSeconds()).padStart(2, '0');
      relogio.textContent = 'Horário atual: ' + horas + ':' + minutos + ':' + segundos + ' — os serviços estão ativos agora.';
    }

    atualizarRelogio();              // exibe imediatamente
    setInterval(atualizarRelogio, 1000); // atualiza a cada segundo
  }


  // =============================================
  // destaca o link da página atual na navegação
  // =============================================

  const linksNav  = document.querySelectorAll('.nav-links a');
  const pagAtual  = window.location.pathname.split('/').pop();

  linksNav.forEach(function (link) {
    if (link.getAttribute('href') === pagAtual) {
      link.classList.add('active');
    }
  });

  // anima cards com scroll
  const elementosAnimados = document.querySelectorAll(
    '.stat-card, .recurso-item, .card-recurso, .card-contato, .passo-item, .dado-item, .card-membro, .card-etapa, .parceria-item'
  );

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada, indice) {
      if (entrada.isIntersecting) {
        setTimeout(function () {
          entrada.target.style.opacity   = '1';
          entrada.target.style.transform = 'translateY(0)';
        }, indice * 80);
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.1 });

  elementosAnimados.forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observador.observe(el);
  });

});

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