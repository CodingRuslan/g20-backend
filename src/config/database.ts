import { ConnectionOptions } from "typeorm";
import {
  Country,
  Trade,
  Resource,
  ResourceOwner,
  Options,
  Build,
  IncreaseResources,
  ResourceCountRelations,
  Link } from '../entities'

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [Country, Trade, Resource, ResourceOwner, Options,
    Build, IncreaseResources, ResourceCountRelations, Link],
  // entities: ["src/entities/*.ts"],
  synchronize: true,
};

export default config;
