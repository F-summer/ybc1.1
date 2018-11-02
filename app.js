App({

     globalData: {
          userInfo: null,
          postUrl: 'https://www.yaobc.info/api/mp/api.ashx?action=',

       postUrlTwo: 'https://www.yaobc.info/api/mp/api.ashx?action=',

          /* postUrl: 'http://localhost:55708/api/sp/api.ashx?action=',  */

          /*获取新闻*/
          News: '48a63e63-576a-40fb-bd40-5c54bb074fa1',
          /*用户登录*/
          Login: 'f2971551-cae6-4810-94ec-fbcaeeb3763e',
          /*数据解密*/
          AESDecrypt: '20b735bc-6482-4614-9053-19651ab9244f',
          /*获取文章url*/
          NewsUrl: '2afe046a-c83a-4ac2-ae1a-69a2776b0b45',
          openid: wx.getStorageSync('openid')
     },
     getUserInfo: function(cb) {
          var that = this
          if (this.globalData.userInfo) {
               typeof cb == "function" && cb(this.globalData.userInfo)
          } else {
               //调用登录接口
               wx.login({
                    success: function() {
                         wx.getUserInfo({
                              success: function(res) {
                                   that.globalData.userInfo = res.userInfo
                                   typeof cb == "function" && cb(that.globalData.userInfo)
                              }
                         })
                    }
               })
          }
     },
})