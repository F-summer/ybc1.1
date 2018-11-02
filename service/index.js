//flj 2018/9/6
//调用底层封装对象
var allGlobal = require("../util/globalAjxa.js").serverGlobal;

var allServerApi = {
  //获取推荐新闻
  recommendNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('api/mp/api.ashx?action=3a67fc71-8c34-49c5-9786-fa314ebfc288'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取最新新闻
  newNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('api/mp/api.ashx?action=2aef2c5b-2566-4ae5-aad2-372adde7aa68'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取资讯新闻
  flowNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('api/mp/api.ashx?action=7493ef64-61f1-44e7-b025-da119f9e8d2b'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取栏目内容列表
  columnNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('api/mp/api.ashx?action=c417900e-7a7b-48c2-a737-315cbe569ce1'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //推荐优质创作者
  getGoodCreatorData: function(data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('api/mp/api.ashx?action=65817185-0909-4d9f-991c-87b1e9462153'),
      contType:"application/x-www-form-urlencoded",
      method:'POST',
      data:data,
      success:success,
      error:errMsg,
    })
  }
}

module.exports.allServerApi = allServerApi;