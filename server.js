import app from "./middleware.js";
import router from "./users/user_routes.js";
const port = 4000;

app.use(router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
