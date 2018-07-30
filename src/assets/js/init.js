(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    document.body.addEventListener('touchstart', function () { });
    document.setTitle = function (title) {
        if (!title) return;
        document.title = title;
        var mobile = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe')
            iframe.style.display = 'none'
            // 替换成站标favicon路径或者任意存在的较小的图片即可
            iframe.setAttribute('src', '/static/favicon.ico')
            var iframeCallback = function () {
                setTimeout(function () {
                    iframe.removeEventListener('load', iframeCallback)
                    document.body.removeChild(iframe)
                }, 0)
            }
            iframe.addEventListener('load', iframeCallback)
            document.body.appendChild(iframe)
        }
    }
})(document, window);