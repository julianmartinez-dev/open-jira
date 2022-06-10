# Next.js OpenJira App
Para correr localmente se necesita la base de datos
```
 docker-compose up -d
```

*El -d, significa detached

MongoDB URL Local:

```
 mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Llenar la base de datos con información de pruebas

Llamar a:
```
http://localhost:3000/api/seed
```