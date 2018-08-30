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
            datosIniciales();
            resolve()
        }
    })
    .catch(function (error) {
    })
})

const datosIniciales = (sport_id, place_id) => new Promise((resolve,reject) => {
    axios.get('https://dev.entrenar.me/api/test/sports?sport_id='+sport_id+'&place_id='+place_id)
    .then(function (response) {
        if (response.data.error) {
            reject(response)
        } else {
            resolve(response.data);
        }
       })
       .catch(function (error) {
        reject(error);
        })
})

const datos = (sport_id, place_id) => new Promise((resolve,reject) => {
    axios.get('https://dev.entrenar.me/api/test/sports?sport_id='+sport_id+'&place_id='+place_id)
    .then(function (response) {
        if (response.data.error) {
            reject(response)
        } else {
            resolve(response.data);
        }
       })
       .catch(function (error) {
        reject(error);
        })
})

const generarRanking = (entity_id, sport_id, ranking) => new Promise((resolve, reject) => {
    axios.post('https://dev.entrenar.me/api/test/ranking',{entity_id,sport_id,ranking})
    .then(function (response) {
        resolve(response);
       })
       .catch(function (error) {
        reject(error);
        })
})

const visualizarRanking = data => new Promise((resolve, reject) => {
    axios.get('https://dev.entrenar.me/api/test/ranking')
    .then(function (response) {
        if (response.data.error) {
            reject(response)
        } else {
            resolve(response.data);
        }
       })
       .catch(function (error) {
        reject(error);
        })
})



export default {register, login, datos, datosIniciales, generarRanking, visualizarRanking}