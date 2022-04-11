function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/users/perfil');
    }
    next();
}
// Verificando si el usuario está logeado
module.exports = guestMiddleware;