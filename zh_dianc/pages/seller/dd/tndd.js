var t = getApp();

Page({
    data: {
        tabbar: {},
        tabs: [ "待支付", "已完成", "已关闭" ],
        activeIndex: 0,
        date: "",
        pagenum: 1,
        ddlist: [],
        mygd: !1,
        jzgd: !0,
        jzwb: !1
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    tel: function(t) {
        console.log(t.currentTarget.dataset.tel), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    bindDateChange: function(t) {
        this.setData({
            date: t.detail.value
        });
    },
    sousuo: function() {
        this.setData({
            pagenum: 1,
            ddlist: [],
            mygd: !1,
            jzgd: !0,
            jzwb: !1
        }), this.reLoad(this.data.date);
    },
    qrsk: function(a) {
        var e = this, o = a.currentTarget.dataset.oid;
        console.log(o), wx.showModal({
            title: "提示",
            content: "确认收款吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/OkDnOrder",
                    cachetime: "0",
                    data: {
                        id: a.currentTarget.dataset.oid
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data && (wx.showToast({
                            title: "操作成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            e.setData({
                                pagenum: 1,
                                ddlist: [],
                                mygd: !1,
                                jzgd: !0,
                                jzwb: !1
                            }), e.reLoad(e.data.date);
                        }, 1e3));
                    }
                })) : o.cancel && console.log("用户点击取消");
            }
        });
    },
    gbdd: function(a) {
        var e = this;
        console.log("关闭订单" + a.currentTarget.dataset.oid), wx.showModal({
            title: "提示",
            content: "确定关闭订单吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/DownDnOrder",
                    cachetime: "0",
                    data: {
                        id: a.currentTarget.dataset.oid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "操作成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            e.setData({
                                pagenum: 1,
                                ddlist: [],
                                mygd: !1,
                                jzgd: !0,
                                jzwb: !1
                            }), e.reLoad(e.data.date);
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : o.cancel && console.log("用户点击取消");
            }
        });
    },
    cxkt: function(a) {
        var e = this;
        console.log("重新开台" + a.currentTarget.dataset.oid), wx.showModal({
            title: "提示",
            content: "确定重新开台吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/OpenTable",
                    cachetime: "0",
                    data: {
                        id: a.currentTarget.dataset.oid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "操作成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            e.setData({
                                pagenum: 1,
                                ddlist: [],
                                mygd: !1,
                                jzgd: !0,
                                jzwb: !1
                            }), e.reLoad(e.data.date);
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : o.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(a) {
        t.editTabBar();
        var e = this;
        a.activeIndex && this.setData({
            activeIndex: parseInt(a.activeIndex)
        });
        var o = wx.getStorageSync("sjdsjid");
        console.log(o), t.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(t) {
                console.log("商家信息", t), "3" == t.data.ps_mode && e.setData({
                    isuu: !0
                });
            }
        }), this.reLoad(this.data.date);
    },
    reLoad: function(a) {
        var e = wx.getStorageSync("sjdsjid");
        console.log(e);
        var o = this;
        t.util.request({
            url: "entry/wxapp/AppDnOrder",
            cachetime: "0",
            data: {
                store_id: e,
                page: o.data.pagenum,
                time: a
            },
            success: function(t) {
                console.log("分页返回的数据", t.data), 0 == t.data.length ? o.setData({
                    mygd: !0,
                    jzgd: !0,
                    jzwb: !0
                }) : o.setData({
                    jzgd: !0,
                    pagenum: o.data.pagenum + 1
                });
                var a = o.data.ddlist;
                a = a.concat(t.data);
                for (var e = [], n = [], s = [], d = 0; d < a.length; d++) "1" == a[d].dn_state && e.push(a[d]), 
                "2" == a[d].dn_state && n.push(a[d]), "3" == a[d].dn_state && s.push(a[d]);
                console.log(e, n, s), o.setData({
                    dzf: e,
                    ywc: n,
                    ygb: s,
                    ddlist: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearInterval(void 0);
    },
    onPullDownRefresh: function() {
        this.setData({
            date: "",
            pagenum: 1,
            ddlist: [],
            mygd: !1,
            jzgd: !0,
            jzwb: !1
        }), this.reLoad(this.data.date), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum), !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad(this.data.date));
    },
    onShareAppMessage: function() {}
});