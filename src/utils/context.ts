import { ContextFunction } from 'apollo-server-core';
import { Request, Response } from 'express';
import models, { Models } from '../models';

export type Context = {
  models: Models;
  req: Request;
  res: Response;
};

export const createContext: ContextFunction = ({ req, res }): Context => ({
  models,
  req,
  res,
});
