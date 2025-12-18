import { DataSource } from "typeorm";
import { postgres } from "../../config/postgres";

export const dataSource = new DataSource(postgres);