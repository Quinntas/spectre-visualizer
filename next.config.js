/** @type {import('next').NextConfig} */
const nextConfig = {}

const removeImports = require("next-remove-imports")();

module.exports = removeImports({
    experimental: {esmExternals: true}
});
