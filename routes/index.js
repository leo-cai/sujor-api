/**
 * 路由集合
 */
const router = require('koa-router')({
  prefix: '/v1'
})
const controllers = require('../controllers')
const {checkToken} = require('../utils/encrypt')

// -- 首页 -- //
// GET 首页列表
router.get('/index_list', controllers.home.getIndexListApi)

// -- 登录与鉴权 -- //
// POST 登录
router.post('/signin', controllers.auth.signInApi)
// POST 注册
router.post('/signup', controllers.auth.signUpApi)
// POST 注销
router.post('/signout', controllers.auth.signOutApi)

// -- 用户 -- //
// GET 用户列表
router.get('/users', checkToken, controllers.user.getUsersApi)
// GET 用户详情
router.get('/user', checkToken, controllers.user.getUserApi)
// PUT 更新用户
router.put('/user', checkToken, controllers.user.updateUserApi)

// -- 角色 -- //
// GET 角色列表
router.get('/roles', checkToken, controllers.role.getRolesApi)
// GET 角色详情
router.get('/role', checkToken, controllers.role.getRoleApi)
// POST 新增角色
router.post('/role', checkToken, controllers.role.addRoleApi)
// PUT 更新角色
router.put('/role', checkToken, controllers.role.updateRoleApi)
// DELETE 删除角色
router.delete('/role/:role_id', checkToken, controllers.role.deleteRoleApi)

// -- 权限 -- //
// GET 权限列表
router.get('/permissions', checkToken, controllers.permission.getPermissionsApi)
// GET 权限详情
router.get('/permission', checkToken, controllers.permission.getPermissionApi)
// POST 新增权限
router.post('/permission', checkToken, controllers.permission.addPermissionApi)
// PUT 更新权限
router.put('/permission', checkToken, controllers.permission.updatePermissionApi)
// DELETE 删除权限
router.delete('/permission/:permission_id', checkToken, controllers.permission.deletePermissionApi)

// -- 代码 -- //
// GET 代码列表
router.get('/codes', controllers.code.getCodesApi)
// GET 代码详情
router.get('/code', controllers.code.getCodeApi)
// POST 新增代码
router.post('/code', controllers.code.addCodeApi)
// PUT 更新代码
router.put('/code', controllers.code.updateCodeApi)
// DELETE 删除代码
router.delete('/code/:code_id', controllers.code.deleteCodeApi)

// -- 代码分类 -- //
// GET 代码分类列表
router.get('/code_categories', controllers.codeCategory.getCodeCategoriesApi)
// GET 代码分类详情
router.get('/code_category', controllers.codeCategory.getCodeCategoryApi)
// POST 新增分类代码
router.post('/code_category', controllers.codeCategory.addCodeCategoryApi)
// PUT 更新分类代码
router.put('/code_category', controllers.codeCategory.updateCodeCategoryApi)
// DELETE 删除代码分类
router.delete('/code_category/:category_id', controllers.codeCategory.deleteCodeCategoryApi)

// -- 电影 -- //
// GET 电影列表
router.get('/films', controllers.film.getFilmsApi)
// GET 电影详情
router.get('/film', controllers.film.getFilmApi)
// POST 新增电影
router.post('/film', controllers.film.addFilmApi)
// PUT 更新电影
router.put('/film', controllers.film.updateFilmApi)
// DELETE 删除电影
router.delete('/film/:film_id', controllers.film.deleteFilmApi)

// -- 电影分类 -- //
// GET 电影分类列表
router.get('/film_categories', controllers.filmCategory.getFilmCategoriesApi)
// GET 电影分类详情
router.get('/film_category', controllers.filmCategory.getFilmCategoryApi)
// POST 新增分类电影
router.post('/film_category', controllers.filmCategory.addFilmCategoryApi)
// PUT 更新分类电影
router.put('/film_category', controllers.filmCategory.updateFilmCategoryApi)
// DELETE 删除电影分类
router.delete('/film_category/:category_id', controllers.filmCategory.deleteFilmCategoryApi)

// -- 音乐 -- //
// GET 音乐列表
router.get('/musics', controllers.music.getMusicsApi)
// GET 音乐详情
router.get('/music', controllers.music.getMusicApi)
// POST 新增音乐
router.post('/music', controllers.music.addMusicApi)
// PUT 更新音乐
router.put('/music', controllers.music.updateMusicApi)
// DELETE 删除音乐
router.delete('/music/:music_id', controllers.music.deleteMusicApi)

// -- 音乐分类 -- //
// GET 音乐分类列表
router.get('/music_categories', controllers.musicCategory.getMusicCategoriesApi)
// GET 音乐分类详情
router.get('/music_category', controllers.musicCategory.getMusicCategoryApi)
// POST 新增分类音乐
router.post('/music_category', controllers.musicCategory.addMusicCategoryApi)
// PUT 更新分类音乐
router.put('/music_category', controllers.musicCategory.updateMusicCategoryApi)
// DELETE 删除音乐分类
router.delete('/music_category/:category_id', controllers.musicCategory.deleteMusicCategoryApi)

// -- 书籍 -- //
// GET 书籍列表
router.get('/books', controllers.book.getBooksApi)
// GET 书籍详情
router.get('/book', controllers.book.getBookApi)
// POST 新增书籍
router.post('/book', controllers.book.addBookApi)
// PUT 更新书籍
router.put('/book', controllers.book.updateBookApi)
// DELETE 删除书籍
router.delete('/book/:book_id', controllers.book.deleteBookApi)

// -- 书籍分类 -- //
// GET 书籍分类列表
router.get('/book_categories', controllers.bookCategory.getBookCategoriesApi)
// GET 书籍分类详情
router.get('/book_category', controllers.bookCategory.getBookCategoryApi)
// POST 新增分类书籍
router.post('/book_category', controllers.bookCategory.addBookCategoryApi)
// PUT 更新分类书籍
router.put('/book_category', controllers.bookCategory.updateBookCategoryApi)
// DELETE 删除书籍分类
router.delete('/book_category/:category_id', controllers.bookCategory.deleteBookCategoryApi)

// --- 文件上传 --- //
// POST 上传文件
router.post('/file/upload', controllers.file.uploadFileApi)
// DELETE 删除文件
router.delete('/file/:filename', controllers.file.deleteFileApi)

// --- 图片上传 --- //
// POST 上传图片
router.post('/image/upload', controllers.image.uploadImageApi)
// DELETE 删除图片
router.delete('/image/:imageName', controllers.image.deleteImageApi)

module.exports = router
