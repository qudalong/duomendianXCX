var a, t = getApp();

Page({
    data: {},
    onLoad: function(e) {
        t.editTabBar();
        var n = this;
        e.activeIndex && this.setData({
            activeIndex: parseInt(e.activeIndex)
        });
        var o = wx.getStorageSync("sjdsjid");
        console.log(o);
        var c = wx.getStorageSync("imglink");
        console.log(c), t.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(a) {
                console.log("商家信息", a), n.setData({
                    store: a.data,
                    url: c
                });
            }
        }), wx.getStorageSync("yybb") && (a = setInterval(function() {
            t.util.request({
                url: "entry/wxapp/NewOrder",
                cachetime: "0",
                data: {
                    store_id: o
                },
                success: function(a) {
                    console.log(a), 1 == a.data && wx.playBackgroundAudio({
                        dataUrl: wx.getStorageSync("url2") + "addons/zh_dianc/template/images/wm.wav",
                        title: "语音播报"
                    }), 2 == a.data && wx.playBackgroundAudio({
                        dataUrl: wx.getStorageSync("url2") + "addons/zh_dianc/template/images/dn.wav",
                        title: "语音播报"
                    }), 3 == a.data && wx.playBackgroundAudio({
                        dataUrl: wx.getStorageSync("url2") + "addons/zh_dianc/template/images/yy.wav",
                        title: "语音播报"
                    });
                }
            });
        }, 1e4));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearInterval(a);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});