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
        this.setData({
            cpid: t.cpid
        }), this.reLoad();
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
        var a = this, i = e.currentTarget.dataset.id;
        console.log(i), wx.showModal({
            title: "提示",
            content: "确认删除此分类吗？",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/DelSpec",
                    cachetime: "0",
                    data: {
                        spec_id: i
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
        var e = this, a = this.data.cpid;
        console.log(a), t.util.request({
            url: "entry/wxapp/AppSpec",
            cachetime: "0",
            data: {
                dishes_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    flarr: t.data
                });
            }
        });
    },
    formSubmit1: function(e) {
        console.log("form1发生了submit事件，携带数据为：", e.detail.value);
        var a = this, i = this.data.cpid, o = e.detail.value.flmc, s = e.detail.value.pxxh;
        console.log("", i, o, s);
        var n = "", c = !0;
        "" == o ? n = "请填写规格名称！" : "" == s ? n = "请填写价格！" : (a.setData({
            disabled1: !0
        }), c = !1, t.util.request({
            url: "entry/wxapp/AddSpec",
            cachetime: "0",
            data: {
                cost: s,
                name: o,
                id: "",
                dishes_id: i
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
            content: n
        });
    },
    formSubmit: function(e) {
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var a = this, i = this.data.activeid, o = this.data.cpid, s = e.detail.value.flmc, n = e.detail.value.pxxh;
        console.log(i, o, s, n);
        var c = "", l = !0;
        "" == s ? c = "请填写规格名称！" : "" == n ? c = "请填写价格！" : (a.setData({
            disabled: !0
        }), l = !1, t.util.request({
            url: "entry/wxapp/AddSpec",
            cachetime: "0",
            data: {
                cost: n,
                name: s,
                id: i,
                dishes_id: o
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
        })), 1 == l && wx.showModal({
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