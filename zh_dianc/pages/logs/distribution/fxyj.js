var t = getApp();

Page({
    data: {
        open: !0,
        txtype: 2,
        zhtext: "微信帐号",
        zhtstext: "请输入微信帐号",
        zhtype: "number",
        disabled: !1,
        logintext: "提现",
        fwxy: !0
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    tradeinfo: function() {
        this.setData({
            open: !this.data.open
        });
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value), "zfbtx" == t.detail.value && this.setData({
            txtype: 1,
            zhtext: "支付宝帐号",
            zhtstext: "请输入支付宝帐号",
            zhtype: "number"
        }), "wxtx" == t.detail.value && this.setData({
            txtype: 2,
            zhtext: "微信帐号",
            zhtstext: "请输入微信帐号",
            zhtype: "text"
        }), "yhktx" == t.detail.value && this.setData({
            txtype: 3,
            zhtext: "银行卡号",
            zhtstext: "请输入银行卡号",
            zhtype: "number"
        });
    },
    formSubmit: function(e) {
        var a = this;
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var o = wx.getStorageSync("users").id, s = Number(this.data.userinfo.commission), i = this.data.fxset.tx_rate, n = Number(this.data.fxset.tx_money), u = e.detail.value.je, l = e.detail.value.name, c = e.detail.value.zh, r = e.detail.value.checkbox.length, d = e.detail.value.radiogroup;
        if (console.log(o, s, i, n, u, l, c, r, d), "" == d) return wx.showModal({
            title: "提示",
            content: "请选择提现方式"
        }), !1;
        if ("zfbtx" == d) var x = 1;
        "wxtx" == d && (x = 2), "yhktx" == d && (x = 3);
        var h = Number(e.detail.value.je) * (100 - Number(i)) / 100;
        console.log(h);
        var f = "", m = !0;
        s < n ? f = "佣金满" + n + "才能申请提现" : "" == u ? f = "请填写提现金额！" : Number(u) < n ? f = "提现金额未满足提现要求" : Number(u) > s ? f = "提现金额超出您的实际佣金" : "" == l ? f = "请填写姓名！" : "" == c ? f = "请填写帐号！" : 0 == r ? f = "请阅读并同意分销商提现协议" : (a.setData({
            disabled: !0,
            logintext: "提交中..."
        }), m = !1, t.util.request({
            url: "entry/wxapp/Yjtx",
            cachetime: "0",
            data: {
                user_id: o,
                type: x,
                user_name: l,
                account: c,
                tx_cost: u,
                sj_cost: h
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "txmx"
                    });
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), a.setData({
                    disabled: !1,
                    logintext: "提现"
                }));
            }
        })), 1 == m && wx.showModal({
            title: "提示",
            content: f
        });
    },
    onLoad: function(e) {
        var a = this, o = wx.getStorageSync("users").id;
        t.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    fxset: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), a.setData({
                    userinfo: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/MyCommission",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), a.setData({
                    wdyj: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    iswx: t.data.is_wx,
                    iszfb: t.data.is_zfb,
                    isyhk: t.data.is_yhk
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});