const express = require("express");
const router = express.Router();

router
    .get("/", async function(req, res) {
        res.render("drakebot", {
            serverCount: req.stats.serverCount,
            userCount: req.stats.userCount,
            owner: req.owner,
            support: req.support
        });
    })
    .get("/rome", async function(req, res) {
        res.render("home");
    })
    .get('/simplehammer', function(req, res){
        const file = `${__dirname}/res/SimpleHammer.jar`;

        res.download(file);
    })
    .get("/feloshSaitPasEcrire", function(req, res) {
        res.render("felosh")
    })
    .use((req, res) => {
        res.status(404).render("404");
    });

module.exports = router;