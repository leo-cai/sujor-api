//  图片处理api
const {uploadImage, deleteImage} = require('../modules/image')

/**
 * @api {post} /image/upload 上传图片
 * @apiVersion 1.0.0
 * @apiGroup Image
 *
 * @apiSuccessExample {JSON} 返回成功示例
   {
      code: 0,
      msg: '上传成功！'
    }
 *
 * @apiErrorExample {JSON} 返回失败示例
   {
      code: -1,
      msg: '上传失败！'
    }
 */
const uploadImageApi = async (ctx) => {
  let image = ctx.request.files.file
  let imagePath = ctx.query.path
  ctx.state = await uploadImage(image, imagePath)
}

/**
 * @api {delete} /image/delete 删除图片
 * @apiVersion 1.0.0
 * @apiGroup Image
 *
 * @apiSuccessExample {JSON} 返回成功示例
   {
      code: 0,
      msg: '删除成功！'
    }
 *
 * @apiErrorExample {JSON} 返回失败示例
   {
      code: -1,
      msg: '删除失败！'
    }
 */
const deleteImageApi = async (ctx) => {
  let imageName = ctx.params.imageName
  let imagePath = ctx.query.path
  ctx.state = await deleteImage(imageName, imagePath)
}

module.exports = {
  uploadImageApi,
  deleteImageApi
}
