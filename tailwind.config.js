/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                main: " 'Roboto Slab', serif",
            },
            colors: {
                primary: {
                    100: "#9DC107",
                    200: "#499925",
                    300: "#28600c",
                },
                grey: {
                    100: "#d2d2d2",
                    200: "#404043",
                },
                dark: { 100: "#231f20", 200: "#131212" },
                light: "efefef",
            },
        },
        boxShadow: {
            solid: "0 0 0 2px #404043",
        },
    },
    plugins: [],
};
