import { dataSource } from "../data/db/Datasource";

export function initializePostgres() {
    dataSource.initialize()
       .then((source) => {
          console.info("Data Source has been initialized!");
          return source;
       })
       .catch((err) => {
          console.info("Error during Data Source initialization!", err);
       })
};