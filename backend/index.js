const exp = require ('express');
const app = exp();
const cors = require ('cors');
const studentRouter = require('./router/student.route');
const jwt = require('jsonwebtoken');

  
app.use(cors());
app.use(exp.json()); 

// Token Parsing
 
app.use((req, res, next) => {

    let headers = req.headers;
    if (headers.authorization) {
        let token = headers.authorization.replace('Bearer ', '');
        try {
            let tokenPayload = jwt.verify(token, "sajdJHG76&");
            req.user = tokenPayload;
            next();
        }
        catch (ex) {
            return res.status(401).json({ success: false, message: ex.message });
        }
    }else{
        next();
    }
})
 
app.use('/student', studentRouter); 




app.listen(5000);