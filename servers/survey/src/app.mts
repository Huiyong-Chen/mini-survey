import { Hono } from 'hono';
import mockList from './mock/index.mts';

const app = new Hono();

const a = async () => {};

// app.use('*', cors());

function randomTimer<T, CTX>(fn: (ctx: CTX) => T, ctx: CTX) {
  const delay = Math.floor(Math.random() * 2000);

  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      (async () => {
        return await fn(ctx);
      })()
        .then((res) => resolve(res))
        .catch(reject);
    }, delay);
  });
}

app.get('/', (c) => c.text('Hello Data Lens'));

mockList.forEach((item) => {
  const { url, method, response } = item;
  app[method](url, async (ctx) => {
    const res = await randomTimer(response, ctx);
    return ctx.json(res);
  });
});

export default app;
