import axios from "../axios";

const authService = {

register(name, email, password){
    return axios.post('/register', {
        name,
        email,
        password
    })
},

login (email, password) {
    return axios.post('/login', {
        email,
        password
    })
},

logout() {
    const userToken = localStorage.getItem('token');
    console.log(userToken);
    return axios.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
  }
  
};

export default authService;