//Importing the htttp module

const http = require("http");
const fs = require("fs");

//creating the node server

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html><title>Assignment Fist</title>");
    res.write("<body><lable>UserName<label>");
    res.write(
      '<form method="POST" action="/create-user"><input name="userName" type="text" placeholder="Enter Username"><button type="submit">Save</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method == "POST") {
    // take the data coming from the req
    const dataArray = [];
    req.on("data", (chunk) => {
      dataArray.push(chunk);
    });

    // now using the end parameter after the data has been processed in order to add that into the buffer

    return req.on("end", () => {
      const result = Buffer.concat(dataArray).toString().split("=")[1];
      console.log(result);
      res.setHeader("Location", "/");

      return res.end();
    });
  }
});

server.listen(4000);
