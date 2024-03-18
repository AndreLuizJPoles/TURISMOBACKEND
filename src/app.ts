import { ExpressServer } from "./adapters/api/express/server";
import "dotenv/config";

const app = () => {
  const expressServer = new ExpressServer();

  expressServer.startServer();
};

app();
