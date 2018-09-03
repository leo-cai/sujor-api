const fs = require('fs')
const {encriptUrl} = require('../utils/encrypt')
const {imageResize, imageCompress, coverResize, coverCompress} = require('../utils/image')

// uploadImage
const uploadImage = async (image, imagePath) => {
  // 原图
  const imageName = encriptUrl(image.name)
  try {
    const rs = fs.createReadStream(image.path)
    const ws= fs.createWriteStream(`upload/${imagePath}/${image.name}`)
    rs.on('end', () => {
      console.log(`read ${image.name} successfully !`)
    })
    ws.on('finish', () => {
      if (imagePath === 'cover') {
        // 转封面图尺寸原图
        coverResize(image.name, imageName, imagePath)
        // 生成封面图压缩图
        coverCompress(image.name, imageName, imagePath)
      } else {
        // 转尺寸原图
        imageResize(image.name, imageName, imagePath)
        // 生成压缩图
        imageCompress(image.name, imageName, imagePath)
      }
      console.log(`write r${image.name} successfully !`)
    })
    rs.pipe(ws)
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
      imagename: `${imageName}`,
      pre_imagename: `r${imageName}`
    }
  }
}

// deleteImage
const deleteImage = async (imageName, imagePath) => {
  // 删除转尺寸原图
  fs.unlink(`upload/${imagePath}/${imageName}`, (error) => {
    console.error(error)
    return {
      code: -1,
      msg: '删除失败！'
    }
  })
  // 删除压缩图
  fs.unlink(`upload/${imagePath}/r${imageName}`, (error) => {
    console.error(error)
    return {
      code: -1,
      msg: '删除失败！'
    }
  })
  return {
    code: 0,
    msg: `${imageName}删除成功！`
  }
}

module.exports = {
  uploadImage,
  deleteImage
}
