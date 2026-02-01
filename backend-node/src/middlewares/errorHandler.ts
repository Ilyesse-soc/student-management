import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.stack || err.message);
  res.status(err.status || 500).json({ error: err.message || 'Erreur interne du serveur' });
}
