import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
const Layout = (props) => {
    return (_jsx("html", { children: _jsx("body", { children: props.children }) }));
};
const Top = (props) => {
    return (_jsxs(Layout, { children: [_jsx("h1", { children: "Hello Hono!" }), _jsx("ul", { children: props.messages.map((message) => {
                    return _jsxs("li", { children: [message, "!!"] });
                }) })] }));
};
export default Top;
