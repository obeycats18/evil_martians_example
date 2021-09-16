const request = require("supertest");
const { deepEqual } = require("assert");

const { createApplication } = require("../express");
const { CheckoutController } = require("../controllers/CheckoutController");
const { ProductController } = require("../controllers/ProductController");

const { MOCK_PRODUCTS, MOCK_CHECKOUT_PAYLOAD } = require("./mocks");

const MOCK_SERVER_PORT = 3001;

const productController = new ProductController();
const checkoutController = new CheckoutController();

const app = createApplication({
  port: MOCK_SERVER_PORT,
  controllers: [productController, checkoutController],
});

describe("/products", () => {
  it("GET /products. Should return array of products", (done) => {
    request(app)
      .get(productController.path)
      .expect(200)
      .expect((response: any) => {
        deepEqual(response.body, MOCK_PRODUCTS);
      })
      .end(done);
  });
});

describe("/checkout", () => {
  it("POST /checkout. Should return the same body as received", (done) => {
    request(app)
      .post(checkoutController.path)
      .send(MOCK_CHECKOUT_PAYLOAD)
      .expect((response: any) => {
        deepEqual(response.body, MOCK_CHECKOUT_PAYLOAD);
      })
      .expect(200)
      .end(done);
  });
});
