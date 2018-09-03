const fs = require('fs')
const {encriptUrl} = require('../utils/encrypt')

// uploadFile
const uploadFile = async (file, filePath) => {
  const filename = file.name
  const newFilename = encriptUrl(filename)
  try {
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(`upload/${filePath}/${newFilename}`)
    reader.pipe(upStream)
  } catch (error) {
    console.error(error)
    return {
      code: -1,
      msg: `上传失败！`
    }
  }
  return {
    code: 0,
    msg: `上传成功！`,
    data: {
      filename: `${newFilename}`
    }
  }
}

// deleteFile
const deleteFile = async (filename, filePath) => {
  // 删除文件
  const newFilename = encriptUrl(filename)
  fs.unlink(`./upload/${filePath}/${newFilename}`, (error) => {
    console.error(error)
    return {
      code: -1,
      msg: '删除失败！'
    }
  })
  return {
    code: 0,
    msg: `${newFilename}删除成功！`
  }
}

module.exports = {
  uploadFile,
  deleteFile
}
