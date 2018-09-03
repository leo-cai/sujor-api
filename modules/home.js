// film module
const {mysql} = require('../qcloud')
const configs = require('../config')

const getIndexList = async (limit) => {
  let codes = await mysql('t_code').select('t_code.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_code.user_id').limit(limit).where('t_code.audited', 1).andWhere('t_code.activated', 1).orderBy('t_code.created_time', 'desc')
  let musics = await mysql('t_music').select('t_music.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_music.user_id').limit(limit).where('t_music.audited', 1).andWhere('t_music.activated', 1).orderBy('t_music.created_time', 'desc')
  let films = await mysql('t_film').select('t_film.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_film.user_id').limit(limit).where('t_film.audited', 1).andWhere('t_film.activated', 1).orderBy('t_film.created_time', 'desc')
  let books = await mysql('t_book').select('t_book.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_book.user_id').limit(limit).where('t_book.audited', 1).andWhere('t_book.activated', 1).orderBy('t_book.created_time', 'desc')
  // 重组 codeList
  let codeList = []
  for (let i = 0; i < codes.length; i++) {
    const e = codes[i]
    let obj = {}
    const categories = await mysql('t_code_category')
      .select('t_code_category.category_id', 't_code_category.category_name')
      .leftJoin('t_code_category_rel', 't_code_category_rel.category_id', 't_code_category.category_id')
      .where('t_code_category_rel.code_id', e.code_id)
    obj.id = e.code_id
    obj.type = 'code'
    obj.background_url = `${configs.serverHost}background/${e.background_url}`
    obj.pre_background_url = `${configs.serverHost}background/${e.pre_background_url}`
    obj.categories = categories
    obj.title = e.title
    obj.username = e.username
    obj.summary = e.summary
    obj.created_time = e.created_time
    codeList.push(obj)
  }
  // 重组 musicList
  let musicList = []
  for (let i = 0; i < musics.length; i++) {
    const e = musics[i]
    let obj = {}
    const categories = await mysql('t_music_category')
      .select('t_music_category.category_id', 't_music_category.category_name')
      .leftJoin('t_music_category_rel', 't_music_category_rel.category_id', 't_music_category.category_id')
      .where('t_music_category_rel.music_id', e.music_id)
    obj.id = e.music_id
    obj.type = 'music'
    obj.background_url = `${configs.serverHost}background/${e.background_url}`
    obj.pre_background_url = `${configs.serverHost}background/${e.pre_background_url}`
    obj.categories = categories
    obj.title = e.title
    obj.username = e.username
    obj.summary = e.summary
    obj.created_time = e.created_time
    musicList.push(obj)
  }
  // 重组 filmList
  let filmList = []
  for (let i = 0; i < films.length; i++) {
    const e = films[i]
    let obj = {}
    const categories = await mysql('t_film_category')
      .select('t_film_category.category_id', 't_film_category.category_name')
      .leftJoin('t_film_category_rel', 't_film_category_rel.category_id', 't_film_category.category_id')
      .where('t_film_category_rel.film_id', e.film_id)
    obj.id = e.film_id
    obj.type = 'film'
    obj.background_url = `${configs.serverHost}background/${e.background_url}`
    obj.pre_background_url = `${configs.serverHost}background/${e.pre_background_url}`
    obj.categories = categories
    obj.title = e.title
    obj.username = e.username
    obj.summary = e.summary
    obj.created_time = e.created_time
    filmList.push(obj)
  }
  // 重组 bookList
  let bookList = []
  for (let i = 0; i < books.length; i++) {
    const e = books[i]
    let obj = {}
    const categories = await mysql('t_book_category')
      .select('t_book_category.category_id', 't_book_category.category_name')
      .leftJoin('t_book_category_rel', 't_book_category_rel.category_id', 't_book_category.category_id')
      .where('t_book_category_rel.book_id', e.book_id)
    obj.id = e.book_id
    obj.type = 'book'
    obj.background_url = `${configs.serverHost}background/${e.background_url}`
    obj.pre_background_url = `${configs.serverHost}background/${e.pre_background_url}`
    obj.categories = categories
    obj.title = e.title
    obj.username = e.username
    obj.summary = e.summary
    obj.created_time = e.created_time
    bookList.push(obj)
  }
  return {
    code: 0,
    msg: `查询成功`,
    data: {
      codes: codeList,
      musics: musicList,
      films: filmList,
      books: bookList
    }
  }
}

module.exports = {
  getIndexList
}
