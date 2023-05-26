// 封装create指令的acitons
const ora = require('ora')
const chalk = require('chalk')

const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

const { reactRepo } = require('../config/repo-config')
const { spawnCommand } = require('../utils/terminal')

// 定义一个loading
const gitRepoSpinner = ora('Downloading github repo, please wait a while...')

// callback ---> promisify ---> Promise ---> async await
const createProjectActions = async (project, others) => {
  console.log(chalk.green.underline.bold('> Start download repo...'))
  gitRepoSpinner.start()

  // 1，clone项目
  await download(reactRepo, project, { clone: true })
  console.log(chalk.green('> 模板下载完成，开始 pnpm install...'))
  gitRepoSpinner.succeed()

  // 2. 执行 npm install
  // 需要判断一下平台，window 执行 npm 命令实际执行的 npm.cmd
  const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
  await spawnCommand(command, ['install'], { cwd: `./${project}` })

  // 3，运行npm run dev
  await spawnCommand(command, ['run', 'dev'], { cwd: `./${project}` })
}

module.exports = createProjectActions
