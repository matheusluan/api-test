import { app } from "./app";

const ip = "localhost";
const port = 3333;

const message = `
----------------------------------------------
  ★ ${require("../package.json").name}
  ✓ Server listening on ${ip}:${port}
----------------------------------------------
`;

app.listen(port, '0.0.0.0', () => {
  console.log(message);
});
