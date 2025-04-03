# Api Licita

### Instalación

Clona el repositorio y navega hasta el directorio:

```bash
git clone https://github.com/StefanoP21/api-licita.git
#or
git clone git@github.com:StefanoP21/api-licita.git
```

### Instala las dependencias:

```bash
npm i
#or
pnpm i
```

### Variables de Entorno

Cree un archivo .env en la carpeta raíz de su proyecto y añada sus variables. Consulte .env.example para obtener ayuda.

### Base de Datos

Asegúrese de tener Docker instalado y en ejecución. Luego, ejecute el siguiente comando para iniciar la base de datos:

```bash
docker-compose up -d
```

Para comprobar que la base de datos está en funcionamiento, ejecute:

```bash
docker ps
```

Esto debería mostrar un contenedor en ejecución con el nombre `opportunities-db`.

Si la base de datos no se inicia correctamente, asegúrese de que el puerto 5432 no esté en uso por otro servicio y que las credenciales en su archivo .env coincidan con las de su archivo docker-compose.yml.

### Ejecución en modo de desarrollo

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run start:dev
#or
pnpm run start:dev
```

## API Endpoints

| HTTP Verbs | Endpoints                               | Action                               | Parameters                                        |
| ---------- | --------------------------------------- | ------------------------------------ | ------------------------------------------------- |
| GET        | /api/opportunities/page/:pageSize/:page | Para obtener todos las oportunidades | pageSize, page, followed, type, dateInit, dateEnd |
| PATCH      | /api/opportunities/:id                  | Para editar una oportunidad          | id                                                |

## Swagger

La API tiene una documentación Swagger integrada. Para acceder a ella, abre tu navegador y ve a:

```
http://localhost:4040/api
```

Esto te permitirá explorar y probar los endpoints de la API de manera interactiva.

### Tecnologías

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Fastify](https://www.fastify.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)

### Autor

- [Stefano Palomino](https://github.com/StefanoP21)
