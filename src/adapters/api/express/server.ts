import express from "express";
import { mainRouter } from "./routes/assembleRoutes.routes";
import "dotenv/config";
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../../swagger.json'

export class ExpressServer {
  private app = express();
  private appPort = process.env.APP_PORT;

  startServer() {
    this.app.use(express.json());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    this.app.use("/api", mainRouter);

    this.app.listen(this.appPort, () =>
      console.log(`The server is running at: http://localhost:${this.appPort}`)
    );
  }
}
