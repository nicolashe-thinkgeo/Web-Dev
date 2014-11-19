var http=require('http');

http.createServer(function(request,response){    
	response.writeHead(200,{'Content-Type':'application/json',"Access-Control-Allow-Origin": "*"});
	response.write(JSON.stringify(
	[{name:'Liu Xun',age:27},{name:'Feifei',age:1}]
	));
	response.end();
}).listen(8888)
console.log('Server running at http://localhost:8800/');