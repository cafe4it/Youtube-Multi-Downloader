import _ from 'lodash';

const formats = [
    {
        id: '5',
        type: 'FLV',
        resolution: '320 x 240',
        quality: '240P'
    },
    {
        id: '13',
        type: '3GP',
        resolution: '176 x 144',
        quality: '240P'
    },
    {
        id: '17',
        type: '3GP',
        resolution: '176 x 144',
        quality: '144P'
    },
    {
        id: '18',
        type: 'MP4',
        resolution: '480 x 360',
        quality: '360P'
    },
    {
        id: '22',
        type: 'MP4',
        resolution: '1280 x 720',
        quality: '720P'
    },
    {
        id: '34',
        type: 'FLV',
        resolution: '480 x 360',
        quality: '360P'
    },
    {
        id: '35',
        type: 'FLV',
        resolution: '640 x 480',
        quality: '480P'
    },
    {
        id: '36',
        type: '3GP',
        resolution: '320 x 240',
        quality: '240P'
    },
    {
        id: '37',
        type: 'MP4',
        resolution: '1920 x 1080',
        quality: '1080P'
    },
    {
        id: '38',
        type: 'MP4',
        resolution: '2048 x 1080',
        quality: '1080P'
    },
    {
        id: '43',
        type: 'WEBM',
        resolution: '480 x 360',
        quality: '360P'
    },
    {
        id: '44',
        type: 'WEBM',
        resolution: '640 x 480',
        quality: '480P'
    },
    {
        id: '45',
        type: 'WEBM',
        resolution: '1280 x 720',
        quality: '720P'
    },
    {
        id: '59',
        type: 'MP4',
        resolution: '640 x 480',
        quality: '480P'
    },
    {
        id: '78',
        type: 'MP4',
        resolution: '640 x 480',
        quality: '480P'
    },
    {
        id: '82',
        type: 'MP4',
        resolution: '480 x 360',
        quality: '360P',
        flag: '3D'
    },
    {
        id: '83',
        type: 'MP4',
        resolution: '640 x 480',
        quality: '480P',
        flag: '3D'
    },
    {
        id: '84',
        type: 'MP4',
        resolution: '1280 x 720',
        quality: '720P',
        flag: '3D'
    },
    {
        id: '85',
        type: 'MP4',
        resolution: '1920 x 1080',
        quality: '1080P',
        flag: '3D'
    },
    {
        id: '100',
        type: 'WEBM',
        resolution: '480 x 360',
        quality: '360P',
        flag: '3D'
    },
    {
        id: '102',
        type: 'WEBM',
        resolution: '640 x 480',
        quality: '480P',
        flag: '3D'
    },
    {
        id: '102',
        type: 'WEBM',
        resolution: '1280 x 720',
        quality: '720P',
        flag: '3D'
    },
    {
        id: '133',
        type: 'MP4',
        resolution: '320 x 240',
        quality: '240P',
        flag: 'no audio'
    },
    {
        id: '134',
        type: 'MP4',
        resolution: '480 x 360',
        quality: '360P',
        flag: 'no audio'
    },
    {
        id: '135',
        type: 'MP4',
        resolution: '640 x 480',
        quality: '480P',
        flag: 'no audio'
    },
    {
        id: '136',
        type: 'MP4',
        resolution: '1280 x 720',
        quality: '720P',
        flag: 'no audio'
    },
    {
        id: '137',
        type: 'MP4',
        resolution: '1920 x 1080',
        quality: '1080P',
        flag: 'no audio'
    },
    {
        id: '139',
        type: 'MP4',
        resolution: 'Low bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '140',
        type: 'MP4',
        resolution: 'Med bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '141',
        type: 'MP4',
        resolution: 'Hi bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '160',
        type: 'MP4',
        resolution: '256 x 144',
        quality: '144P',
        flag: 'no audio'
    },
    {
        id: '171',
        type: 'WEBM',
        resolution: 'Med bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '172',
        type: 'WEBM',
        resolution: 'Hi bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '242',
        type: 'WEBM',
        resolution: '320 x 240',
        quality: '240P',
        flag: 'no audio'
    },
    {
        id: '243',
        type: 'WEBM',
        resolution: '480 x 360',
        quality: '360P',
        flag: 'no audio'
    },
    {
        id: '244',
        type: 'WEBM',
        resolution: '640 x 480',
        quality: '480P',
        flag: 'no audio'
    },
    {
        id: '245',
        type: 'WEBM',
        resolution: '640 x 480',
        quality: '480P',
        flag: 'no audio'
    },
    {
        id: '246',
        type: 'WEBM',
        resolution: '640 x 480',
        quality: '480P',
        flag: 'no audio'
    },
    {
        id: '247',
        type: 'WEBM',
        resolution: '1280 x 720',
        quality: '720P',
        flag: 'no audio'
    },
    {
        id: '248',
        type: 'WEBM',
        resolution: '1920 x 1080',
        quality: '1080P',
        flag: 'no audio'
    },
    {
        id: '249',
        type: 'WEBM',
        resolution: 'Low bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '250',
        type: 'WEBM',
        resolution: 'Med bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '251',
        type: 'WEBM',
        resolution: 'Hi bitrate',
        quality: '',
        flag: 'audio only'
    },
    {
        id: '264',
        type: 'MP4',
        resolution: '2560 x 1440',
        quality: '1440P',
        flag: 'no audio'
    },
    {
        id: '266',
        type: 'WEBM',
        resolution: '3840 x 2160',
        quality: '2160P',
        flag: 'no audio'
    },
    {
        id: '271',
        type: 'WEBM',
        resolution: '2560 x 1440',
        quality: '1440P',
        flag: 'no audio'
    },
    {
        id: '272',
        type: 'WEBM',
        resolution: '3840 x 2160',
        quality: '2160P',
        flag: 'no audio'
    },
    {
        id: '278',
        type: 'WEBM',
        resolution: '256 x 144',
        quality: '144P',
        flag: 'no audio'
    },
    {
        id: '298',
        type: 'MP4',
        resolution: '1280 x 720',
        quality: '720P',
        flag: 'no audio'
    },
    {
        id: '302',
        type: 'WEBM',
        resolution: '1280 x 720',
        quality: '720P',
        flag: 'no audio'
    },
    {
        id: '313',
        type: 'WEBM',
        resolution: '3840 x 2160',
        quality: '2160P',
        flag: 'no audio'
    },
]

