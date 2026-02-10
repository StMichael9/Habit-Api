import { app } from "./server.js";
import Env from "../env.js";

app.listen(Env.PORT, () => {
  console.log(`Server running on port: ${Env.PORT}`);
});
