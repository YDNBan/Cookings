const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',  // This will match requests like "/api"
        createProxyMiddleware({
            target: 'http://localhost:5000',  // Your Express server
            changeOrigin: true,
        })
    );
};
