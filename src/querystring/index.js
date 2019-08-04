/**
 * @description querystring模块
 */

const querystring = require('querystring');

const url = 'https://www.trip.com/things-to-do/list?searchtype=1&searchkey=2&cityid=58&keyword=disney';

const queryUrl = url.split('?')[1];

console.log(querystring.parse(queryUrl))
//{ searchtype: '1',
//  searchkey: '2',
//  cityid: '58',
//  keyword: 'disney' }

const params = { searchtype: '1',
  searchkey: '2',
  cityid: '58',
  keyword: 'disney' };

console.log(querystring.stringify(params))
// searchtype=1&searchkey=2&cityid=58&keyword=disney