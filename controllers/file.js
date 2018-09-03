//  文件处理api
const {uploadFile, deleteFile} = require('../modules/file')

/**
 * @api {post} /file/upload 上传文件
 * @apiVersion 1.0.0
 * @apiGroup File
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
const uploadFileApi = async (ctx) => {
  let file = ctx.request.files.file
  let filePath = ctx.query.path
  ctx.state = await uploadFile(file, filePath)
}

/**
 * @api {delete} /file/delete 删除文件
 * @apiVersion 1.0.0
 * @apiGroup File
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
const deleteFileApi = async (ctx) => {
  let filename = ctx.params.filename
  let filePath = ctx.query.path
  ctx.state = await deleteFile(filename, filePath)
}

module.exports = {
  uploadFileApi,
  deleteFileApi
}
