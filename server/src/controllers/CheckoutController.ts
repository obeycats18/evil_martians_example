import { Request, Response } from "express";
import { Router } from "express";
import { Controller } from "./Controller";

export class CheckoutController extends Controller {
  path = "/checkout";
  router = Router();

  constructor() {
    super();
    this.setRouters();
  }

  setRouters() {
    this.router.post(this.path, this.postCheckout);
  }

  private postCheckout = (request: Request, response: Response) => {
    const { body } = request;

    if (!body) {
      return;
    }

    return response.status(200).json(body);
  };
}
