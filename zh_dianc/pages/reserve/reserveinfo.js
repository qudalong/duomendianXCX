var o = getApp();

Page({
    data: {
        modalHidden: !0
    },
    onLoad: function(o) {
        var t = wx.getStorageSync("nbcolor");
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t
        });
        var n = wx.getStorageSync("imglink"), e = o.ydid;
        console.log(e), this.setData({
            ydid: e,
            imglink: n
        }), this.reLoad();
    },
    reLoad: function() {
        var t = this, n = this.data.ydid;
        console.log(n), o.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid
            },
            success: function(o) {
                console.log(o.data), console.log(o.data.logo), t.setData({
                    store: o.data,
                    color: o.data.color
                });
            }
        }), o.util.request({
            url: "entry/wxapp/ReservationInfo",
            cachetime: "0",
            data: {
                id: n
            },
            success: function(o) {
                console.log(o), t.setData({
                    yyinfo: o.data
                });
            }
        });
    },
    call_phone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.yyinfo.tel
        });
    },
    cancel: function(t) {
        var n = this;
        console.log(n.data.yyinfo.id), wx.showModal({
            title: "提示",
            content: "确认取消么",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), o.util.request({
                    url: "entry/wxapp/CancelReservation",
                    cachetime: "0",
                    data: {
                        id: n.data.yyinfo.id
                    },
                    success: function(o) {
                        console.log(o.data), "1" == o.data ? (wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.switchTab({
                                url: "../list/list?activeindex=2"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});