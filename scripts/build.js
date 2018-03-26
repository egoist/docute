const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const projects = ['markdown-it-headings']

Promise.all(
  projects.map(p =>
    execa('yarn', ['run', 'build'], {
      cwd: path.join(__dirname, '../packages', p)
    }).then(({ stdout }) => {
      console.log(chalk.blue.inverse(` ${p} `))
      console.log(stdout)
    })
  )
)