export default (response)=>{
    function extractParameters(q) {
        var params = q.split('&');
        var result = {};
        for (var i = 0, n = params.length; i < n; i++) {
            var param = params[i];
            var pos = param.indexOf('=');
            if (pos === -1)
                continue;
            var name = param.substring(0, pos);
            var value = param.substring(pos + 1);
            result[name] = decodeURIComponent(value);
        }
        return result;
    }

    var params = extractParameters(response);

    // If the request failed, return an object with an error code
    // and an error message
    if (params.status === 'fail') {
        return {
            status: params.status,
            errorcode: params.errorcode,
            reason: (params.reason || '').replace(/\+/g, ' ')
        };
    }

    // Otherwise, the query was successful
    /*var result = {
     status: params.status
     };*/

    // Now parse the available streams
    //console.log(params);
    var streamsText = params.url_encoded_fmt_stream_map;
    if (!streamsText)
        throw Error('No url_encoded_fmt_stream_map parameter');
    if (params.adaptive_fmts)
        streamsText += ',' + params.adaptive_fmts;
    var streams = streamsText.split(',');
    for (var i = 0, n = streams.length; i < n; i++) {
        streams[i] = extractParameters(streams[i]);
    }

    let result = {};

    if (params.title) {
        result.title = params.title.replace(/\+/g, ' ');
    }
    if (params.length_seconds) {
        result.duration = params.length_seconds;
    }
    if (params.thumbnail_url) {
        result.poster = params.thumbnail_url;
    }

    result.streams = streams.map((stream)=>{
        let _stream = _.find(formats,(f)=>{ return f.id === stream.itag}) || {};
        return _.extend(_stream, { url : stream.url + '&signature=' + (stream.sig || '')});
        /*_stream.type = stream.type;
        // Strip codec information off of the mime type
        if (_stream.type && _stream.type.indexOf(';') !== -1) {
            _stream.type = _stream.type.split(';', 1)[0];
        }*/
    })

    return result;
}