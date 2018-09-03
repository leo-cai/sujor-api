SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- t_user 用户表
CREATE TABLE `t_user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT  COMMENT '用户id',
  `mail` VARCHAR(64) NULL COMMENT '邮箱',
  `phone` VARCHAR(64) NULL COMMENT '手机',
  `username` VARCHAR(64) NOT NULL COMMENT '用户名',
  `password` VARCHAR(64) NOT NULL COMMENT '密码',
  `avatar` VARCHAR(64) NULL COMMENT '头像',
  `activated` BOOLEAN NOT NULL DEFAULT 0 COMMENT '是否激活',
  `disabled` BOOLEAN NOT NULL DEFAULT 0 COMMENT '是否可用',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  `signed_time` BIGINT NOT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- t_role 角色表
CREATE TABLE `t_role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` VARCHAR(64) NOT NULL COMMENT '角色名',
  `description` VARCHAR(255) COMMENT '角色描述',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- t_permission 权限表
CREATE TABLE `t_permission` (
  `permission_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `permission_name` VARCHAR(64) NOT NULL COMMENT '权限名',
  `description` VARCHAR(255) COMMENT '权限描述',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- t_user_role_rel 用户角色关联表
CREATE TABLE `t_user_role_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `user_id` INT(11) NOT NULL COMMENT '用户id',
  `role_id` INT(11) NOT NULL COMMENT '角色id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_user_role_rel_user_id` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_user_role_rel_role_id` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- t_role_permission_rel 角色权限关联表
CREATE TABLE `t_role_permission_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `role_id` INT(11) NOT NULL COMMENT '角色id',
  `permission_id` INT(11) NOT NULL COMMENT '权限id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_role_permission_rel_role_id` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_role_permission_rel_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `t_permission` (`permission_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';

