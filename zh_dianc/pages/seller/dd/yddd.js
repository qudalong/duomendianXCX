var t = getApp();

Page({
    data: {
        tabbar: {},
        tabs: [ "待确认", "已确认", "已取消" ],
        activeIndex: 0,
        date: "",
        pagenum: 1,
        ddlist: [],
        mygd: !1,
        jzgd: !0,
        jzwb: !1
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
    qrdd: function(e) {
        var a = this, o = e.currentTarget.dataset.oid;
        console.log(o), wx.showModal({
            title: "提示",
            content: "确认订单吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/OkYdOrder",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.oid
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data && (wx.showToast({
                            title: "操作成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            a.setData({
                                pagenum: 1,
                                ddlist: [],
                                mygd: !1,
                                jzgd: !0,
                                jzwb: !1
                            }), a.reLoad(a.data.date);
                        }, 1e3));
                    }
                })) : o.cancel && console.log("用户点击取消");
            }
        });
    },
    tgtk: function(e) {
        var a = this;
        console.log("通过退款" + e.currentTarget.dataset.oid), wx.showModal({
            title: "提示",
            content: "确定通过退款吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/Ydtk",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.oid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "操作成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            a.setData({
                                pagenum: 1,
                                ddlist: [],
                                mygd: !1,
                                jzgd: !0,
                                jzwb: !1
                            }), a.reLoad(a.data.date);
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
    jjtk: function(e) {
        var a = this;
        console.log("拒绝退款" + e.currentTarget.dataset.oid), wx.showModal({
            title: "提示",
            content: "确定拒绝退款吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/Tkjj",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.oid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "操作成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            a.setData({
                                pagenum: 1,
                                ddlist: [],
                                mygd: !1,
                                jzgd: !0,
                                jzwb: !1
                            }), a.reLoad(a.data.date);
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
    scdd: function(e) {
        var a = this;
        console.log("删除订单" + e.currentTarget.dataset.oid), wx.showModal({
            title: "提示",
            content: "确定删除吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/Del",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.oid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "提交成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            a.setData({
                                pagenum: 1,
                                ddlist: [],
                                mygd: !1,
                                jzgd: !0,
                                jzwb: !1
                            }), a.reLoad(a.data.date);
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
    onLoad: function(e) {
        t.editTabBar(), e.activeIndex && this.setData({
            activeIndex: parseInt(e.activeIndex)
        });
        var a = wx.getStorageSync("sjdsjid");
        console.log(a), this.reLoad(this.data.date);
    },
    reLoad: function(e) {
        var a = wx.getStorageSync("sjdsjid");
        console.log(a);
        var o = this;
        t.util.request({
            url: "entry/wxapp/AppYdOrder",
            cachetime: "0",
            data: {
                store_id: a,
                page: o.data.pagenum,
                time: e
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
                var e = o.data.ddlist;
                e = e.concat(t.data);
                for (var a = [], n = [], s = [], d = 0; d < e.length; d++) "1" == e[d].state && a.push(e[d]), 
                "2" == e[d].state && n.push(e[d]), "4" != e[d].state && "5" != e[d].state && "6" != e[d].state && "7" != e[d].state || s.push(e[d]);
                console.log(a, n, s), o.setData({
                    dqr: a,
                    yqr: n,
                    yqx: s,
                    ddlist: e
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