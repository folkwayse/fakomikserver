import { Hono } from "hono";
import { html } from "hono/html";
import Head from "../../views/head";
const appRoutes = new Hono();
const Footer = () => html `
  <footer>
    <address>My Address...</address>
  </footer>
`;
appRoutes.get("/", (c) => {
    const messages = ["Good Morning", "Good Evening", "Good Night"];
    return c.html(Head());
});
export default appRoutes;
