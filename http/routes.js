var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var secret  = 'ScarlettJohanson';

router.get("/", function(req, res) {
    res.render("main/layout");
})

router.get("/main/:url", function(req, res) {
    var page = req.params.url
    res.render("main/frags/" + page);
})

router.get("/mainpartials/:url", function(req, res) {
    var page = req.params.url
    res.render("main/partials/" + page);
})

router.get("/user", function(req, res) {
    res.render("user/layout");
})

router.get("/token", function(req, res) {

    token = jwt.sign({ id: req.user.userId}, secret, { expiresIn: '1h' });

    console.log(req.user.userId);
    res.redirect('/user' + token);
})

router.get("/user:token", function(req, res) {
    res.render("user/layout");
})

router.get("/user/:url", function(req, res) {
    var page = req.params.url
    res.render("user/frags/" + page);
})

router.get("/admin/:url", function(req, res) {
    var page = req.params.url
    res.render("admin/frags/" + page);
})

router.get("/admin", function(req, res) {
    res.render("admin/layout");
})

router.get("/cotizador/:url", function(req, res) {
    var page = req.params.url
    res.render("cotizador/frags/" + page);
})

router.get("/cotizador", function(req, res) {
    res.render("cotizador/layout");
})

router.get("/cotizador2/:url", function(req, res) {
    var page = req.params.url
    res.render("cotizador2/frags/" + page);
})

router.get("/cotizador2", function(req, res) {
    res.render("cotizador2/layout");
})


router.all('/:action', function(req, res){
})

router.get("admin/frags/proyecto/:url", function(req, res) {
    var page = req.params.url
    res.render("admin/frags/" + page);
})

//router.get("/panel/frags/catalogo/productos/:url", function(req, res) {
//    var page = req.params.url
//    res.render("panel/frags/catalogo/productos/" + page);
//})

router.get("/catalogo/personas", function(req, res) {
    res.render("main/frags/personas/personas");
})

router.get("/catalogo/persona", function(req, res) {
    res.render("main/frags/personas/persona");
})

router.get("/colors/:url", function(req, res) {
    var page = req.params.url
    res.render("main/frags/colors/" + page);
})

router.get("/user/:url", function(req, res) {
	var page = req.params.url
    res.render("main/frags/user/" + page);
})

router.get("/partials/:part", function(req, res) {
	var partial = req.params.part
    res.render("partials/" + partial );
    let error_message = req.flash('error')[0];
    res.locals.error_message = error_message;
})

router.get("/dialogs/:part", function(req, res) {
    var partial = req.params.part
    res.render("dialogs/" + partial );
})

module.exports = router;
