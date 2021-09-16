import { createApplication } from "./express";

import { CheckoutController } from "./controllers/CheckoutController";
import { ProductController } from "./controllers/ProductController";

const EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT || "3000");
const ARG_EXPRESS_PORT = parseInt(
  process.argv.find((arg) => arg.includes("PORT"))?.split("=")[1]!
);

createApplication({
  port: ARG_EXPRESS_PORT || EXPRESS_PORT,
  controllers: [new ProductController(), new CheckoutController()],
});
