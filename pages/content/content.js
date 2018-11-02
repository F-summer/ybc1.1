var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
const collectApi = require('../../service/collect.js').allServerApi;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_url: '',
    news_title: '',
    news_thumb_url: '',
    news_id: '',
    name:'',
    update_time:'',
    good:true,
    showAll:false,
    isHeart:false,
    accouttImage:'',
    logo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var nid = options.nid;
    var accountid = options.accountid;
    var title = options.title;
    //console.log(options.userId)
    if (nid && nid != 'undefined') {
      that.getNewsUrl(nid, accountid, title)
      wx.hideToast
    } else {
      //  console.log('这里是if=false')
      wx.hideToast
      wx.showModal({
        title: '出错了',
        content: '未获取到文章地址,返回首页',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
        }
      })
    }

  },
  goodFun:function(){
    if(this.data.good){
      this.setData({
        good:false
      })
    }else{
      this.setData({
        good:true
      })
    }
   
  },
  //添加收藏/取消收藏
  collectFun(e){
    let that = this;
    if (app.globalData.openid) {
      if (!that.data.isHeart) {
        that.data.sendId = e.currentTarget.dataset.id;
        that.setData({
          showAll: true,
          sendId: e.currentTarget.dataset.id
        });
      } else {
        wx.showLoading({
          title: '正在取消',
        })
        collectApi.heartServer({
          mp_openid: app.globalData.openid,
          collection_id: '',
          news_id: e.currentTarget.dataset.id,
          action_type: 0
        }, function (successMsg) {
          wx.hideLoading();
          wx.showToast({
            title: '取消成功'
          });
          that.setData({
            isHeart: false
          });
          let addCollect = that.selectComponent("#addCollect");
          addCollect.getListFun();
        }, function (errorMsg) {
          error(errorMsg)
        })
      }
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
    
  },
  //收藏成功
  successHeart(){
    let that = this;
    that.setData({
      isHeart: true
    });
  },
  getNewsUrl: function(nid, accountid, title) {
    var that = this
    var url = app.globalData.postUrlTwo + app.globalData.NewsUrl
    wx.request({
      url: url,
      method: 'POST',
      data: {
        id: nid,
        title: title,
        account_id: accountid,
        mp_openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        
       
          var article = res.data.data[0].content;
          that.setData({
            news_title: res.data.data[0].title,
            update_time: res.data.data[0].update_time,
            name: res.data.data[0].name,
            articleId: res.data.data[0].id,
            thumb_url: res.data.data[0].thumb_url,
            logo: res.data.data[0].logo
          })
        if (res.data.data[0].is_f == 1) {
            that.setData({
              isHeart: true
            })
          }
        var article = article.replace(/section/gi, 'p');
        var pCont = article.match(/<p([\s\S]*?)<\/p>/g).join('');
        var article = pCont.replace(/style="[^\']*?"/gi, '');
        article = article.replace(/>\?</g, '><');
        let newHtml = '<section>' + article +'</section>'
        WxParse.wxParse('article', 'html', newHtml, that, 0);
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    var path = '/pages/content/content?nid=' + options.target.dataset.id + "&userId=" + app.globalData.openid
    return {
      title: options.target.dataset.title,
      imageUrl: options.target.dataset.img,
      path: path
    }
  }
})