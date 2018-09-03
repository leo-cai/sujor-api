const sharp = require('sharp')

/**
 *  图片处理 转400 x 300
 * @param {Object} imageName 图片名
 * @param {String} imagePath 路径
 */
const imageResize = (name, imageName, imagePath) => {
  sharp(`upload/${imagePath}/${name}`)
    .resize(400, 300)
    .toFile(`upload/${imagePath}/${imageName}`, (err, info) => {
      console.log(err, info)
    })
}

/**
 *  图片压缩处理
 * @param {Object} imageName 图片名
 * @param {String} imagePath 路径
 */
const imageCompress = (name, imageName, imagePath) => {
  sharp(`upload/${imagePath}/${name}`)
    .resize(40, 30)
    .toFile(`upload/${imagePath}/r${imageName}`, (err, info) => {
      console.log(err, info)
    })
}

/**
 *  封面图片处理 转150 x 200
 * @param {Object} imageName 图片名
 * @param {String} imagePath 路径
 */
const coverResize = (name, imageName, imagePath) => {
  sharp(`upload/${imagePath}/${name}`)
    .resize(150, 200)
    .toFile(`upload/${imagePath}/${imageName}`, (err, info) => {
      console.log(err, info)
    })
}

/**
 *  封面图片压缩处理
 * @param {Object} imageName 图片名
 * @param {String} imagePath 路径
 */
const coverCompress = (name, imageName, imagePath) => {
  sharp(`upload/${imagePath}/${name}`)
    .resize(15, 20)
    .toFile(`upload/${imagePath}/r${imageName}`, (err, info) => {
      console.log(err, info)
    })
}

module.exports = {
  imageResize,
  imageCompress,
  coverResize,
  coverCompress
}
