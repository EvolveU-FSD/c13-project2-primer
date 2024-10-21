let requestNumber = 1

function showRequests(req, res, next) {
    console.log('#' + requestNumber + " - " + req.method +" " + req.path)
    requestNumber++
    next()
}

module.exports = showRequests