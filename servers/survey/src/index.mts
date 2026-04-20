import { serve } from '@hono/node-server';
import app from './app.mts';

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  ({ port }) => {
    console.log(`Server is running on http://localhost:${port}`);
  },
);
