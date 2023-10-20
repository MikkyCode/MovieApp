import axios from 'axios';
import React from 'react';
const ApiURL =  "  https://www.omdbapi.com/?apikey=3c497d9c"




const GetData = async(title)=>{
  const Data = await axios.get(`${ApiURL}&s=${title}`,
  {
    headers: {
    "Content-Type": 'application/json',
  

    post:{  'content-Type':'application/json',
  'Access-Control-Allow-Origin': '*',
  


},

Accept: "application/json",
"Content-Type": "application/json",
'Access-Control-Allow-Origin': '*',



 
  },withCredentials: true,
responseType: "json",

})
    const response = Data.data;
    let final = []
    if(response){
     return  Promise.all(response.Search.map(async(e,i)=>{
        let all = await axios.get(`${ApiURL}&i=${e.imdbID}`);
        console.log(all.data)
          return all.data
      }))
    }else{
      return  undefined
    }
}

  export  default  GetData