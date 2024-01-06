const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-type", "Text");
    res.write("<html><Title>This is the Node server</Title>");
    res.write(
      '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Send</button></form></body></html>'
    );
    return res.end();
  }

  if (url === "/message" && method == "POST") {
    const dataArray = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      dataArray.push(chunk);
    });

    return req.on("end", () => {
      console.log("This is buffer ->", Buffer);
      const result = Buffer.concat(dataArray).toString();
      console.log(result);
      const reqData = result.split("=")[1];
      console.log(reqData);
      fs.writeFileSync("message.txt", reqData);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-type", "Text");
  res.write("<html><Title>This is the Node server</Title>");
  res.write("<body><h1> Hello From The Node Js Server</h1></body></html>");
  res.end();
};

module.exports = requestHandler;
