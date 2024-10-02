import { Request, Response } from "express";

const notFound = (req: Request, res: Response): Response =>
  res.status(404).send("Route does not exist : please check the route)");

export default notFound;
