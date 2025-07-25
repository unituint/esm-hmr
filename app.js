export function renderApp() {
  document.body.style.background = (
    'hsl(' + Math.random() * 360 + ', 60%, 80%)'
  )
  document.getElementById('time').textContent = (
    'Rendered at ' + new Date().toLocaleTimeString()
  )
}