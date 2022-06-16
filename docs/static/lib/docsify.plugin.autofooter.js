/* docsify-sidebarFooter.js v4.0.0 | (c) Mark Battistella */
function getFooter(b) {
    if (!b.name || !b.copyYear) return "No config set";
    var w = (new Date).getFullYear();
    return [b.name ? b.name : null, b.url ? b.url : null, b.copyYear ? b.copyYear : w, b.policy ? b.policy : null, b.terms ? b.terms : null, b.cookies ? b.cookies : null, b.onBody ? b.onBody : !1]
}
var footerOptions = {
    name: "",
    url: "",
    copyYear: "",
    policy: !1,
    terms: !1,
    cookies: !1,
    onBody: !1
};

function autoFooter(b, w) {
    var c = getFooter(footerOptions),
        y = c[0],
        t = c[1],
        g = c[2],
        l = c[3],
        h = c[4],
        u = c[5],
        m = c[6];
    b.init(function () {
        function n(a) {
            function k(e) {
                return ("0" + parseInt(e).toString(16)).slice(-2)
            }
            a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
            return "#" + k(a[1]) + k(a[2]) + k(a[3])
        }

        function f(a, k) {
            0 === a.indexOf("#") && (a = a.slice(1));
            3 === a.length && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
            0 === a.length && (a = "FFFFFF");
            6 !== a.length && (a = n(a));
            var e = parseInt(a.slice(0, 2), 16),
                p = parseInt(a.slice(2, 4), 16),
                q = parseInt(a.slice(4, 6), 16);
            if (k) return 186 < .299 * e + .587 * p + .114 * q ? "#000000" : "#FFFFFF";
            var v = Array(2).join("0");
            e = (v + (255 - e).toString(16)).slice(-2);
            p = (v + (255 - p).toString(16)).slice(-2);
            q = (v + (255 - q).toString(16)).slice(-2);
            return "#" + e + p + q
        }
        if ("boolean" === typeof m && m) {
            var d = document.querySelector("head"),
                x = document.createElement("style"),
                r = "" === document.body.style.backgroundColor ? "#FFF" : document.body.style.backgroundColor,
                z = f(r, !0);
            r = "#mb-footer { position: fixed; bottom: 0; left: 50%; border-radius: 10em 10em 0 0; max-width: var(--content-max-width, 800px); width: 100%; padding: 0 45px; text-align: center; box-shadow: 0 -1em 1em 0 rgba(0,0,0,0.05); transform: translateX(-50%); background: " +
                r + "; line-height: 2em; } #mb-footer, #mb-footer a { color: " + z + "; } #mb-footer > div > div, #mb-footer > div a { display: inline-block; margin-right: 1em; } @media( max-width: 430px ){ #mb-footer { position: relative; left: auto; transform: none; } #mb-footer span { display: inline-block; } }";
            d.appendChild(x);
            x.appendChild(document.createTextNode(r))
        }
    });
    b.doneEach(function () {
        var n = document.getElementById("mb-footer");
        if (n && "No config set" !== c) {
            var f = (new Date).getFullYear(),
                d = window.location.origin +
                window.location.pathname + "#/";
            n.innerHTML = ("boolean" === typeof m && m ? "" : "<hr/>") + "<div style='font-size:70%;'><div>&copy; " + (null == g || g > f ? f : g) + (null != g && g < f ? "&mdash;" + f : "") + "</div>" + (null == t ? "<div>" : "<a target='_blank' href='" + t + "'>") + y + ("" === t ? "</div>" : "</a>") + "<span>" + ("boolean" === typeof l || "string" === typeof l ? "boolean" === typeof l ? "<a href='" + d + "_policy'>Policy</a>" : "<a href='" + d + l + "'>Policy</a>" : "") + ("boolean" === typeof h || "string" === typeof h ? "boolean" === typeof h ? "<a href='" + d + "_terms'>Terms</a>" :
                "<a href='" + d + h + "'>Terms</a>" : "") + ("boolean" === typeof u || "string" === typeof u ? "boolean" === typeof h ? "<a href='" + d + "_cookies'>Cookies</a>" : "<a href='" + d + u + "'>Cookies</a>" : "") + "</span></div>"
        }
    })
}
window.$docsify.autoFooter = Object.assign(footerOptions, window.$docsify.autoFooter);
window.$docsify.plugins = [].concat(autoFooter, window.$docsify.plugins);
