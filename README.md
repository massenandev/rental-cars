# Cadastro de carro
## Requisitos funcionais

Deve ser possível:
- Cadastrar um novo carro;
- Listar todas as categorias.

## Regras de negócio
- Por padrão, o carro deve ser cadastrado com disponibilidade;
- O usuário responsável pelo cadastro deve ser um administrador.

Não deve ser possível:

- Cadastrar um carro com uma placa já existente;


# Listagem de carros
## Requisitos funcionais
Deve ser possível:
- Listar todos os carros disponíveis;
- Listar todos os carros disponíveis pelo nome da categoria;
- Listar todos os carros disponíveis pelo nome da marca;
- Listar todos os carros disponíveis pelo nome do carro.

## Regras de negócio
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro
## Requisitos funcionais

Deve ser possivel:
- Cadastrar uma especificação para um carro;
- Listar todas as especificações;
- Listar todos os carros.

## Regras de negócio
- O usuário responsável pelo cadastro deve ser um administrador.

Não deve ser possivel cadastrar uma especificação:
- Para um carro não cadastrado;
- Já existente para o mesmo carro.

# Cadastro de imagens do carro
## Requisitos funcionais

Deve ser possivel:
- Cadastrar a imagem do carro;

## Requisitos não funcionais
- Utilizar o multer para upload dos arquivos

## Regras de negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- O usuário responsável pelo cadastro deve ser um administrador.


# Aluguel de carro

## Requisitos funcionais

Deve ser possivel:
- Cadastrar um aluguel

## Regras de negócio
- O aluguel deve ter duração mínima de 24h.

Não deve ser possível:
- Cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário;
- Cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro.
