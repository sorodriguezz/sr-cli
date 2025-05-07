import * as mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: Options): Promise<boolean> {
        const {mongoUrl, dbName} = options;
        try {
            await mongoose.connect(mongoUrl, {dbName: dbName});
            console.log("Connected to MongoDB");
            return true;
        } catch (error) {
            console.log("MongoDatabase connection error: " + mongoUrl);
            throw error;
        }
    }
}