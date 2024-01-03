import { app } from "./app";

const ip = "localhost";
const port = 3333;

const message = `
----------------------------------------------
  ★ ${require("../package.json").name}
  ✓ Server listening on ${ip}:${port}
----------------------------------------------
`;

app.listen(port, () => {
  console.log(message);
});
