<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

Base inicial usando el TypeScript de [Nest](https://github.com/nestjs/nest) Framework.

## Installation

```bash
$ git clone git@github.com:MrCIMD/Base-NestJs.git
$ cd Base-NestJs/ && npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations

```bash
$ npm run typeorm:migrate first_migration
$ npm run typeorm:run --config .env
$ npm run typeorm:revert --config .env
$ npm run typeorm:drop --config .env
$ npm run typeorm:sync --config .env
```

```bash
$ npm run seeds:run .env
```

## Stay in touch

- Author - [Caleb Mora](https://github.com/MrCIMD/)

## License

Nest is [MIT licensed](LICENSE).
