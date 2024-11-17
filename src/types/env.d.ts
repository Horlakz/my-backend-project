import { Secret } from "jsonwebtoken";

declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: Secret;
    DATABASE_HOST: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
  }
}
