
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let usuarios = [];

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const usuario = {
    id: Date.now(),
    ...req.body
  };

  usuarios.push(usuario);

  res.status(201).json({
    mensagem: 'Cadastro realizado',
    usuario
  });
});

app.put('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);

  usuarios = usuarios.map(usuario =>
    usuario.id === id ? { ...usuario, ...req.body } : usuario
  );

  res.json({ mensagem: 'Atualização de dados concluída' });
});

app.delete('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);

  usuarios = usuarios.filter(usuario => usuario.id !== id);

  res.json({ mensagem: 'Exclusão realizada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
