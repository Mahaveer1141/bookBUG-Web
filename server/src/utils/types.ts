import { Request, Response } from "express";

export type MyContext = {
  req: Request & any;
  res: Response;
};
