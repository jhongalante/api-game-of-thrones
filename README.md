# Challenge Newtail - API/NodeJS
#### API para a aplicação de registro e manipulação de casas da série de Game of Thrones com NodeJS/Typescript, Express, MySQL, Sequelize e Arquitetura em camadas.
## Decisão da Arquitetura Utilizada:
- A arquitetura da API foi baseada no DDD e Arquitetura Limpa, dividido em camadas de data, domain, infra, main e presentation e segui alguns padrões da arquitetura RESTful, tentando seguir algumas regras nas nomenclaturas e nas definições de uri para as rotas, utilizando rotas com nomes iguais, alterando apenas os verbos HTTP;

- Com o objetivo de tornar o projeto escalável e de fácil manuntenção, pois as responsabilidades ficam mais desacopladas e fáceis de se encontrar, e todo o projeto acaba ficando mais independente de fatores internos e externos, como banco de dados ou do próprio frontend;

- Além disso, se torna mais fácil de criar uma aplicação com boa cobertura de testes, pois com o código desacoplado e camadas com responsabilidades bem definidas, os testes acabam se tornando mais fáceis e naturais de serem escritos, e por consequência, de aplicar o próprio TDD;

- Essa arquitetura também me facilitou na própria aplicação dos conceitos do SOLID, pois facilitaram a definição de classes e camadas com responsabilidades únicas, a criação de extensões para as classes base, criação de interfaces bem granuladas e além da própria inversão de dependência e injeção de dependência com o auxílio das factories;

- E utilizei um padrão de testes com sut e stubs, para tornar os testes mais padronizados e de mais fácil manutenção, além de facilitar o desenvolvimento de novos testes;


## Bibliotecas de terceiros:
- express,
- fast-glob,
- axios,
- bcrypt,
- jsonwebtoken,
- mongodb,
- reflect-metadata,
- tsyringe,
- validator, 
- jest, 
- supertest
- dotenv, 
- eslint, 
- prettier,
- nodemon,
- sucrase
- swagger-ui-express

## Pontos de melhoria:
- Implementar search e sort na rota de list de house;

- Criação de um arquivo dockerfile e docker compose para criação de container Docker;



## Instructions
### Project setup
```
npm install
```
```
Rename .env.example to .env and set the database information
```

### Create database at MongoDB

### Run Server nodemon
```
npm run dev
```

### Run your unit tests
```
npm run test
```

#### Create a user at the route '/user' and generate it's token to use it at the header of the other routes
