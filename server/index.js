import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

import { 
  dataUser , 
  dataProduct, 
  dataProductStat, 
  dataTransaction ,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js"

/* CONFIG */
dotenv.config();

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in .env file");
}
/* MIDDLEWARE */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "MERN Admin Dashboard Backend is running 🚀",
  });
});

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* SERVE REACT APP FOR ALL OTHER ROUTES (CATCH-ALL) */
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

/* DB + SERVER */
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL)

  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     
     /* ONLY ADD DATA ONE TIME */
     // Clear existing data and insert new data
     //OverallStat.deleteMany({}).then(() => {
       //OverallStat.insertMany(dataOverallStat);
       //console.log('OverallStat data seeded successfully');
     //});
    // AffiliateStat.insertMany(dataAffiliateStat);
    //User.insertMany(dataUser);
    //Product.insertMany(dataProduct);
    //Transaction.insertMany(dataTransaction);
    //ProductStat.insertMany(dataProductStat);
    })
  .catch((error) =>
    console.error("MongoDB connection failed:", error.message)
  );
