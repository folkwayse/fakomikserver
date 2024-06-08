"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const html_1 = require("hono/html");
const appRoutes = new hono_1.Hono();
const Footer = () => (0, html_1.html) `
  <footer>
    <address>My Address...</address>
  </footer>
`;
appRoutes.get("/", (c) => {
    return c.text('hello from server');
});
exports.default = appRoutes;
