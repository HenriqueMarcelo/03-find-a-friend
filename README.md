# APP

GymPass style app.

### Regras da aplicação

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada


# RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por páginas;
- [x] O usuário deve ser identificado por um JWT (Json Web Token);


```
npx prisma init
npx prisma generate //gera a tipagem
npx prisma migrate dev
npx prisma studio

docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432  bitnami/postgresql
docker ps -a
docker start api-solid-pg
docker stop api-solid-pg 
docker ps -a
docker logs api-solid-pg
docker logs api-solid-pg -f

docker compose up -d
docker compose stop // para
docker compose down // para e apaga os containers

cd prisma/vitest-environment-prisma/
npm link

```
