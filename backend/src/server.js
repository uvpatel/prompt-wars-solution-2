import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`ElectionGuide AI backend listening on port ${env.port}`);
});
