

export default async (url = '', data = {}, type = 'GET', header, method = 'fetch') => {
    type = type.toUpperCase();
    // url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let headers = {
            // 'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        if (header) Object.assign(headers, { "token": header });

        let requestConfig = {
            headers: headers,
            // credentials: 'include',
            method: type,
            // mode: "cors",
            cache: 'default'
            // cache: "force-cache"
        }

        if (type == 'POST' && JSON.stringify(data) != "{}") {
            // Object.defineProperty(requestConfig, "body", {
            //     value: JSON.stringify(data)
            // });
           
            let body = Object.keys(data).map(key => {
                return key + '=' + data[key];
            });
            requestConfig.body = body.join('&');
        }
        
        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST' && JSON.stringify(data) != "{}" ) {
                // sendData = JSON.stringify(data);
                let body = Object.keys(data).map(key => {
                    return key + '=' + data[key];
                });
                sendData = body.join('&');
            }

            requestObj.open(type, url, true);
            if(header)  requestObj.setRequestHeader("token", header);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

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