import { Application } from './deps.ts';

import router from './router.ts';


const env = Deno.env.toObject();

const HOST = env.HOST || '127.0.0.1';

const PORT = env.PORT || 8080;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listen on port ${PORT}`);

const port: number = Number(PORT);

await app.listen({port });