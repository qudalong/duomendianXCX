var t = getApp();

Page({
    data: {
        dpkg: !1,
        txkg: !1,
        yykg: !1,
        dpkgtext: "店铺已关闭",
        txkgtext: "语音播报已关闭",
        yykgtext: "背景音乐已关闭"
    },
    switch1Change: function(e) {
        var a = this, o = wx.getStorageSync("sjdsjid");
        console.log(o), console.log("switch1 发生 change 事件，携带值为", e.detail.value), e.detail.value ? t.util.request({
            url: "entry/wxapp/Open",
            cachetime: "0",
            data: {
                store_id: o
            },
            success: function(t) {
                console.log(t), 1 == t.data ? a.setData({
                    dpkg: !0,
                    dpkgtext: "店铺已开启"
                }) : wx.showToast({
                    title: "请重试",
                    icon: "loading"
                });
            }
        }) : t.util.request({
            url: "entry/wxapp/Close",
            cachetime: "0",
            data: {
                store_id: o
            },
            success: function(t) {
                console.log(t), 1 == t.data ? a.setData({
                    dpkg: !1,
                    dpkgtext: "店铺已关闭"
                }) : wx.showToast({
                    title: "请重试",
                    icon: "loading"
                });
            }
        });
    },
    switch3Change: function(e) {
        var a = this, o = wx.getStorageSync("sjdsjid");
        if (e.detail.value) var s = 1; else s = 2;
        console.log(o), console.log("switch3 发生 change 事件，携带值为", e.detail.value), t.util.request({
            url: "entry/wxapp/IsOpenYy",
            cachetime: "0",
            data: {
                store_id: o,
                is_mp3: s
            },
            success: function(t) {
                console.log(t), 1 == t.data ? 1 == s ? a.setData({
                    yykg: !0,
                    yykgtext: "背景音乐已开启"
                }) : a.setData({
                    yykg: !1,
                    yykgtext: "背景音乐已关闭"
                }) : wx.showToast({
                    title: "请重试",
                    icon: "loading"
                });
            }
        });
    },
    switch2Change: function(t) {
        console.log("switch2 发生 change 事件，携带值为", t.detail.value), t.detail.value ? (wx.setStorageSync("yybb", !0), 
        this.setData({
            txkg: !0,
            txkgtext: "语音播报已开启"
        })) : (wx.removeStorageSync("yybb"), this.setData({
            txkg: !1,
            txkgtext: "语音播报已关闭"
        }));
    },
    tcdl: function() {
        wx.showModal({
            title: "提示",
            content: "确定退出登录吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.removeStorageSync("sjdsjid"), wx.switchTab({
                    url: "../logs/logs"
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(e) {
        t.editTabBar();
        var a = this, o = wx.getStorageSync("sjdsjid");
        console.log(o), t.util.request({
            url: "entry/wxapp/store",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(t) {
                console.log(t), "1" == t.data.is_rest && a.setData({
                    dpkg: !1,
                    dpkgtext: "店铺已关闭"
                }), "2" == t.data.is_rest && a.setData({
                    dpkg: !0,
                    dpkgtext: "店铺已开启"
                }), "1" == t.data.is_mp3 && a.setData({
                    yykg: !0,
                    yykgtext: "背景音乐已开启"
                }), "2" == t.data.is_mp3 && a.setData({
                    yykg: !1,
                    yykgtext: "背景音乐已关闭"
                });
            }
        }), wx.getStorageSync("yybb") && a.setData({
            txkg: !0,
            txkgtext: "语音播报已开启"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});