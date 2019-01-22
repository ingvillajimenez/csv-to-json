const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3001;

//Create a server node on port 3001.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('JSON data in terminal');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//Convert the csv file customer-data.csv to json.
const csvFilePath='./customer-data.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log('Converting to JSON...')

    var json_Obj = JSON.stringify({data: jsonObj});

    fs.writeFile('./customer-data.json', json_Obj, (err) => {
        if (err) throw err;
    });

    //Read the JSON file.
    fs.readFile('./customer-data.json', 'utf-8', (err, data) => {
        if (err) throw err;
        
        var obj = JSON.parse(data);
        //Show id's in terminal.
        obj.data.forEach(element => console.log(element.id));
    });
});