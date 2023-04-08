
const cli =require('../lib/db')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


const fs = require('fs');
const { log } = require('console');



 async function getStudents(req, res) {
    const client = cli.getNewClient();

    try {
        client.connect();
        const data = await client.query('select * from student where id=$1',[req.user.id]);
        client.end();

        res.json({ success: true, data: data.rows });
    }
    catch (err) {
        console.log(err)
        client.end();
        res.status(500).json({ success: false, message: err.message })
    }
}


 async function postStudents(req, res) {
    console.log("bheifheoiujiu")
    const client = cli.getNewClient();

    try {
        await client.connect();

        let hash= await  bcrypt.hash(req.body.password, 10);

        const data = await client.query(`insert into Public."student" (name, phone, age, email, password) values($1,$2,$3,$4,$5)`,[req.body.name,req.body.phone,req.body.age,req.body.email,hash]);

        client.end();

        res.json({ success: true, data: data.rows });
    //    console.log(data.rows)
    } 
    catch (err) {
        console.log(err)
        client.end();
        res.status(500).json({ success: false, message: err.message })
    }
}



 async function updateStudents(req, res) {
    const client = cli.getNewClient();
    // console.log(req.body ,"drtfyguhijojouiygfuyihu")
    try {
        await client.connect();
        const data = await client.query(`update Public."student" set  name = $1, phone = $2 , age = $3,image = $4  where id =$5`,[req.body.name,req.body.phone,req.body.age,req.body.image,req.params.id]);
        client.end();
        
        res.json({ success: true, data: data.rows });
    }
    catch (err) {
        console.log(err)
        client.end();
        res.status(500).json({ success: false, message: err.message })
    }
}


 async function deleteStudents(req, res) {
    const client = cli.getNewClient();

    try {
        client.connect();
        const data = await client.query(`delete from Public."student" where id =$1`,[req.params.id]);

        client.end();

        // res.json({ success: true, data: data.rows });
    }
    catch (err) {
        console.log(err)
        client.end();
        res.status(500).json({ success: false, message: err.message })
    }


}

async function loginme(req, res) {
    let user = null;

let refreshtoken = null;

    const client = cli.getNewClient();
    const type = req.body.type;
        // console.log(type,"asdf")

    try {
        client.connect();
         
       if(type=='password'){

            const userResult = await client.query(`select * from Public."student" where lower(email)= lower($1)`, [req.body.email]);
            
            if (userResult.rowCount === 0) {
                 
            throw new Error("Invalid user credentials");
        }
        // console.log(userResult.rows)
 
        user = userResult.rows[0];
        let passwordCheckResult = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheckResult) {

            throw new Error("Invalid user credentials");
        } 
 
    }
    else if(type=='token'){
        // console.log("token")
       let tokenPayload= jwt.verify(req.body.refreshtoken, "hjg#$g&");
         req.user = tokenPayload;
         
         const tokenResult = await client.query('Select * from user_Session where refreshtoken=$1 and hasused=false',
         [req.body.refreshtoken]);
         
        //  console.log(tokenResult)
        if (tokenResult.rowCount === 0)
            throw new Error("Invalid token");

        const userResult = await client.query(`select * from Public."student" where "id"= $1`,
            [tokenResult.rows[0].user_id]);
        // console.log(userResult.rows); 

        if (userResult.rowCount === 0)
            throw new Error("Invalid user credentials");


        user = userResult.rows[0]; 
    }
    

        //token part 
        let token = await jwt.sign({ id: user.id, name: user.name }, "sajdJHG76&", { expiresIn: '10m' })
        refreshtoken = jwt.sign({ id: user.id, name: user.name }, "hjg#$g&",{ expiresIn: '1d' })

        await client.query('Update user_session set hasused=true where user_id=$1', [user.id]);

        await client.query('insert into user_Session(refreshtoken, user_id) values($1,$2)', [refreshtoken, user.id]);

        let resultObj = {
            name: user.name,
            id: user.id,
            token: token,
            refreshtoken: refreshtoken
        }
      
        client.end();
     

        return res.json({ success: true, data: resultObj });



    } 
    catch (err) {
     
        console.log("err token")
        client.end();
        res.status(500).json({ success: false, message: err.message })
    }
}

async function getimage(req,res){

    const client = cli.getNewClient();

    try {
        client.connect();
        const data = await client.query('select image from public."student" where id=$1',[req.user.id]);
        fs.readFile("./images/"+data.rows[0].image,async(err,data)=>{
        if(err){
            res.send(err)
        }else{ 
            await res.send(data)
         }
        })
        client.end();
    }
    catch (err) {
        console.log(err)
        client.end();
        res.status(500).json({ success: false, message: err.message })
    }
}


async function postimage(req,res){
    const img = req.image;
    res.send(img)
}

async function getmultiimage(req,res){
    const client = cli.getNewClient();
    client.connect();
    try {
        let data=[];  
        let files = await client.query('select filename from public."userattachment" where userid=$1',[req.user.id]);
        for(let file of files.rows){
         let filedata = await fs.readFileSync('./images/'+file.filename) 
         let imgobject = {
            imagename: file.filename,
            image: filedata
         }
          data.push(imgobject)
        //   console.log(file.filename)
        }
        client.end();
      res.json({data});
    } catch (error) {
        console.log(error);
        client.end();
    }
 
} 
   
async function postmultiimage(req,res){
    const img = req.files;
    console.log("uegsfiuasjcishiudh",req.files)
    const client = cli.getNewClient();
    await client.connect();
    // const data:
    for (let x of req.files) {
         data = await client.query(`insert into Public."userattachment"(filename,userid) values($1,$2)`,[x.filename,req.user.id]);
        }
client.end();
    res.send(img)
} 
 
module.exports = {getStudents,postStudents,updateStudents,deleteStudents,loginme,postimage,getimage,postmultiimage,getmultiimage};

