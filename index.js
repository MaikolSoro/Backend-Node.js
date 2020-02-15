const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false);
mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/web`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Base de datos: \x1b[32m%s\x1b[0m", "online");

      // Escuchar peticiones
      app.listen(port, () => {
        console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m", "online");
      });
    }
  }
);