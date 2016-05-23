onmessage = function (e) {
    var url = e.data.url;
    fetch(url, {method: 'get'}).then(function (response) {
        if (response.status === 200) {
            return response.text()
        }
    }).then(function (text) {
        if (text)postMessage(text);
    });
}