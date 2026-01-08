import { Hono } from "hono";
import { Env } from './core-utils';
import type { DemoItem, ApiResponse, WaitlistEntry } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'Coin Fi API' }}));
    app.post('/api/waitlist', async (c) => {
        try {
            const body = await c.req.json() as { email: string; platforms: string[] };
            if (!body.email) return c.json({ success: false, error: 'Email is required' }, 400);
            const entry: WaitlistEntry = {
                email: body.email,
                platforms: body.platforms || [],
                timestamp: new Date().toISOString()
            };
            const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
            await stub.addWaitlistEntry(entry);
            return c.json({ success: true } satisfies ApiResponse);
        } catch (err) {
            return c.json({ success: false, error: 'Failed to join waitlist' }, 500);
        }
    });
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