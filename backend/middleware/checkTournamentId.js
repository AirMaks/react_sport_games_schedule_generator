
module.exports = function(tournamentId) {
    return function(req, res, next) {
        // if (req.method === 'OPTIONS') {
        //     return next();
        // }

        console.log(req);
    
        try {
            if(tournamentId !== req.query.tournamentId) {
                return false;
            }
            // const token = req.headers.authorization.split(' ')[1];
    
           
            // const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // if (decoded.role !== role) {
            //     return res.status(403).json({message: 'Access denied'});
            // }
    
            // req.user = decoded;
            // next();
    
        } catch (e) {
            console.log(e.message);
        }
    }
}



