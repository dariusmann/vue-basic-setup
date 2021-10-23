if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const proxy = require('http-proxy-middleware')
const express = require('express')

const app = express()
const apiProxy = proxy.createProxyMiddleware(
  '/api',
  {
    target: process.env.VUE_APP_BACKEND_API_URL,
    changeOrigin: true
  }
)

app.use('/api', apiProxy)

const serveStatic = require('serve-static')
const path = require('path')
app.use(serveStatic(path.join(__dirname, 'dist')))
const port = process.env.PORT || 80
app.listen(port)
