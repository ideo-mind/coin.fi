import { Hono } from "hono";
import { Env } from './core-utils';
import type { DemoItem, ApiResponse, WaitlistEntry } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'Coin Fi API' }}));
    // Retrieve waitlist count
    app.get('/api/waitlist', async (c) => {
        try {
            const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
            const count = await stub.getWaitlistCount();
            return c.json({ 
                success: true, 
                data: { count } 
            } satisfies ApiResponse<{ count: number }>);
        } catch (err) {
            return c.json({ success: false, error: 'Failed to fetch metrics' }, 500);
        }
    });
    // Handle FormData waitlist submission
    app.post('/api/waitlist', async (c) => {
        try {
            const formData = await c.req.formData();
            const email = formData.get('email') as string;
            const platformsRaw = formData.get('platforms') as string;
            if (!email) {
                return c.json({ success: false, error: 'Email is required' }, 400);
            }
            let platforms: string[] = [];
            try {
                platforms = platformsRaw ? JSON.parse(platformsRaw) : [];
            } catch (e) {
                platforms = [];
            }
            const entry: WaitlistEntry = {
                email,
                platforms,
                timestamp: new Date().toISOString()
            };
            const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
            await stub.addWaitlistEntry(entry);
            return c.json({ success: true } satisfies ApiResponse);
        } catch (err) {
            console.error('Waitlist submission error:', err);
            return c.json({ success: false, error: 'Internal server error' }, 500);
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