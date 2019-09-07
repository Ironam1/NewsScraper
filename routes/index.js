

module.exports = function (app) {
    
    require("./htmlroutes.js")(app);
    require("./apiroutes.js")(app)
};