import http from "http";

export default class Server {
  constructor() {
    this.createServer();
  }

  createServer() {
    const server = http.createServer((req, res) => {
      res.write("Hello word");
      res.end();
    });
    server.listen(5000, () => {
      console.log(`Server is working on PORT ${5000}`);
    });
  }
}
