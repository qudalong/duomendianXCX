var t = getApp();

require("../../../utils/util.js");

Page({
    data: {
        catalogSelect: 0,
        color: "#34aaff"
    },
    spfl: function() {
        wx.navigateTo({
            url: "spfl"
        });
    },
    tjsp: function() {
        wx.navigateTo({
            url: "bjcp"
        });
    },
    selectMenu: function(t) {
        var e = t.currentTarget.dataset.itemIndex;
        this.setData({
            toView: "order" + e.toString(),
            catalogSelect: t.currentTarget.dataset.itemIndex
        }), console.log("order" + e.toString());
    },
    tjgg: function(t) {
        var e = t.currentTarget.dataset.cpid;
        console.log(e), wx.navigateTo({
            url: "tjgg?cpid=" + e
        });
    },
    bianj: function(t) {
        var e = t.currentTarget.dataset.cpid;
        console.log(e), wx.navigateTo({
            url: "bjcp?cpid=" + e
        });
    },
    sjxj: function(e) {
        var o = this, n = e.currentTarget.dataset.cpid, s = e.currentTarget.dataset.shelves;
        console.log(n, s), wx.showModal({
            title: "提示",
            content: "确认进行上下架操作吗？",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/UpdDishes",
                    cachetime: "0",
                    data: {
                        dishes_id: n,
                        is_shelves: s
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data && (wx.showToast({
                            title: "操作成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3));
                    }
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    sccp: function(e) {
        var o = this, n = e.currentTarget.dataset.cpid;
        console.log(n), wx.showModal({
            title: "提示",
            content: "确认删除此菜品吗？",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/DelDishes",
                    cachetime: "0",
                    data: {
                        dishes_id: n
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data && (wx.showToast({
                            title: "操作成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3));
                    }
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(e) {
        t.editTabBar();
        var o = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t.windowWidth), console.log(t.windowHeight), o.setData({
                    height: t.windowHeight / t.windowWidth * 750 - 230
                });
            }
        }), this.reLoad();
    },
    reLoad: function() {
        var e = this, o = wx.getStorageSync("sjdsjid");
        console.log(o);
        var n = wx.getStorageSync("imglink");
        console.log(n), t.util.request({
            url: "entry/wxapp/AppDishes",
            cachetime: "0",
            data: {
                store_id: o
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    dishes: t.data,
                    url: n
                });
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