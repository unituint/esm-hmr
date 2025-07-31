# esm-hmr

Minimal dev server with native ES modules and hot module reload (HMR).  
Node.js, WebSocket, and chokidar.

---

## Getting Started

```bash
npm install
npm run server

# Open http://localhost:3000 in your browser

# On file change:
# - chokidar detects it
# - WebSocket sends reload event
# - browser re-imports the module with:
#     import('./app.js?ts=' + Date.now())
