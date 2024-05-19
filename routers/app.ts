import { Hono } from "hono";
import { html, raw } from "hono/html";
import Head from "../views/head"

const appRoutes = new Hono();

interface SiteData {
  title: string;
  description: string;
  image: string;
  children?: any;
}

const Footer = () => html`
  <footer>
    <address>My Address...</address>
  </footer>
`;


appRoutes.get("/", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(Head());
});

export default appRoutes;
