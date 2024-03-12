import { ExpressServer } from "./adapters/api/express/server";

const app = () => {
  const expressServer = new ExpressServer();

  expressServer.startServer();
};

app();
