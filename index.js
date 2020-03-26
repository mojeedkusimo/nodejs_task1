const http = require('http');
const fs = require('fs');
const qs = require('querystring');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="/message" method="POST">  <h1>Node Form</h1><p>Please enter anything you wish below:</p>   <input type="text" name="message"><br><br>    <button type="submit">Submit</button></form>');


        if (req.method === 'POST') {
            let content = '';
    
            req.on('data', function (data) {
                content += data;
            });
    
            req.on('end', function () {
                let inputText = qs.parse(content).message;

                fs.writeFile('./message.txt', inputText , function () {
                    console.log('text file has been updated with the following text: ' + inputText + '.')
                });
            });

        }


    res.end();
  }).listen(8080, function () {
      console.log('Server running on port 8080...')
  });
  