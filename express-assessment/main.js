import createServer from "./server";

const server = createServer();

server.listen(8080, () => {
  console.log("App is listening at localhost:8080");
});
