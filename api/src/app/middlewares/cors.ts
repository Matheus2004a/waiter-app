import { Request, Response, NextFunction } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://www.waiter-app.vercel.app'
  ];

  const origin = req.get('origin');
  const isAllowed = allowedOrigins.includes(origin!);

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
  }

  next();
};
