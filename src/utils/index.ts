type APITYPE = {
    get:Function,
    post:Function,
    check_network:Function,
}
let isDomainUsed= false;
let base_url = 'https://api.json-generator.com';
let LOGIN_PAGE = '';
let token = `xqd535myx6s5zg8yvj80n6s7zzpqnmq9otj87dmc`

const  check_network = ()=>{
    return window.navigator.onLine;
}

const get_url = function (url:string){
    return isDomainUsed ? url : `${base_url}/${url}`;
}

const get = function(url:string,shouldAddAuthorization=true){
    return new Promise((resolve,reject)=>{
        fetch(`${get_url(url)}`,{
            method:'GET',
            headers:shouldAddAuthorization?{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }:{"Content-Type":"application/json"},
        }).then(res =>{
            if(res.status === 403){
                window.location.href = LOGIN_PAGE;
            }
            if(res.ok && res.status > 199 && res.status < 300){
                return(res.json());
            }
            reject(res);
        })
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

const post =  function({url,body={}}:{url:string,body:any},shouldAddAuthorization=true){
    return new Promise((resolve, reject) => {
        
        fetch(`${get_url(url)}`,{
            method:"POST",
            headers:shouldAddAuthorization?{
                "Content-Type":"application/json"
            }:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        })
        .then(res =>{
            if(res.status === 403){
                window.location.href = LOGIN_PAGE;
            }
            if(res.ok && res.status > 199 && res.status < 300){
                return(res.json());
            }
            reject(res);
        })
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            alert('Check Network Connectivity')
            reject(err);
        })
    }) 
}

const api = ():APITYPE =>({
    get,
    post,
    check_network
});

export default api;

export const convertNumberToString = (num:number) =>{
    let tempNum = num.toString();
    let len = tempNum.length;
    let result = '';
    let start = -3;
    let end:number = 0;
  
    for(let i = len-1;i>=0;i-=3){
        if(i == len-1){
            result= `${tempNum.slice(start)}`;
            end = start;
            start-=3;
            if(start < (len*-1)){
                start = len*-1;
            }
        }       
        else{
            result= `${tempNum.slice(start,end)},${result}`;
            end = start;
            start-=3;
            if(start < (len*-1)){
                start = len*-1;
            }
        }
    }
    // console.log(result);
    return result;
  }