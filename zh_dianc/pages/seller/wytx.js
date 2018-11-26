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
        var o = wx.getStorageSync("sjdsjid"), i = Number(this.data.commission), s = Number(this.data.fxset.tx_money), n = e.detail.value.je, l = e.detail.value.name, u = e.detail.value.zh, c = e.detail.value.checkbox.length, x = e.detail.value.radiogroup;
        if (console.log(o, i, s, n, l, u, c, x), "" == x) return wx.showModal({
            title: "提示",
            content: "请选择提现方式"
        }), !1;
        if ("zfbtx" == x) var d = 1;
        "wxtx" == x && (d = 2), "yhktx" == x && (d = 3);
        var r = "", h = !0;
        i < s ? r = "佣金满" + s + "才能申请提现" : "" == n ? r = "请填写提现金额！" : Number(n) < s ? r = "提现金额未满足提现要求" : Number(n) > i ? r = "提现金额超出您的实际佣金" : "" == l ? r = "请填写姓名！" : "" == u ? r = "请填写帐号！" : 0 == c ? r = "请阅读并同意商家提现协议" : (a.setData({
            disabled: !0,
            logintext: "提交中..."
        }), h = !1, t.util.request({
            url: "entry/wxapp/StoreTx",
            cachetime: "0",
            data: {
                store_id: o,
                type: d,
                name: l,
                username: u,
                tx_cost: n
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
        })), 1 == h && wx.showModal({
            title: "提示",
            content: r
        });
    },
    onLoad: function(e) {
        var a = this, o = wx.getStorageSync("sjdsjid");
        t.util.request({
            url: "entry/wxapp/StoreKtx",
            cachetime: "0",
            data: {
                store_id: o
            },
            success: function(t) {
                console.log(t), a.setData({
                    commission: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    iswx: t.data.is_wx,
                    iszfb: t.data.is_zfb,
                    isyhk: t.data.is_yhk,
                    fxset: t.data
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