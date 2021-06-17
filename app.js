const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const router = require("./router");
const config = require("./config.json");

const app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, "/views"));

app.use(async function(req, res, next){

    await fetch("http://" + config.ip + ":81/web", {
        headers: { "Authorization": "Bearer " + config.authorization }
    })
    .then(res => res.json())
    .then(json => {
        req.stats = {
            serverCount: json.serverCount,
            userCount: json.userCount
        };

        req.owner = json.owner;
        req.support = json.support;
    });
    next();

});

app.use(router);

app.listen(config.port, config.ip, () => {
    console.log(`Running at http${config.https ? "s" : ""}://${`${Boolean(config.name) ? config.name : `${config.ip}:${config.port !== 80 ? config.port + "/" : "/"}`}`}`);
});