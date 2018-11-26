var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var a = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), o = e.getHours(), i = e.getMinutes(), s = e.getSeconds();
        return [ a, n, r ].map(t).join("/") + " " + [ o, i, s ].map(t).join(":");
    },
    DateDiff: function(t, e) {
        var a, n, r;
        return a = t.split("-"), n = new Date(a[1] + "-" + a[2] + "-" + a[0]), a = e.split("-"), 
        r = new Date(a[1] + "-" + a[2] + "-" + a[0]), parseInt(Math.abs(n - r) / 1e3 / 60 / 60 / 24);
    },
    getDistance: function(t, e, a, n) {
        e = e || 0, a = a || 0, n = n || 0;
        var r = (t = t || 0) * Math.PI / 180, o = a * Math.PI / 180, i = r - o, s = e * Math.PI / 180 - n * Math.PI / 180;
        return 12756274 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(r) * Math.cos(o) * Math.pow(Math.sin(s / 2), 2)));
    },
    ormatDate: function(t) {
        function e(t, e) {
            for (var a = "" + t, n = a.length, r = "", o = e; o-- > n; ) r += "0";
            return r + a;
        }
        var a = new Date(1e3 * t);
        return a.getFullYear() + "-" + e(a.getMonth() + 1, 2) + "-" + e(a.getDate(), 2) + " " + e(a.getHours(), 2) + ":" + e(a.getMinutes(), 2) + ":" + e(a.getSeconds(), 2);
    }
};