
CREATE DATABASE lyra;

USE lyra;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  endereco VARCHAR(255),
  violencia VARCHAR(100),
  arma VARCHAR(20),
  tipoArma VARCHAR(100),
  contatoEmergencia VARCHAR(20),
  telefone VARCHAR(20)
);