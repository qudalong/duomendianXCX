var o = getApp(), e = require("../../../../siteinfo.js");

Page({
    data: {
        in1: !1,
        in2: !1,
        in3: !1,
        logg: !1,
        log: !1,
        lo: !1,
        fwxy: !0,
        yyzz: "",
        yyzz1: "",
        yyzz2: "",
        yyzz3: ""
    },
    onLoad: function(e) {
        var t = this;
        o.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(o) {
                console.log(o), t.setData({
                    rzxy: o.data.rzxy,
                    xtxx: o.data
                });
            }
        });
    },
    dingwei: function(o) {
        console.log(o);
        var e = this;
        wx.chooseLocation({
            success: function(o) {
                console.log(o), e.setData({
                    sjdz: o.address + o.name
                });
            }
        });
    },
    onReady: function() {},
    lookFwxy: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    onShow: function() {},
    choose: function(o) {
        var t = this;
        console.log(e), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                console.log(o.tempFilePaths);
                var a = o.tempFilePaths;
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                }), wx.uploadFile({
                    url: e.siteroot + "?i=" + e.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_dianc",
                    filePath: o.tempFilePaths[0],
                    name: "upfile",
                    success: function(o) {
                        console.log(o), t.setData({
                            yyzz: o.data
                        }), 200 == o.statusCode ? t.setData({
                            files: a
                        }) : wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    fail: function(o) {
                        console.log(o), wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            }
        });
    },
    choose1: function(o) {
        var t = this;
        console.log(e), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                console.log(o.tempFilePaths);
                var a = o.tempFilePaths;
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                }), wx.uploadFile({
                    url: e.siteroot + "?i=" + e.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_dianc",
                    filePath: o.tempFilePaths[0],
                    name: "upfile",
                    success: function(o) {
                        console.log(o), t.setData({
                            yyzz1: o.data
                        }), 200 == o.statusCode ? t.setData({
                            files1: a
                        }) : wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    fail: function(o) {
                        console.log(o), wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            }
        });
    },
    choose2: function(o) {
        var t = this;
        console.log(e), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                console.log(o.tempFilePaths);
                var a = o.tempFilePaths;
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                }), wx.uploadFile({
                    url: e.siteroot + "?i=" + e.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_dianc",
                    filePath: o.tempFilePaths[0],
                    name: "upfile",
                    success: function(o) {
                        console.log(o), t.setData({
                            yyzz2: o.data
                        }), 200 == o.statusCode ? t.setData({
                            files2: a
                        }) : wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    fail: function(o) {
                        console.log(o), wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            }
        });
    },
    choose3: function(o) {
        var t = this;
        console.log(e), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                console.log(o.tempFilePaths);
                var a = o.tempFilePaths;
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                }), wx.uploadFile({
                    url: e.siteroot + "?i=" + e.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_dianc",
                    filePath: o.tempFilePaths[0],
                    name: "upfile",
                    success: function(o) {
                        console.log(o), t.setData({
                            yyzz3: o.data
                        }), 200 == o.statusCode ? t.setData({
                            files3: a
                        }) : wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    fail: function(o) {
                        console.log(o), wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            }
        });
    },
    formSubmit: function(e) {
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var t = wx.getStorageSync("users").id, a = e.detail.value.sjname, s = e.detail.value.sjdz, n = e.detail.value.lxtel, i = e.detail.value.faname, l = this.data.yyzz, c = this.data.yyzz1, u = this.data.yyzz2, d = this.data.yyzz3;
        console.log(t, a, s, n, i, l, c, u, d);
        var h = "", w = !0;
        "" == a ? h = "请填写商家名称！" : "" == n ? h = "请填写联系电话！" : /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(n) && 11 == n.length ? "" == i ? h = "请填写法定代表人姓名！" : "" == l ? h = "请上传营业执照图片！" : "1" == this.data.xtxx.is_img && "" == c ? h = "请上传食品安全许可证图片！" : "1" == this.data.xtxx.is_img && "" == u ? h = "请上传法人身份证正面图片！" : "1" == this.data.xtxx.is_img && "" == d ? h = "请上传法人身份证反面图片！" : (w = !1, 
        o.util.request({
            url: "entry/wxapp/ruzhu",
            cachetime: "0",
            data: {
                user_id: t,
                store_name: a,
                tel: n,
                user_name: i,
                img: l,
                sp_img: c,
                sfz_img: u,
                sfz_img2: d,
                address: s
            },
            success: function(o) {
                console.log(o), 1 == o.data ? (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                });
            }
        })) : h = "手机号错误！", 1 == w && wx.showModal({
            title: "提示",
            content: h
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});