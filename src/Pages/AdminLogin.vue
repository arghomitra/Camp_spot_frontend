<template>
    <div class="container">
      <div class="image-section">
        <img src="../assets/Admin-bro.png" alt="Image 1" />
      </div>
      <div class="forms-section">
        
      <div class="forms-section">
        <div class="admin-login-container">
          <img src="../assets/admin-icon.png" alt="" style="width: 85px;">
          <p style="color: white;">Welcome Back</p>
          <input v-model="adminEmail" type="text" placeholder="Email" />
          <input v-model="adminPassword" type="password" placeholder="Password" />
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  
          <button @click="checkAdmin" class="btn">Log in</button><br><br>
          <router-link to="/login" style="color: white;">Log in as a user </router-link>
          
          
          
  
        </div>
  
       
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminLoginComponent",
    data() {
      return {
        
  
        // admin
        adminEmail:'',
        adminPassword:'',
  
        admin: {},
        isLogedin:false,
        errorMessage:''
        
        
      };
    },
    methods: {
      checkAdmin(){
        
        fetch("https://localhost:5001/api/Admin")
        .then((response)=>response.json())
        .then((admins)=>{
          const admin=admins.find(
            (admin)=> admin.email==this.adminEmail && admin.password ==this.adminPassword
          )
          if(admin){
            this.isLogedin=true
            localStorage.setItem("user-info", JSON.stringify(admin));
            this.$router.push({ name: "Admin" });

          }
          else{
            this.errorMessage='Admin not matched.'
          }
        })
      }
      
      
      
    },
  };
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .from-section {
    display: flex;
  }
  .image-section img {
    width: 736px;
    height: 721px;
  }
  .admin-login-container {
    width: 400px;
    height: 500px;
    margin: auto;
    padding: 40px 25px 0px 25px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color:#263238 ;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  }
  .createAccount-container {
    width: 400px;
    height: 500px;
    margin: auto;
    padding: 40px 25px 106px 25px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  }
  .admin-login-container input {
    margin-bottom: 20px;
    height: 40px;
    width: 350px;
    border-radius: 6px;
    padding-left: 10px;
    border: 2px solid white;
  }
  .createAccount-container input {
    margin-bottom: 20px;
    height: 40px;
    width: 350px;
    border-radius: 6px;
    padding-left: 10px;
  }
  .error {
    color: red;
  }
  .btn {
    background-color: rgb(89, 227, 168);
    color: white;
    border: none;
    cursor: pointer;
    width: 215px;
  }
  .btn:hover {
    background-color: rgb(88, 192, 147);
  }
  </style>
  