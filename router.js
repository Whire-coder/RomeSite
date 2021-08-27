const express = require("express");
const router = express.Router();

router
    .get("/", async function(req, res) {
        res.render("home");
    })
    .get("/drakebot", async function(req, res) {
        res.render("drakebot", {
            serverCount: req.stats.serverCount,
            userCount: req.stats.userCount,
            owner: req.owner,
            support: req.support
        });
    })
    .get('/simplehammer', function(req, res){
        const file = `${__dirname}/res/SimpleHammer.jar`;

        res.download(file);
    })
    .use((req, res) => {
        res.status(404).render("404");
    });

module.exports = router;