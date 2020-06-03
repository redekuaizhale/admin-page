export default {
  /**
   * 存放token
   */
  userTokenKey: 'user-token-key',

  /**
   * 存放用户名
   */
  userNameKey: 'user-name-key',

  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'REDEKUAIZHALE',

  /**
   * @description api请求基础路径
   */
  baseUrl: {
    /**
     * 本地开发地址
     */
    dev: 'http://127.0.0.1:9528',

    /**
     * 生产环境
     */
    pro: '/demo/api/'
  },

  /**
   * 接口返回成功编码
   */
  apiSuccessCode: '1',

  /**
   * 接口失败全局提示
   */
  apiErrorMsg: '操作失败，请稍后再试！',

  /**
   * 查询条件-start
   */
  String: 'String',
  Integer: 'Integer',
  DateTime: 'DateTime',
  Boolean: 'Boolean',
  Long: 'Long',
  BigDecimal: 'BigDecimal',
  List: 'List',
  /**
   * 查询条件-end
   */
  defaultUserPass: '123456'
}
