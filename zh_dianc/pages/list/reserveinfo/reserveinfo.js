var o = getApp();

Page({
    data: {
        modalHidden: !0,
        infoactive: "1"
    },
    onLoad: function(n) {
        var t = wx.getStorageSync("bqxx");
        if ("1" == t.more) var a = wx.getStorageSync("bqxx").color;
        "2" == t.more && (a = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a
        }), this.setData({
            color: a
        });
        var e = wx.getStorageSync("imglink"), i = this, c = n.yyid;
        console.log(c), o.util.request({
            url: "entry/wxapp/ReservationInfo",
            cachetime: "0",
            data: {
                id: c
            },
            success: function(o) {
                console.log(o), i.setData({
                    yyinfo: o.data,
                    imglink: e,
                    infoactive: o.data.state
                });
            }
        });
    },
    call_phone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.yyinfo.tel
        });
    },
    cancel: function(o) {
        this.setData({
            modalHidden: !1
        });
    },
    modalChange: function() {
        this.setData({
            modalHidden: !0
        });
    },
    modalcancel: function() {
        this.setData({
            modalHidden: !0
        });
    },
    infoactive1: function(o) {
        this.setData({
            infoactive1: !1,
            infoactive2: !0,
            infoactive3: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});