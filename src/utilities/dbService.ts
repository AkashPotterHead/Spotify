/* import { MongoClient, Db } from "mongodb";

// class MongoDBService {//Singleton class with a private constructor, to use only one object 
//     private static instance: MongoDBService;
//     private client: MongoClient;
//     private db?: Db;

//     private constructor(private uri: string, private dbName: string) {
//         this.client = new MongoClient(this.uri);
//     }

//     static getInstance(): MongoDBService {
//         if (!this.instance) {
//             this.instance = new MongoDBService(process.env.MONGO_URI as string, process.env.MONGO_DB_NAME as string);
//         }
//         return this.instance;
//     }

//     async connect(): Promise<void> {
//         try {
//             await this.client.connect();
//             this.db = this.client.db(this.dbName);
//             console.log(`Connected to Mongo Database: ${this.db?.databaseName}`);
//         } catch (error) {
//             console.error("MongoDB connection error:", error);
//             throw error;
//         }
//     }

//     getDatabase(): Db {
//         if (!this.db) {
//             throw new Error("Database connection not established");
//         }
//         return this.db;
//     }

//     async disconnect(): Promise<void> {
//         await this.client.close();
//         console.log("Disconnected from MongoDB");
//     }
// }

// export const mongoDBService = MongoDBService.getInstance();
*/

import mongoose from "mongoose";
import { CustomError } from "../utilities/customError";

class MongoDBService {
    private static instance: MongoDBService;
    private dbUri = process.env.MONGO_URI as string;

    private constructor() { }

    static getInstance(): MongoDBService {
        if (!MongoDBService.instance) {
            MongoDBService.instance = new MongoDBService();
        }
        return MongoDBService.instance;
    }

    async connect(): Promise<void> {
        if (mongoose.connection.readyState === 1) return;

        try {
            await mongoose.connect(this.dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as mongoose.ConnectOptions);
            console.log("Connected to MongoDB.");
        } catch (error) {
            throw new CustomError("Failed to connect to MongoDB.", 500);
        }
    }

    async insertOne<T>(model: mongoose.Model<any>, data: T) {
        try {
            const record = new model(data);
            await record.save();
        } catch (error) {
            throw new CustomError("Database insertion failed.", 500);
        }
    }
}

export const mongoDBService = MongoDBService.getInstance();

