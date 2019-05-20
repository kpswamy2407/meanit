const md5=require('md5');
const jwt=require('jsonwebtoken');
const randomString=require('randomstring');
module.exports={
    getMd5(str){
        return new Promise((reslove,reject)=>{
            reslove(md5(str));
        });
    },
    getJwtToken(str){
        return new Promise((reslove,reject)=>{
            let key='fsfsssF';
            let token=jwt.sign({email:str},key)
            let buff=new Buffer(token);
            reslove(buff.toString('base64'))
        });
    },
    verifyJwtToken(token){
        return new Promise((reslove,reject)=>{
            let buff = new Buffer(token,'base64')
            let tokenString=buff.toString('ascii');
            console.log(tokenString);
            let key='fsfsssF';
            jwt.verify(tokenString,key,(err,result)=>{
                if(err){
                    throw err
                }
                reslove(result.email);

            })
        })
    }
    ,
    getRandomString(strLength){
        return new Promise((reslove,reject)=>{
            var string=randomString.generate({
                charset:'abcdef0123456789fsmyhanusuriymawsanamarvenkey',
                length:strLength
            });
            reslove(string);
        })        
    },
    generateInvoiceNumber(){
       return new Promise((reslove,reject)=>{
            var string=randomString.generate({
                charset:'abcdef0123456789fsmyhanusuriymawsanamarvenkey',
                length:7
            })+Date.now().toString();
        }) 
    }
}