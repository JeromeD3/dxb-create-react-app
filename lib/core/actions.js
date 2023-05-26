// 封装create指令的acitons
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { reactRepo } = require('../config/repo-config')

// callback ---> promisify ---> Promise ---> async await
const createProjectActions = async (project, others) => {
  // 1，clone项目
  await download(reactRepo, project, { clone: true })

  // 2,运行npm install

  // 3，运行npm run dev
}

module.exports = createProjectActions