-- t_code 代码表
CREATE TABLE `t_code` (
  `code_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '代码id',
  `user_id` INT(11) NOT NULL COMMENT '作者id',
  `title` VARCHAR(64) NOT NULL COMMENT '标题',
  `summary` LONGTEXT NULL COMMENT '简介',
  `content` LONGTEXT NOT NULL COMMENT '内容',
  `background_url` VARCHAR(64) NOT NULL COMMENT '背景图片url',
  `pre_background_url` VARCHAR(64) NOT NULL COMMENT '背景缩略图片url',
  `clicks` INT(11) NOT NULL DEFAULT 0 COMMENT '阅读数',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  `audited_time` BIGINT NOT NULL COMMENT '审核时间',
  `audited` BOOLEAN NOT NULL DEFAULT 0 COMMENT '是否审核',
  `activated` BOOLEAN NOT NULL DEFAULT 1 COMMENT '是否发布',
  PRIMARY KEY (`code_id`),
  CONSTRAINT `fk_t_code_user_id` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='代码表';

-- t_code_category 代码分类表
CREATE TABLE `t_code_category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` VARCHAR(64) NOT NULL COMMENT '分类名',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='代码分类表';

-- t_code_category_rel 代码分类关联表
CREATE TABLE `t_code_category_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `code_id` INT(11) NOT NULL COMMENT '代码id',
  `category_id` INT(11) NOT NULL COMMENT '分类id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_code_category_rel_code_id` FOREIGN KEY (`code_id`) REFERENCES `t_code` (`code_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_code_category_rel_category_id` FOREIGN KEY (`category_id`) REFERENCES `t_code_category` (`category_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='代码分类关联表';

-- t_music 音乐表
CREATE TABLE `t_music` (
  `music_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '音乐id',
  `user_id` INT(11) NOT NULL COMMENT '作者id',
  `title` VARCHAR(64) NOT NULL COMMENT '标题',
  `artist` VARCHAR(64) NOT NULL COMMENT '艺术家',
  `summary` LONGTEXT NULL COMMENT '简介',
  `content` LONGTEXT NOT NULL COMMENT '内容',
  `background_url` VARCHAR(64) NOT NULL COMMENT '背景图片url',
  `pre_background_url` VARCHAR(64) NOT NULL COMMENT '背景缩略图片url',
  `cover` VARCHAR(64) NOT NULL COMMENT '封面url',
  `music_url` VARCHAR(255) NOT NULL COMMENT '音乐url',
  `lyric` LONGTEXT NOT NULL COMMENT '歌词',
  `lyric_content` LONGTEXT NOT NULL COMMENT '文本歌词',
  `clicks` INT(11) NOT NULL DEFAULT 0 COMMENT '阅读数',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  `audited_time` BIGINT NOT NULL COMMENT '审核时间',
  `audited` BOOLEAN NOT NULL DEFAULT 0 COMMENT '是否审核',
  `activated` BOOLEAN NOT NULL DEFAULT 1 COMMENT '是否发布',
  PRIMARY KEY (`music_id`),
  CONSTRAINT `fk_t_music_user_id` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='音乐表';

-- t_music_category 音乐分类表
CREATE TABLE `t_music_category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` VARCHAR(64) NOT NULL COMMENT '分类名',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='音乐分类表';

-- t_music_category_rel 音乐分类关联表
CREATE TABLE `t_music_category_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `music_id` INT(11) NOT NULL COMMENT '音乐id',
  `category_id` INT(11) NOT NULL COMMENT '分类id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_music_category_rel_music_id` FOREIGN KEY (`music_id`) REFERENCES `t_music` (`music_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_music_category_rel_category_id` FOREIGN KEY (`category_id`) REFERENCES `t_music_category` (`category_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='音乐分类关联表';

-- t_film 电影表
CREATE TABLE `t_film` (
  `film_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '电影id',
  `user_id` INT(11) NOT NULL COMMENT '作者id',
  `title` VARCHAR(64) NOT NULL COMMENT '标题',
  `summary` LONGTEXT NULL COMMENT '简介',
  `content` LONGTEXT NOT NULL COMMENT '内容',
  `background_url` VARCHAR(64) NOT NULL COMMENT '背景图片url',
  `pre_background_url` VARCHAR(64) NOT NULL COMMENT '背景缩略图片url',
  `film_url` VARCHAR(255) NOT NULL COMMENT '电影url',
  `clicks` INT(11) NOT NULL DEFAULT 0 COMMENT '阅读数',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  `audited_time` BIGINT NOT NULL COMMENT '审核时间',
  `audited` BOOLEAN NOT NULL DEFAULT 0 COMMENT '是否审核',
  `activated` BOOLEAN NOT NULL DEFAULT 1 COMMENT '是否发布',
  PRIMARY KEY (`film_id`),
  CONSTRAINT `fk_t_film_user_id` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='电影表';

-- t_film_category 电影分类表
CREATE TABLE `t_film_category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` VARCHAR(64) NOT NULL COMMENT '分类名',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='电影分类表';

-- t_film_category_rel 电影分类关联表
CREATE TABLE `t_film_category_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `film_id` INT(11) NOT NULL COMMENT '电影id',
  `category_id` INT(11) NOT NULL COMMENT '分类id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_film_category_rel_film_id` FOREIGN KEY (`film_id`) REFERENCES `t_film` (`film_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_film_category_rel_category_id` FOREIGN KEY (`category_id`) REFERENCES `t_film_category` (`category_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='电影分类关联表';

-- t_book 书籍表
CREATE TABLE `t_book` (
  `book_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '书籍id',
  `user_id` INT(11) NOT NULL COMMENT '作者id',
  `title` VARCHAR(64) NOT NULL COMMENT '标题',
  `summary` LONGTEXT NULL COMMENT '简介',
  `content` LONGTEXT NOT NULL COMMENT '内容',
  `background_url` VARCHAR(64) NOT NULL COMMENT '背景图片url',
  `pre_background_url` VARCHAR(64) NOT NULL COMMENT '背景缩略图片url',
  `book_url` VARCHAR(255) NOT NULL COMMENT '书籍url',
  `cover` VARCHAR(64) NOT NULL COMMENT '书籍封面',
  `pre_cover` VARCHAR(64) NOT NULL COMMENT '书籍封面缩略图',
  `clicks` INT(11) NOT NULL DEFAULT 0 COMMENT '阅读数',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  `audited_time` BIGINT NOT NULL COMMENT '审核时间',
  `audited` BOOLEAN NOT NULL DEFAULT 0 COMMENT '是否审核',
  `activated` BOOLEAN NOT NULL DEFAULT 1 COMMENT '是否发布',
  PRIMARY KEY (`book_id`),
  CONSTRAINT `fk_t_book_user_id` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='书籍表';

-- t_book_category 书籍分类表
CREATE TABLE `t_book_category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` VARCHAR(64) NOT NULL COMMENT '分类名',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='书籍分类表';

-- t_book_category_rel 书籍分类关联表
CREATE TABLE `t_book_category_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `book_id` INT(11) NOT NULL COMMENT '书籍id',
  `category_id` INT(11) NOT NULL COMMENT '分类id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
   PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_book_category_rel_book_id` FOREIGN KEY (`book_id`) REFERENCES `t_book` (`book_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_book_category_rel_category_id` FOREIGN KEY (`category_id`) REFERENCES `t_book_category` (`category_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='书籍分类关联表';

-- t_comment 评论表
CREATE TABLE `t_comment` (
  `comment_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `user_id` INT(11) NOT NULL COMMENT '作者id',
  `content` LONGTEXT NOT NULL COMMENT '内容',
  `reply_id` INT(11) COMMENT '回复评论id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  `audited_time` BIGINT NOT NULL COMMENT '审核时间',
  `audited` BOOLEAN NOT NULL DEFAULT 0 COMMENT '是否审核',
  `activated` BOOLEAN NOT NULL DEFAULT 1 COMMENT '是否发布',
  PRIMARY KEY (`comment_id`),
  CONSTRAINT `fk_t_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论表';

-- t_code_comment_rel 代码评论关联表
CREATE TABLE `t_code_comment_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `code_id` INT(11) NOT NULL COMMENT '代码id',
  `comment_id` INT(11) NOT NULL COMMENT '评论id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_code_comment_rel_code_id` FOREIGN KEY (`code_id`) REFERENCES `t_code` (`code_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_code_comment_rel_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `t_comment` (`comment_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='代码评论关联表';

-- t_music_comment_rel 音乐评论关联表
CREATE TABLE `t_music_comment_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `music_id` INT(11) NOT NULL COMMENT '音乐id',
  `comment_id` INT(11) NOT NULL COMMENT '评论id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_project_comment_rel_music_id` FOREIGN KEY (`music_id`) REFERENCES `t_music` (`music_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_project_comment_rel_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `t_comment` (`comment_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='音乐评论关联表';

-- t_film_comment_rel 电影评论关联表
CREATE TABLE `t_film_comment_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `film_id` INT(11) NOT NULL COMMENT '电影id',
  `comment_id` INT(11) NOT NULL COMMENT '评论id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_film_comment_rel_film_id` FOREIGN KEY (`film_id`) REFERENCES `t_film` (`film_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_film_comment_rel_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `t_comment` (`comment_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='电影评论关联表';

-- t_book_comment_rel 书籍评论关联表
CREATE TABLE `t_book_comment_rel` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `book_id` INT(11) NOT NULL COMMENT '书籍id',
  `comment_id` INT(11) NOT NULL COMMENT '评论id',
  `created_time` BIGINT NOT NULL COMMENT '创建时间',
  `updated_time` BIGINT NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`rel_id`),
  CONSTRAINT `fk_t_book_comment_rel_book_id` FOREIGN KEY (`book_id`) REFERENCES `t_book` (`book_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_book_comment_rel_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `t_comment` (`comment_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='书籍评论关联表';

SET FOREIGN_KEY_CHECKS = 1;
