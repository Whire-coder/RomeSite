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
    .get("/drakebot/staff", async function(req, res) {
        res.render("staff", {
            owner: req.owner,
            support: req.support
        })
    })
    .use((req, res) => {
        res.status(404).render("404");
    });

module.exports = router;