const CONF = {
  // 开发者环境
  serverHost: 'https://api.sujor.com/',
  // serverHost: 'http://localhost:8000/',
  port: '8000',
  tunnelServerUrl: 'http://tunnel.ws.qcloud.la',
  tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
  // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
  qcloudAppId: '',
  qcloudSecretId: '',
  qcloudSecretKey: '',
  wxMessageToken: 'weixinmsgtoken',
  networkTimeout: 10000,
  rootPathname: '',

  // 微信小程序 App ID
  appId: '',

  // 微信小程序 App Secret
  appSecret: '',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,

  /**
   * MySQL配置
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'sujordb',
    pass: '',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  // jwt
  secret: 'jwt_secret',
  // jwt_token 此处默认7天
  expires: 7,
  encryptKey: 'leo'
}

module.exports = CONF
