// client/pages/1_0/find/find.js
var app = getApp();
Page({
  data: {
    listTab: [{
        "code": "01",
        "text": "tab1"
      },
      {
        "code": "02",
        "text": "tab2"
      },
      {
        "code": "03",
        "text": "tab3"
      },
      {
        "code": "04",
        "text": "tab4"
      },
      {
        "code": "05",
        "text": "tab5"
      },
      {
        "code": "06",
        "text": "tab6"
      },
      {
        "code": "07",
        "text": "tab7"
      }
    ],
    listArr: [{
      "collection_id": 1,
      "collection_name": "默认收藏夹",
      "collection_count": 0,
      "collection_index": 0,
      "collection_type": 0,
      "collection_img": "http://...xxx.png",
      "last_update_time": "2018-09-13 12:00"
    }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      } ],
  },

  testSubmit: function (e) {
    console.log(e.detail.formId)
    // var self = this;
    // let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + app.globalData.access_token
    //console.log(app.globalData.openid)
      let _jsonData = {
        "mp_openid": app.globalData.openid,
        "form_id": e.detail.formId,
        "page": "pages/index/index", 
        "data": {
          "keyword1": {
            "value": "339208499"
          }
        }
      }
    wx.request({
      url: 'https://www.yaobc.info/api/sp/api.ashx?action=f2971452-cae6-4810-94ec-fbcaeeb3763f',
      data: _jsonData,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }

    })
    },
  onLoad:function(){
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID',
      data:{
        mp_openid: app.globalData.openid
      },
      success: function (res) {
        app.globalData.idmsg=res.data.data
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }

    })
    let _access_token = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&&appid=' + 'wxdb1c002436790e7b&&secret=' + '2cf8e0fce4603f0a7d475828e159fc9d'
    wx.request({
      url: _access_token,
      success: function (res) {
        app.globalData.access_token = res.data.access_token
        console.log(res.data.access_token)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }

    })
  }

})