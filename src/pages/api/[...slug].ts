import { NextApiRequest, NextApiResponse } from 'next';
import app from '../../express-app';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (result: any) => {
        if (result instanceof Error) {
            return reject(result);
        }
        return resolve(result);
    });
  });
}
