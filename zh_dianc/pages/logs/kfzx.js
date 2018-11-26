var n = getApp();

Page({
    data: {},
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    onLoad: function(t) {
        var o = this;
        console.log(this), n.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(n) {
                console.log(n), o.setData({
                    bqxx: n.data,
                    tel: n.data.tel
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});