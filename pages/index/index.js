var app = getApp();
var creatorAPI = require("../../service/index.js").allServerApi;
const collectApi = require('../../service/collect.js').allServerApi;
var indexApi = require("../../service/index.js").allServerApi;
var ssubscripitionApi = require("../../service/subscription.js").allServerApi;
const error = require('../../util/errorMsg.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom_more: '--- 正在加载更多内容 ---',
    more: true,
    news_page_index: 1,
    nl_flow: [],
    creatorArr: [],
    navArr: [],
    isactive: 0,
    showAll: false,
    widthnum: "100%",
    sendId: null,
    column_flow: [],
    column_id: 0,
    showLoadingStatus: false,
    isShowLoadingNum: 0,
    showsubscriptionalt: false,
    showNoMsg: false,
    tabnum:0
  },

  //导航切换
  showNav(e) {
    let that = this;
    that.setData({
      showLoadingStatus: true,
    });
    that.setData({
      isactive: e.currentTarget.dataset.index,
      column_flow: [],
       nl_flow: [],
      column_id: e.currentTarget.dataset.id,
      news_page_index: 1,
      bottom_more: '',
      showNoMsg: false,
      tabnum:0
    });
    that.getColumnNews(that.data.column_id, 1);
    if (e.currentTarget.dataset.index === 0) {
      that.getFlowNews(that.data.news_page_index)
    }
  },
  setWidth() {
    var query = wx.createSelectorQuery();

    let length = this.data.navArr.length;
    let width = length * (28 + 15);
    this.setData({
      widthnum: width + "px"
    })
  },
  getNavLsitFun() {
    let that = this;

    ssubscripitionApi.getNavList({
      mp_openid: app.globalData.openid
    }, function(successMsg) {
      that.setData({
        navArr: successMsg.data.data
      });
      that.setWidth();
    }, function(errorMsg) {
      error(errorMsg)
    })
  },
  //展示栏目弹框
  showdiscoverableFun(e) {
    this.setData({
      showsubscriptionalt: true
    })
  },
  //取消栏目框
  hidediscoverableFun(e) {
    this.setData({
      showsubscriptionalt: false
    });
    this.getNavLsitFun();
  },
  //添加收藏
  addcollect(e) {
    if (app.globalData.openid) {
      let that = this;

      that.setData({
        showAll: true,
        sendId: e.currentTarget.dataset.id
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }

  },
  //收藏成功
  successHeart(e) {
    let that = this;
    if (this.data.nl_new.length > 0) {
      this.data.nl_new.forEach((value, index) => {
        if (e.detail) {
          if (value.news_id === e.detail.val) {
            value.news_collection = 1
          }

        } else {
          if (value.news_id === e) {
            value.news_collection = 0
          }

        }
      });
      this.setData({
        nl_new: that.data.nl_new
      });
    }
    if (this.data.nl_recommend.length > 0) {
      this.data.nl_recommend.forEach((value, index) => {
        if (e.detail) {
          if (value.news_id === e.detail.val) {
            value.news_collection = 1
          }
        } else {
          if (value.news_id === e) {
            value.news_collection = 0
          }

        }
      });
      this.setData({
        nl_recommend: that.data.nl_recommend
      });
    }
    if (this.data.nl_flow.length > 0) {
      this.data.nl_flow.forEach((value, index) => {
        if (e.detail) {
          if (value.news_id === e.detail.val) {
            value.news_collection = 1
          }

        } else {
          if (value.news_id === e) {
            value.news_collection = 0
          }

        }
      });
      this.setData({
        nl_flow: that.data.nl_flow
      });
    }
    if (this.data.column_flow.length > 0) {
      this.data.column_flow.forEach((value, index) => {
        if (e.detail) {

          if (value.news_id === e.detail.val) {
            value.news_collection = 1
          }

        } else {
          if (value.news_id === e) {
            value.news_collection = 0
          }

        }
      });
      this.setData({
        column_flow: that.data.column_flow
      });
    }
  },
  //取消收藏
  removeCollect(e) {
    wx.showLoading({
      title: '正在取消',
    })
    let that = this;
    //that.successHeart(that.properties.sendId)
    collectApi.heartServer({
      mp_openid: app.globalData.openid,
      collection_id: '',
      news_id: e.currentTarget.dataset.id,
      action_type: 0
    }, function(successMsg) {

      wx.hideLoading();
      wx.showToast({
        title: '取消成功'
      });
      let addCollect = that.selectComponent("#addCollect");
      addCollect.getListFun();
      that.successHeart(e.currentTarget.dataset.id)
    }, function(errorMsg) {
      error(errorMsg)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      showLoadingStatus: true,
    });
    that.getRecommendNews()
    that.getNewNews()
    that.getFlowNews(that.data.news_page_index)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      nl_flow: [],
      column_flow: [],
      news_page_index: 1
    })
    wx.showNavigationBarLoading()
    if (this.data.isactive === 0) {
      this.getRecommendNews()
      this.getNewNews()
      this.getFlowNews(1)
      //this.getGoodCreator()
    } else {
      this.getColumnNews(this.data.column_id, 1);
    }
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    var path = '/pages/content/content?nid=' + options.target.dataset.id
    return {
      title: options.target.dataset.title,
      imageUrl: options.target.dataset.img,
      path: path
    }
  },

  /**
   * 获取推荐新闻列表
   */
  getRecommendNews: function() {
    var that = this
    indexApi.recommendNews({
      mp_openid: app.globalData.openid
    }, function(res) {
      if (res.data.result === 0) {
        that.setData({
          nl_recommend: res.data.data,
          isShowLoadingNum: 1,
          showLoadingStatus: false
        })
      }
    }, function(errMsg) {

    })
  },
  /**
   * 获取最新新闻列表
   */
  getNewNews: function() {
    var that = this
    indexApi.newNews({
      mp_openid: app.globalData.openid
    }, function(res) {
      if (res.data.result === 0) {
        that.setData({
          nl_new: res.data.data,
          isShowLoadingNum: 2,
          showLoadingStatus: false
        })
      }
    }, function(errMsg) {})
  },
  //  获取推荐优质创作者
  // getGoodCreator: function() {
  //   var that = this
  //   indexApi.getGoodCreatorData({
  //     mp_openid: ""
  //   }, function(success) {
  //     //that.data.creatorArr = success.data.data;
  //     let crator = that.selectComponent("#creator");
  //     crator.changeData(success.data.data)
  //     that.setData({
  //       creatorArr: success.data.data,
  //       isShowLoadingNum: 3,
  //       showLoadingStatus: false
  //     })
  //   }, function(errMsg) {})

  // },
  /**
   * 获取信息流列表
   */
  getFlowNews: function(page_index) {
    var that = this;
    var pagesize = 5;
    indexApi.flowNews({
      mp_openid: app.globalData.openid,
      page_index: page_index,
      page_size: pagesize
    }, function(res) {

      var length = 0;
      var count = 0
      if (res.data.data.length) {
        length = res.data.data.length
        count = res.data.count
      }

      if (length > 0 && length == pagesize) {

        that.setData({
          nl_flow: that.data.nl_flow.concat(res.data.data),
          bottom_more: '--- 正在加载更多 ---',
          more: true,
          showLoadingStatus: false
        })

      } else if (length < pagesize) {
        that.setData({
          nl_flow: that.data.nl_flow.concat(res.data.data),
          bottom_more: '--- 已经到底了 ---',
          more: false
        })
      }

    }, function(errMsg) {

    })
  },
  /**
   * 获取栏目信息流列表
   */
  getColumnNews: function(column_id, page_index) {

    var that = this;
    var pagesize = 5;
    indexApi.columnNews({
      mp_openid: app.globalData.openid,
      column_id: column_id,
      page_index: page_index,
      page_size: pagesize
    }, function(res) {
      that.setData({
        showLoadingStatus: false
      });
      if (!(res.data.data instanceof Array)) {
       if(that.data.tabnum===0){
         that.setData({
           showNoMsg: true
         })
         return;
       }
      }
      that.data.tabnum = that.data.tabnum+1;
      var length = 0;
      var count = 0;
      that.setData({
        showNoMsg: false
      })
      if (res.data.data.length) {
        length = res.data.data.length
        count = res.data.count
      }

      if (length > 0 && length == pagesize) {
        if (count == pagesize) {

          that.setData({
            column_flow: that.data.column_flow.concat(res.data.data),
            bottom_more: '--- 已经到底了 ---',
            more: false
          })
        } else {
          that.setData({
            column_flow: that.data.column_flow.concat(res.data.data),
            more: true
          })
        }
      } else if (length < pagesize) {
        that.setData({
          column_flow: that.data.column_flow.concat(res.data.data),
          bottom_more: '--- 已经到底了 ---',
          more: false
        })
      }
    }, function(errMsg) {})
  },
  // // 点击跳转到发现页面
  toDiscover: function() {
    var url = '/pages/discoverable/discoverable'
    wx.switchTab({
      url: url,
    })
  },
  /**
   * 跳转到内容页
   */
  RedirectUrl: function(e) {
    var url = '/pages/content/content?nid=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title + '&accountid=' + e.currentTarget.dataset.accountid + '&accouttImage=' + e.currentTarget.dataset.accouttimage;
    wx.navigateTo({
      url: url
    })
  },
  onReachBottom: function(options) {

    var that = this
    var ishavenews = that.data.more
    if (ishavenews) {
      wx.showLoading({
        title: '正在加载',
      })
      var next_page_index = that.data.news_page_index + 1
      that.setData({
        news_page_index: next_page_index,
      })
      if (that.data.isactive === 0) {
        that.getFlowNews(that.data.news_page_index)
      } else {
        that.getColumnNews(this.data.column_id, that.data.news_page_index);
      }


      wx.hideLoading()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    that.getNavLsitFun();
    let addCollect = that.selectComponent("#addCollect");
    addCollect.getListFun();
    // that.onLoad();
  },

})