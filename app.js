App({
    onLaunch: function() {},
    onShow: function() {
        console.log(getCurrentPages());
    },
    onHide: function() {
        console.log(getCurrentPages());
    },
    onError: function(e) {
        console.log(e);
    },
    util: require("we7/resource/js/util.js"),
    editTabBar: function() {
        var e = this.globalData.tabbar, a = getCurrentPages(), t = a[a.length - 1], s = t.__route__;
        for (var n in 0 != s.indexOf("/") && (s = "/" + s), e.list) e.list[n].selected = !1, 
        e.list[n].pagePath == s && (e.list[n].selected = !0);
        t.setData({
            tabbar: e
        });
    },
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7/pages/user/index/index",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "微擎我的"
        } ]
    },
    globalData: {
        userInfo: null,
        tabbar: {
            color: "#333",
            selectedColor: "#34AAFF",
            backgroundColor: "#ffffff",
            borderStyle: "#d5d5d5",
            list: [ {
                pagePath: "/zh_dianc/pages/seller/gzt",
                text: "工作台",
                iconPath: "/zh_dianc/pages/images/gzt@3x.png",
                selectedIconPath: "/zh_dianc/pages/images/gztxz@3x.png",
                selected: !0
            }, {
                pagePath: "/zh_dianc/pages/seller/dd",
                text: "订单",
                iconPath: "/zh_dianc/pages/images/dd@3x.png",
                selectedIconPath: "/zh_dianc/pages/images/ddxz@3x.png",
                selected: !1
            }, {
                pagePath: "/zh_dianc/pages/seller/cp/cplb",
                text: "商品",
                iconPath: "/zh_dianc/pages/images/dbdc.png",
                selectedIconPath: "/zh_dianc/pages/images/dbdcxz.png",
                selected: !1
            }, {
                pagePath: "/zh_dianc/pages/seller/shezhi",
                text: "设置",
                iconPath: "/zh_dianc/pages/images/sz@3x.png",
                selectedIconPath: "/zh_dianc/pages/images/szxz@3x.png",
                selected: !1
            } ],
            position: "bottom"
        }
    },
    siteInfo: require("siteinfo.js")
});