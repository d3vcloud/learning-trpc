import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';

const PRODUCTS = [
  {
    id: 1,
    name: 'Computer',
    price: 12.5
  }
];
const appRouter = trpc
  .router()
  .query('getProducts', {
    resolve(req) {
      return {
        products: PRODUCTS
      };
    }
  })
  .mutation('createProduct', {
    input: z.object({
      id: z.number(),
      name: z.string(),
      price: z.number()
    }),
    async resolve({ input }) {
      PRODUCTS.unshift(input);
      return 'Product created 📦';
    }
  });

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null
  })
);
app.listen(3000, () => {
  console.log('Listening 3000');
});
