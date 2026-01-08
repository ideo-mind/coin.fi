import { Hono } from "hono";
import { Env } from './core-utils';
import type { DemoItem, ApiResponse } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'Coin Fi API' }}));
    app.get('/api/demo', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getDemoItems();
        return c.json({ success: true, data } satisfies ApiResponse<DemoItem[]>);
    });
    app.get('/api/counter', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getCounterValue();
        return c.json({ success: true, data } satisfies ApiResponse<number>);
    });
    app.post('/api/counter/increment', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.increment();
        return c.json({ success: true, data } satisfies ApiResponse<number>);
    });
}