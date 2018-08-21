import axios from 'axios';
const baseURl = 'https://dev.entrenar.me/api/v3/';

 const token = localStorage.getItem('token');
 if(token) {
    axios.defaults.headers.common['Authorization'] = "Bearer "+ token;
 }

const register = data => new Promise((resolve, reject)=>{
    axios.post(baseURl + 'auth/register', { ...data, source:'geekshubs' })
      .then(function (response) {
       if (response.data.error) {
           reject(response)
       } else {
           resolve(response)
       }
      })
      .catch(function (error) {
       reject(error);
      })
})

const login = data => new Promise((resolve, reject) => {
    axios.post(baseURl + "oauth/access_token", {...data, client_id:"geekshubs",client_secret:"f0203v093mi0rsm0mvskds0i443gsmosdj902m",grant_type:"password"})
    .then(function(response){
        if (response.data.error) {
            reject(response)
        } else {
            localStorage.setItem('token', response.data.access_token)
            axios.defaults.headers.common['Authorization'] = "Bearer "+ response.data.access_token;
            resolve()
        }
    })
    .catch(function (error) {
    })
})



export default { register, login }