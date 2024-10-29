import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   username: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   dialect: 'postgres',
   port: 5432,
})

export default sequelize;