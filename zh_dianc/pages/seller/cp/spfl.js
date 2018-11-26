var t = getApp();

require("../../../utils/util.js");

Page({
    data: {
        activeid: "",
        disabled: !1,
        disabled1: !1,
        isxz: !1
    },
    onLoad: function(t) {
        this.reLoad();
    },
    xzfl: function() {
        this.setData({
            isxz: !0,
            activeid: ""
        });
    },
    qx: function() {
        this.setData({
            isxz: !1
        });
    },
    bianji: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), this.setData({
            activeid: e
        });
    },
    sc: function(e) {
        var a = this, o = e.currentTarget.dataset.id;
        console.log(o), wx.showModal({
            title: "提示",
            content: "确认删除此分类吗？",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/DelDishesType",
                    cachetime: "0",
                    data: {
                        id: o
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data && (wx.showToast({
                            title: "操作成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            a.reLoad();
                        }, 1e3));
                    }
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    reLoad: function() {
        var e = this, a = wx.getStorageSync("sjdsjid");
        console.log(a), t.util.request({
            url: "entry/wxapp/AppDishesType",
            cachetime: "0",
            data: {
                store_id: a
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    flarr: t.data
                });
            }
        });
    },
    formSubmit1: function(e) {
        console.log("form1发生了submit事件，携带数据为：", e.detail.value);
        var a = this;
        if (e.detail.value.sfxs) var o = 1; else o = 2;
        var i = wx.getStorageSync("sjdsjid"), s = e.detail.value.flmc, n = e.detail.value.pxxh;
        console.log("", i, s, n, o);
        var l = "", c = !0;
        "" == s ? l = "请填写商品名称！" : "" == n ? l = "请填写排序序号！" : (a.setData({
            disabled1: !0
        }), c = !1, t.util.request({
            url: "entry/wxapp/AddDishesType",
            cachetime: "0",
            data: {
                order_by: n,
                type_name: s,
                is_open: o,
                store_id: i,
                id: ""
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "操作成功"
                }), setTimeout(function() {
                    a.reLoad(), a.setData({
                        isxz: !1,
                        disabled1: !1
                    });
                }, 1e3)) : (a.setData({
                    disabled1: !1
                }), wx.showToast({
                    title: "请修改后提交！",
                    icon: "loading"
                }));
            }
        })), 1 == c && wx.showModal({
            title: "提示",
            content: l
        });
    },
    formSubmit: function(e) {
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var a = this, o = this.data.activeid;
        if (e.detail.value.sfxs) var i = 1; else i = 2;
        var s = wx.getStorageSync("sjdsjid"), n = e.detail.value.flmc, l = e.detail.value.pxxh;
        console.log(o, s, n, l, i);
        var c = "", d = !0;
        "" == n ? c = "请填写商品名称！" : "" == l ? c = "请填写排序序号！" : (a.setData({
            disabled: !0
        }), d = !1, t.util.request({
            url: "entry/wxapp/AddDishesType",
            cachetime: "0",
            data: {
                order_by: l,
                type_name: n,
                is_open: i,
                store_id: s,
                id: o
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "操作成功"
                }), setTimeout(function() {
                    a.reLoad(), a.setData({
                        activeid: "",
                        disabled: !1
                    });
                }, 1e3)) : (a.setData({
                    disabled: !1
                }), wx.showToast({
                    title: "请修改后提交！",
                    icon: "loading"
                }));
            }
        })), 1 == d && wx.showModal({
            title: "提示",
            content: c
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