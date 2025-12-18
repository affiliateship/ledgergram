import { DataSourceOptions } from "typeorm";

export const postgres: DataSourceOptions = {
   "type": "postgres",
   "host": "127.0.0.1",
   "port": 5432,
   "username": "user",
   "password": "password",
   "database": "postgres",
   "entities": [
      "build/data/entity/*.js"
   ],
   "migrations": [
      "dist/data/migration/*.js"
   ],
   "synchronize": true,
   "migrationsRun": false,
   "logging": false,
   "dropSchema": true
};