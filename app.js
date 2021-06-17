const express = require("express");
const router = require("./router");
const fetch = require("node-fetch");
const path = require("path");

const config = {
    ip: "45.90.162.185",
    port: "80",
    https: true,
    name: "rome-dev.fr"
};

const app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, "/views"));

app.use(async function(req, res, next){
    await fetch("http://45.90.162.185:81/web", {
        headers: { "Authorization": "Bearer mouchou" }
    })
    .then(res => res.json())
    .then(json => {
        req.stats = {
            serverCount: json.serverCount,
            userCount: json.userCount
        };
    })

    next();
});
app.use(router);

app.listen(config.port, config.ip, () => {
    console.log(`Running at http${config.https ? "s" : ""}://${`${Boolean(config.name) ? config.name : `${config.ip}:${config.port !== 80 ? config.port + "/" : "/"}`}`}`);
});