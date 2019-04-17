const https=require('https');

 function  getTitles(substr,pageNumber){
    
       return new Promise((resolve,reject)=>{
            https.get('https://jsonmock.hackerrank.com/api/movies/search/?Title='+substr+"&page="+pageNumber,(res)=>{

                res.on('data', (data) => {
                    formattedResult=JSON.parse(data.toString());
                        let result=formattedResult.data.map(ele=>ele.Title);
                        resolve(result);
                    });
                
            });
            
       })
}

function getResult(substr){
    if (substr==undefined ) substr='';
    var titles="";
    var titles_promise=[];
    https.get('https://jsonmock.hackerrank.com/api/movies/search/?Title='+substr,(res)=>{

        res.on('data', (data) => {
            formattedResult=JSON.parse(data.toString());
            for (var page = 1; page <= formattedResult.total_pages; page++) {
                titles_promise.push(getTitles(substr,page));
            }
            Promise.all(titles_promise).then(values=>{
                values.forEach(v=>{
                    titles+=v.join(",\n");
                });
                console.log(titles.split(",\n").sort());

            });
          });
    });
}

getResult('spider');