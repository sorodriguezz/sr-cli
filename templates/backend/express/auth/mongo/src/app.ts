import {Server} from "./presentation/server";
import {envs} from './config';
import {AppRoutes} from "./presentation/routes";
import {MongoDatabase} from "./data";

(async () => {
    await main();
})()

async function main() {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}