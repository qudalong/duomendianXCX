var o = getApp();

Page({
    data: {
        coupon: 0,
        Vouchers: 0
    },
    bindGetUserInfo: function(o) {
        console.log(o), "getUserInfo:ok" == o.detail.errMsg && (this.setData({
            hydl: !1
        }), this.changeData());
    },
    changeData: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(t) {
                        console.log(t), o.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: wx.getStorageSync("openid"),
                                img: t.userInfo.avatarUrl,
                                name: t.userInfo.nickName
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            dataType: "json",
                            success: function(o) {
                                console.log("用户信息", o);
                            }
                        });
                        var n = t.userInfo;
                        n.nickName, n.avatarUrl, n.gender, n.province, n.city, n.country, console.log(n), 
                        e.setData({
                            avatarUrl: n.avatarUrl,
                            nickName: n.nickName
                        });
                    }
                }) : (console.log("未授权过"), e.setData({
                    hydl: !0
                }));
            }
        });
    },
    onLoad: function(e) {
        var t = wx.getStorageSync("bqxx");
        if ("1" == t.more) var n = wx.getStorageSync("bqxx").color;
        "2" == t.more && (n = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n
        });
        var a = this, s = wx.getStorageSync("bqxx");
        console.log(s), this.setData({
            bqxx: s,
            color: n
        }), wx.getStorageSync("users").id, this.changeData(), o.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(o) {
                a.setData({
                    url: o.data
                });
            }
        }), o.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(o) {
                console.log(o.data), wx.setStorageSync("url2", o.data);
            }
        }), o.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(o) {
                console.log(o.data), a.setData({
                    fxset: o.data
                });
            }
        }), o.util.request({
            url: "entry/wxapp/Signset",
            cachetime: "0",
            success: function(o) {
                console.log(o.data), a.setData({
                    qdset: o.data[0]
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = wx.getStorageSync("bqxx");
        if ("1" == e.more) var t = wx.getStorageSync("bqxx").color;
        "2" == e.more && (t = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t
        });
        var n = this, a = wx.getStorageSync("bqxx");
        console.log(a), this.setData({
            bqxx: a,
            color: t
        });
        var s = wx.getStorageSync("users").id;
        o.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: s
            },
            success: function(o) {
                console.log(o), n.setData({
                    integral: o.data.total_score,
                    wallet: o.data.wallet
                });
            }
        });
        var c, l, r, i = (c = new Date(), l = c.getMonth() + 1, r = c.getDate(), 1 <= l && l <= 9 && (l = "0" + l), 
        0 <= r && r <= 9 && (r = "0" + r), c.getFullYear() + "-" + l + "-" + r + " " + c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds()).slice(0, 10);
        o.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                user_id: s
            },
            success: function(o) {
                console.log(o);
                var e = o.data.ok, t = [];
                if (console.log(e.length), 0 < e.length) for (var a = 0; a < e.length; a++) console.log(e[a]), 
                e[a].conditions = Number(e[a].conditions), i <= e[a].end_time ? (console.log("有可以用的优惠券"), 
                2 == e[a].state && (t.push(e[a].length), console.log(e[a]), n.setData({
                    coupon: t.length
                }))) : (console.log("没有可以用的优惠券"), n.setData({
                    coupon: 0
                })); else n.setData({
                    coupon: 0
                });
            }
        }), o.util.request({
            url: "entry/wxapp/Voucher",
            cachetime: "0",
            data: {
                user_id: s
            },
            success: function(o) {
                console.log(o);
                var e = o.data.ok, t = [];
                if (0 < e.length) for (var a = 0; a < e.length; a++) e[a].conditions = Number(e[a].conditions), 
                console.log(e[a]), i <= e[a].end_time && (2 == e[a].state ? (console.log("有可以用的代金券"), 
                t.push(e[a]), n.setData({
                    Vouchers: t.length
                })) : (console.log("没有可以用的代金券"), n.setData({
                    Vouchers: 0
                }))); else n.setData({
                    Vouchers: 0
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), this.onShow(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    map: function(e) {
        var t = wx.getStorageSync("users").id;
        wx.chooseAddress({
            success: function(e) {
                console.log(e.userName), console.log(e.postalCode), console.log(e.provinceName), 
                console.log(e.cityName), console.log(e.countyName), console.log(e.detailInfo), console.log(e.nationalCode), 
                console.log(e.telNumber);
                var n = e.telNumber, a = e.countyName + e.detailInfo, s = e.userName;
                o.util.request({
                    url: "entry/wxapp/UpdAdd",
                    cachetime: "0",
                    data: {
                        user_id: t,
                        user_tel: n,
                        user_address: a,
                        user_name: s
                    },
                    success: function(o) {
                        console.log(o);
                    }
                });
            }
        });
    },
    seller: function(o) {
        wx.navigateTo({
            url: "../seller/login"
        });
    },
    zxkf: function() {
        wx.navigateTo({
            url: "kfzx"
        });
    },
    bzzx: function() {
        wx.navigateTo({
            url: "bzzx"
        });
    },
    wallet: function(o) {
        wx.navigateTo({
            url: "wallet"
        });
    },
    youhui: function(o) {
        wx.navigateTo({
            url: "../coupons/shop_coupons"
        });
    },
    youhui2: function(o) {
        wx.navigateTo({
            url: "../coupons/mine_coupons"
        });
    },
    jfsc: function(o) {
        wx.navigateTo({
            url: "../integral/integral"
        });
    },
    integral: function(o) {
        wx.navigateTo({
            url: "integral"
        });
    },
    wyrz: function(o) {
        wx.navigateTo({
            url: "wyrz/authen"
        });
    },
    fx: function(o) {
        wx.navigateTo({
            url: "distribution/yaoqing"
        });
    },
    czzx: function(o) {
        wx.navigateTo({
            url: "cash"
        });
    },
    tzxcx: function(o) {
        var e = this.data.bqxx.tz_appid;
        console.log(e), wx.navigateToMiniProgram({
            appId: e,
            success: function(o) {
                console.log(o);
            }
        });
    }
});