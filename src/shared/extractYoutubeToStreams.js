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
		flag : '3D'
	},
	{
		id: '83',
		type: 'MP4',
		resolution: '640 x 480',
		quality: '480P',
		flag : '3D'
	},
	{
		id: '84',
		type: 'MP4',
		resolution: '1280 x 720',
		quality: '720P',
		flag : '3D'
	},
	{
		id: '85',
		type: 'MP4',
		resolution: '1920 x 1080',
		quality: '1080P',
		flag : '3D'
	},
	{
		id: '100',
		type: 'WEBM',
		resolution: '480 x 360',
		quality: '360P',
		flag : '3D'
	},
	{
		id: '102',
		type: 'WEBM',
		resolution: '640 x 480',
		quality: '480P',
		flag : '3D'
	},
	{
		id: '102',
		type: 'WEBM',
		resolution: '1280 x 720',
		quality: '720P',
		flag : '3D'
	},
	{
		id: '133',
		type: 'MP4',
		resolution: '320 x 240',
		quality: '240P',
		flag : 'no audio'
	},
	{
		id: '134',
		type: 'MP4',
		resolution: '480 x 360',
		quality: '360P',
		flag : 'no audio'
	},
	{
		id: '135',
		type: 'MP4',
		resolution: '640 x 480',
		quality: '480P',
		flag : 'no audio'
	},
	{
		id: '136',
		type: 'MP4',
		resolution: '1280 x 720',
		quality: '720P',
		flag : 'no audio'
	},
	{
		id: '137',
		type: 'MP4',
		resolution: '1920 x 1080',
		quality: '1080P',
		flag : 'no audio'
	},
	{
		id: '139',
		type: 'MP4',
		resolution: 'Low bitrate',
		quality: '',
		flag : 'audio only'
	},
	{
		id: '139',
		type: 'MP4',
		resolution: 'Med bitrate',
		quality: '',
		flag : 'audio only'
	},
]