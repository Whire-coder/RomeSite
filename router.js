const express = require("express");
const router = express.Router();

router
    .get("/", async function(req, res) {
        res.render("home");
    })
    .get("/drakebot", async function(req, res) {
        res.render("drakebot", {
            serverCount: req.stats.serverCount,
            userCount: req.stats.userCount
        });
    })
    .use((req, res) => {
        res.status(404).render("404");
    });

module.exports = router;