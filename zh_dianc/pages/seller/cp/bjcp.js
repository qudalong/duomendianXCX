var e = getApp(), t = (require("../../../utils/util.js"), require("../../../../siteinfo.js"));

Page({
    data: {
        isbj: !1,
        url1: "",
        logo: "../../images/splogo.png",
        spfl: [],
        spflIndex: 0,
        spxx: [ "外卖菜品", "店内菜品", "店内+外卖" ],
        spxxIndex: 0,
        sjxj: [ "是", "否" ],
        sjxjIndex: 0,
        disabled: !1,
        sppx: "",
        spmc: "",
        cpkc: "",
        yxsl: "",
        dnjg: "",
        wmjg: "",
        bzfy: "",
        cpid: ""
    },
    spflChange: function(e) {
        console.log("spflChange 发生选择改变，携带值为", e.detail.value, this.data.spfl[e.detail.value].id), 
        this.setData({
            spflIndex: e.detail.value
        });
    },
    spxxChange: function(e) {
        console.log("spxxChange 发生选择改变，携带值为", e.detail.value, this.data.spxx[e.detail.value]), 
        this.setData({
            spxxIndex: e.detail.value
        });
    },
    sjxjChange: function(e) {
        console.log("sjxjChange 发生选择改变，携带值为", e.detail.value, this.data.sjxj[e.detail.value]), 
        this.setData({
            sjxjIndex: e.detail.value
        });
    },
    onLoad: function(t) {
        if (console.log(t, this.data.cpid), null != t.cpid) {
            var a = wx.getStorageSync("imglink");
            this.setData({
                cpid: t.cpid,
                isbj: !0
            }), e.util.request({
                url: "entry/wxapp/AppDishesInfo",
                cachetime: "0",
                data: {
                    id: t.cpid
                },
                success: function(t) {
                    console.log("菜品信息", t);
                    var s = wx.getStorageSync("sjdsjid");
                    e.util.request({
                        url: "entry/wxapp/AppDishesType",
                        cachetime: "0",
                        data: {
                            store_id: s
                        },
                        success: function(e) {
                            console.log(t), e.data;
                            for (var a = 0; a < e.data.length; a++) e.data[a].id == t.data.type_id && o.setData({
                                spflIndex: a
                            });
                        }
                    }), o.setData({
                        url1: a,
                        logo: t.data.img,
                        splogo: t.data.img,
                        sppx: t.data.sorting,
                        spmc: t.data.name,
                        cpkc: t.data.num,
                        yxsl: t.data.sit_ys_num,
                        dnjg: t.data.money,
                        wmjg: t.data.wm_money,
                        bzfy: t.data.box_fee,
                        sjxjIndex: Number(t.data.is_shelves) - 1,
                        spxxIndex: Number(t.data.dishes_type) - 1
                    });
                }
            });
        }
        var s = wx.getStorageSync("sjdsjid");
        console.log(s);
        var o = this;
        e.util.request({
            url: "entry/wxapp/AppDishesType",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(e) {
                console.log(e), o.setData({
                    spfl: e.data
                });
            }
        });
    },
    choose: function(e) {
        var a = this;
        console.log(t), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                console.log(e.tempFilePaths);
                var s = e.tempFilePaths;
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                }), wx.uploadFile({
                    url: t.siteroot + "?i=" + t.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_dianc",
                    filePath: e.tempFilePaths[0],
                    name: "upfile",
                    success: function(e) {
                        console.log(e), a.setData({
                            splogo: e.data
                        }), 200 == e.statusCode ? a.setData({
                            url1: "",
                            logo: s
                        }) : wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: !1
                        });
                    },
                    fail: function(e) {
                        console.log(e), wx.showModal({
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
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var a = this, s = this.data.cpid, o = wx.getStorageSync("sjdsjid"), i = t.detail.value.sppx, l = t.detail.value.spmc, n = t.detail.value.cpkc, d = t.detail.value.yxsl, c = t.detail.value.dnjg, u = t.detail.value.wmjg, p = t.detail.value.bzfy, x = this.data.splogo, g = this.data.spfl[this.data.spflIndex].id, r = Number(this.data.spxxIndex) + 1, h = Number(this.data.sjxjIndex) + 1;
        console.log(s, o, i, l, n, d, c, u, p, x, g, r, h);
        var f = "", m = !0;
        null == x ? f = "请上传商品图片！" : "" == l ? f = "请填写商品名称！" : "" == n ? f = "请填写商品库存！" : "" == c ? f = "请填写商品店内价格！" : "" == u ? f = "请填写商品外卖价格！" : (a.setData({
            disabled: !0
        }), m = !1, e.util.request({
            url: "entry/wxapp/AddDishes",
            cachetime: "0",
            data: {
                money: c,
                wm_money: u,
                name: l,
                num: n,
                img: x,
                sorting: i,
                type_id: g,
                sit_ys_num: d,
                is_shelves: h,
                dishes_type: r,
                box_fee: p,
                store_id: o,
                id: s
            },
            success: function(e) {
                console.log(e), 1 == e.data ? (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "cplb"
                    });
                }, 1e3)) : (a.setData({
                    disabled: !1
                }), wx.showToast({
                    title: "请修改后提交！",
                    icon: "loading"
                }));
            }
        })), 1 == m && wx.showModal({
            title: "提示",
            content: f
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