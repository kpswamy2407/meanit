const md5=require('md5');
module.exports={
    getMd5(str){
        return new Promise((reslove,reject)=>{
            reslove(md5(str));
        });
    }
}