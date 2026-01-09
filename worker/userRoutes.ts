import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Custom API routes removed for production hardening.
    // Static assets are handled by the Cloudflare Assets binding.
}