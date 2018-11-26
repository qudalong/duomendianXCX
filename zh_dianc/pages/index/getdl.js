var n = getApp();

Page({
    data: {
        color: "#09bb07"
    },
    bindGetUserInfo: function(o) {
        console.log(o);
        var e = getCurrentPages();
        console.log(e), "getUserInfo:ok" == o.detail.errMsg && (wx.showLoading({
            title: "登录中...",
            mask: !0
        }), wx.getUserInfo({
            success: function(o) {
                console.log(o), n.util.request({
                    url: "entry/wxapp/login",
                    cachetime: "0",
                    data: {
                        openid: wx.getStorageSync("openid"),
                        img: o.userInfo.avatarUrl,
                        name: o.userInfo.nickName
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    dataType: "json",
                    success: function(o) {
                        console.log("用户信息", o), n.globalData.userInfo = o.data, 1 < e.length && e[e.length - 2].setData({
                            userinfo: o.data
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3);
                    }
                });
            }
        }));
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});