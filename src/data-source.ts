import { DataSource } from "typeorm";
import { Book } from "./models/Book";
import { Member } from "./models/Member";
import { Checkout } from "./models/Checkout";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "library.sqlite",
    synchronize: true,
    logging: true,
    entities: [Book, Member, Checkout],
    subscribers: [],
    migrations: [],
});
