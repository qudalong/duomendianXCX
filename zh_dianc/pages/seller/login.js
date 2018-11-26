var t = getApp();

Page({
    data: {
        disabled: !0,
        zh: "",
        mm: "",
        logintext: "登录"
    },
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    srzh: function(t) {
        console.log(t.detail.value), this.setData({
            zh: t.detail.value
        }), "" != this.data.zh && "" != this.data.mm ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    srmm: function(t) {
        console.log(t.detail.value), this.setData({
            mm: t.detail.value
        }), "" != this.data.zh && "" != this.data.mm ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    login: function() {
        var a = this.data.zh, e = this.data.mm;
        console.log(a, e), this.setData({
            logintext: "登录中...",
            disabled: !0
        });
        var o = this;
        t.util.request({
            url: "entry/wxapp/storelogin",
            cachetime: "0",
            data: {
                user: a,
                password: e
            },
            success: function(t) {
                console.log(t), o.setData({
                    logintext: "登录",
                    disabled: !1
                }), 2 == t.data ? wx.showModal({
                    title: "提示",
                    content: "您的帐号或密码错误，请重新输入"
                }) : "1" == t.data.state ? (wx.setStorageSync("sjdsjid", t.data.store_id), wx.redirectTo({
                    url: "gzt"
                })) : wx.showModal({
                    title: "提示",
                    content: "该帐号已禁用"
                });
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        console.log(this);
        var o = wx.getStorageSync("sjdsjid");
        console.log(o), o ? (console.log("已存在"), wx.redirectTo({
            url: "gzt"
        })) : console.log("不存在"), t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    bqxx: t.data,
                    tel: t.data.tel
                });
            }
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