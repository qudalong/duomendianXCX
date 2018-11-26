var t = getApp();

Page({
    data: {
        bomb: !0,
        kpgg: !0,
        ssq: "",
        xxdz: "",
        djdh: !1,
        qddh: !1
    },
    onLoad: function(a) {
        console.log(a.id);
        var e = wx.getStorageSync("imglink"), o = wx.getStorageSync("users").id;
        this.setData({
            url: e
        });
        var n = this;
        t.util.request({
            url: "entry/wxapp/JfGoodsInfo",
            cachetime: "0",
            data: {
                id: a.id
            },
            success: function(t) {
                console.log(t), n.setData({
                    spinfo: t.data[0]
                }), wx.setNavigationBarTitle({
                    title: t.data[0].name
                });
            }
        }), t.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), n.setData({
                    integral: t.data.total_score
                });
            }
        });
    },
    duihuan: function() {
        this.setData({
            bomb: !1
        });
    },
    cancel: function() {
        this.setData({
            bomb: !0
        });
    },
    caomfirm: function() {
        var a = wx.getStorageSync("users").id, e = this, o = e.data.spinfo.id, n = e.data.spinfo.money, s = e.data.spinfo.hb_moeny, i = Number(e.data.integral), d = e.data.spinfo.name, c = e.data.spinfo.img;
        console.log(a, o, Number(n), s, i, d, c), "1" == e.data.spinfo.type ? (e.setData({
            bomb: !0
        }), Number(n) > i ? wx.showModal({
            title: "提示",
            content: "您的积分不足以兑换此物品"
        }) : (e.setData({
            djdh: !0
        }), t.util.request({
            url: "entry/wxapp/Exchange",
            cachetime: "0",
            data: {
                user_id: a,
                good_id: o,
                integral: n,
                hb_money: s,
                type: 1,
                good_name: d,
                good_img: c
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "兑换成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), e.setData({
                    djdh: !1
                }));
            }
        }))) : (e.setData({
            bomb: !0
        }), Number(n) > i ? wx.showModal({
            title: "提示",
            content: "您的积分不足以兑换此物品"
        }) : e.setData({
            kpgg: !1
        }));
    },
    ycgg: function() {
        this.setData({
            kpgg: !0
        });
    },
    dingwei: function(t) {
        console.log(t);
        var a = this;
        wx.chooseLocation({
            success: function(t) {
                console.log(t);
                var e = t.address.indexOf("区");
                console.log(t.address.substring(0, e + 1)), a.setData({
                    location: t.latitude + "," + t.longitude,
                    ssq: t.address.substring(0, e + 1),
                    xxdz: t.address.substring(e + 1) + t.name
                });
            }
        });
    },
    formSubmit: function(a) {
        console.log("form发生了submit事件，携带数据为：", a.detail.value);
        var e = this, o = wx.getStorageSync("users").id, n = e.data.spinfo.id, s = e.data.spinfo.money, i = e.data.spinfo.name, d = e.data.spinfo.img, c = a.detail.value.lxr, l = a.detail.value.tel, u = (e.data.ssq, 
        e.data.ssq + a.detail.value.grxxdz);
        console.log(o, n, s, c, l, u, i, d);
        var r = "", g = !0;
        "" == c ? r = "请填写联系人！" : "" == l ? r = "请填写联系电话！" : /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(l) && 11 == l.length ? "" == u ? r = "请选择位置！" : (g = !1, 
        e.setData({
            qddh: !0
        }), t.util.request({
            url: "entry/wxapp/Exchange",
            cachetime: "0",
            data: {
                user_id: o,
                good_id: n,
                integral: s,
                user_name: c,
                user_tel: l,
                address: u,
                type: 2,
                good_name: i,
                good_img: d
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "兑换成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), e.setData({
                    qddh: !1
                }));
            }
        })) : r = "手机号错误", 1 == g && wx.showModal({
            title: "提示",
            content: r
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