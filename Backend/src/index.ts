import app from "./app";
import { AppDataSource } from "./config/data-source";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error on database connection",error);
  });
