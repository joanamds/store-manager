# :department_store: Store Manager!

Para esta aplicação precisamos criar uma API que simulasse o funcionamento de uma loja, armazenando dados de produtos e de vendas. Foi preciso fazer o CRUD nas rotas ```/sales``` e ```/products```. Para criar as rotas e interagir com o banco de dados foi utilizado a Arquitetura MSC (Model, Service e Controller). Também foram criados testes para as camadas MSC usando Mocha. 

[screen-recording (10).webm](https://user-images.githubusercontent.com/106452876/220152697-10136d88-dbb4-4cf7-9635-732a030ffd1c.webm)

## Tecnologias usadas
Back-end:
> Desenvolvido usando: Docker, docker-compose, SQL, Node.js, Mocha

## Instalando Dependências
### Com Docker
> Backend

* Primeiro instale os containers: 
```bash
docker-compose up -d
``` 

* Em seguida abra o terminal interativo do container: 
```bash
docker exec -it store_manager bash
``` 

* Instale as dependências dentro do container: 
```bash
npm install
``` 

> Para rodar a API 

* Rode o seguinte comando dentro do container: 
```bash
npm run debug
```

> Testes

* Dentro do terminal do container:
```bash
npm test
``` 
* Para rodar os testes unitários: 
```bash
npm run test:mocha
```

### Sem Docker

* Instale as dependências [Caso existam]
```bash
npm install
``` 

* Renomeie o arquivo '.env.example' para '.env'

* Execute a aplicação com 
```bash
npm start
```

Ou: 

```bash
npm run debug
```

> Testes

* Rode o comando:
```bash
npm test
``` 

* Para rodar os testes unitários:
```bash
npm run test:mocha
```

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://joanamds.github.io/#/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dev-joanamds/)

