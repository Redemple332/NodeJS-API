const mainRoute = require('../routes/user')
const route = function(app){
    app.use("/user", mainRoute)
}
module.exports = route;