import { Hono } from "hono";
import { html, raw } from "hono/html";


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
  return c.text('hello from server');
});

export default appRoutes;
