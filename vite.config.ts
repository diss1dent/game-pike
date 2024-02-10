import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  resolve: {
    alias: {
      'phaser': 'phaser/dist/phaser.min.js'
    }
  },
  plugins: [
    solid(),
    // BANDLE ANALYTICS
    // visualizer({
    //   open: true, // Это автоматически откроет отчет в браузере после сборки
    //   filename: 'bundle-analysis.html' // Имя файла отчета
    // })
  ],
})
