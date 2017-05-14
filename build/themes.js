#!/usr/bin/env node
const fs = require('fs')
const postcss = require('postcss')
const cssbag = require('cssbag')
const cssnano = require('cssnano')

const files = fs.readdirSync('./src/css').filter(n => n.startsWith('theme-'))

Promise.all(
  files.map(file => {
    const content = fs.readFileSync(`./src/css/${file}`, 'utf8')
    return postcss([cssbag, cssnano]).process(content).then(result => {
      fs.writeFileSync(`./dist/${file}`, result.css, 'utf8')
    })
  })
)
  .then(() => {
    console.log('Done building themes!')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
