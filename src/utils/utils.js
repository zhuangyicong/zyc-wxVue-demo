import { baseUrl } from "../config/env";

//格式化钱数，三位加一逗号
export function toThousands(number) {
    number = number + "";
    number = number.replace(/\,/g, "");
    if (isNaN(number) || number == "") return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    else
        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}

//格式化金额
export function outputdollars(number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (let i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}

// 4舍五入 取小数点及后两位数 outputcents(1111.1990) =》 .20
function outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}

// 4舍五入 保留2位小数点
export function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

// 加
export function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

// 减
export function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

// 乘
export function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 除
export function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

// 解析url
export function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

/**
 * 上传图片
 * params : 1.filePath: 图片 2.token
 */
export function uploadFile(url, params) {
    return new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("file", params.filePath);
        formData.append("name", "file");
        console.log(formData);
        fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'token': params.token,
            },
            body: formData,
        }).then((response) => response.json()).then((responseData) => {
            console.log('upload_success', responseData);
            resolve(responseData);
        }).catch((err) => {
            console.log('err', err);
            reject(err);
        });
    });
}

/**
 * 上传图片
 * params : 1.filePath: 图片 2.token
 */
export function uploadFileBase64(url, params) {

    if (window.fetch) {
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            formData.append("base64File", params.base64File);
            formData.append("fileName", params.fileName);

            fetch(baseUrl + url, {
                method: 'POST',
                headers: {
                    'token': params.token,
                },
                body: formData
            }).then((response) => response.json()).then((responseData) => {
                resolve(responseData);
            }).catch((err) => {
                reject(err);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            let formData = new FormData();
            formData.append("base64File", params.base64File);
            formData.append("fileName", params.fileName);

            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            requestObj.open('POST', baseUrl + url, true);
            requestObj.setRequestHeader("token", params.token);
            requestObj.send(formData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}

// 压缩图片
export function compress(img, size) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;

    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    let canvas = document.createElement("canvas");
    let tCanvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // 铺底色
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

        // 计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
       
        tCanvas.width = nw;
        tCanvas.height = nh;
        let tctx = canvas.getContext('2d');

        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
        ctx.drawImage(img, 0, 0, width, height);
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    
    //进行最小压缩
    var ndata;
    if (size < 1000000) {
        ndata = canvas.toDataURL('image/jpeg');
    }else{
        ndata = canvas.toDataURL('image/jpeg', 0.5);
    }

    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

    return ndata;
}