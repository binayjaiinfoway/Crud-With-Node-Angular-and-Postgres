const client = require('./db')
exports.validatelogin = async (req, res, next) => {
    if (!req.user)
        throw new Error('Access Denied');

    let cli = await client.getNewClient();
    try { 
        await cli.connect();
        let userResult = await cli.query('Select * from Public."student" where id=$1', [req.user.id]);
        if (userResult.rowCount === 0)
            throw new Error('Access Denied');

        let userObj = userResult.rows[0];
        if (!userObj.active)
            throw new Error('Access Denied');

        await cli.end();

        next();
    }
    catch (ex) {
        cli.end();
        console.log(ex);
        console.log("rrrrrrrrr");
        res.status(403).send(ex.message);
    }

}