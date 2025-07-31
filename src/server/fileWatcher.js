import chokidar from 'chokidar'

export function watchFiles(broadcast) {
  chokidar.watch('./src/client').on('change', (file) => {
    console.log('🔁 Changed:', file)
    broadcast({ type: 'reload' })
  })
}
