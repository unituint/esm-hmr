import { renderApp } from './app.js'

renderApp()

const socket = new WebSocket('ws://localhost:3000')

socket.addEventListener('message', async (event) => {
  const msg = JSON.parse(event.data)
  
  if (msg.type === 'reload') {
    console.log('♻️ Reloading module...')
    const mod = await import('./app.js?ts=' + Date.now())
    mod.renderApp()
  }
})
