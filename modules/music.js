// music module
const {mysql} = require('../qcloud')
const configs = require('../config')

// getMusics
const getMusics = async (page, limit, utmSource) => {
  const offset = (page - 1) * limit
  let musics = []
  let results
  if (utmSource === 'admin') {
    musics = await mysql('t_music').select('*').limit(limit).offset(offset).orderBy('created_time', 'desc')
    results = await mysql('t_music').count('* as total')
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: musics
      }
    }
  } else {
    musics = await mysql('t_music').select('t_music.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_music.user_id').limit(limit).offset(offset).where('t_music.activated', 1).andWhere('t_music.audited', 1).orderBy('t_music.created_time', 'desc')
    results = await mysql('t_music').where('activated', 1).andWhere('audited', 1).count('* as total')
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
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: musicList
      }
    }
  }
}

// getMusic
const getMusic = async (musicId, utmSource) => {
  // 如果来源于前端访问 则增加点击量
  if (utmSource !== 'admin') {
    try {
      await mysql('t_music').where('music_id', musicId).increment('clicks', 1)
    } catch (error) {
      console.log(error)
      return {
        code: -1,
        msg: `访问量增加失败`
      }
    }
  }
  const musics = await mysql('t_music')
    .select('t_music.*', 't_user.username')
    .leftJoin('t_user', 't_user.user_id', 't_music.user_id')
    .where('music_id', musicId)
  // search categories
  const categories = await mysql('t_music_category_rel')
    .select('t_music_category.category_id', 't_music_category.category_name')
    .leftJoin('t_music_category', 't_music_category.category_id', 't_music_category_rel.category_id')
    .where('t_music_category_rel.music_id', musicId)
  // 获取单个music
  let data = musics[0] || {}
  data.cover = `${configs.serverHost}music/${data.cover}`
  data.background_url = `${configs.serverHost}background/${data.background_url}`
  data.pre_background_url = `${configs.serverHost}background/${data.pre_background_url}`
  data.categories = categories
  return {
    code: 0,
    msg: `查询成功`,
    data
  }
}

// addMusic
const addMusic = async (data) => {
  // 插入
  const createdTime = Date.now()
  const updatedTime = createdTime
  const auditedTime = createdTime
  let musicId
  try {
    await mysql('t_music').insert({
      'title': data.title, 'user_id': data.user_id, 'artist': data.artist, 'cover': data.cover, 'music_url': data.music_url, 'lyric': data.lyric, 'lyric_content': data.lyric_content, 'summary': data.summary, 'content': data.content, 'background_url': data.background_url, 'pre_background_url': data.pre_background_url, 'created_time': createdTime, 'updated_time': updatedTime, 'audited_time': auditedTime
    }).returning('music_id').then((res) => {
      console.log(res)
      musicId = parseInt(res)
    })
    // 插入关联数据库
    for (let i = 0; i < data.music_category_id_group.length; i++) {
      const e = data.music_category_id_group[i]
      await mysql('t_music_category_rel').insert({
        'music_id': musicId, 'category_id': e, 'created_time': createdTime, 'updated_time': updatedTime
      })
    }
    // 返回成功
    return {
      code: 0,
      msg: `新增成功`
    }
  } catch (error) {
    console.log(error)
    return {
      code: -1,
      msg: `新增失败`
    }
  }
}

// updateMusic
const updateMusic = async (data) => {
  // 更新
  const auditedTime = Date.now()
  try {
    await mysql('t_music').update({
      'activated': data.activated, 'audited': data.audited, 'audited_time': auditedTime
    }).where('music_id', data.music_id)
    // 返回成功
    return {
      code: 0,
      msg: `更新成功`
    }
  } catch (error) {
    console.log(error)
    return {
      code: -1,
      msg: `更新失败`
    }
  }
}

// deleteMusic
const deleteMusic = async (musicId) => {
  // 删除
  try {
    const deleteResults = await mysql('t_music').delete().where('music_id', musicId)
    if (deleteResults) {
      // 返回成功
      return {
        code: 0,
        msg: `删除成功`
      }
    } else {
      return {
        code: -1,
        msg: `已删除或不存在`
      }
    }
  } catch (error) {
    console.log(error)
    return {
      code: -1,
      msg: `删除失败`
    }
  }
}

module.exports = {
  getMusics,
  getMusic,
  addMusic,
  updateMusic,
  deleteMusic
}