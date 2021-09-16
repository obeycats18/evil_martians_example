import { Router } from "express";

export class Controller {
  public path: string;
  public router: Router;

  constructor() {
    this.path = "";
    this.router = Router();
  }

  public setRouters() {}
}
