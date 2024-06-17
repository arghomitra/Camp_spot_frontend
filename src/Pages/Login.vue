<template>
  <div class="container">
    <div class="image-section">
      <img src="../assets/spot-bg (4).jpg" alt="Image 1" />
    </div>
    <div class="forms-section">
      <div v-if="showloginForm && !isLoggedIn" class="login-container">
        <p>Welcome to CampEase</p>
        <input v-model="email" type="text" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button @click="login" class="btn">Log in</button>
        
        <p><router-link to="/forget_password">Forget password</router-link></p>
        <p>New in CampEase? <a href="#" @click="toggle">Create Account</a></p>
        <p>Log in as a <router-link to="/admin-login">admin </router-link></p>
        
        

      </div>
    <div class="forms-section">
      

      <div v-if="showCreateAccountForm" class="createAccount-container">
        <p>Create a new profile</p>
        <input v-model="firstName" type="text" placeholder="First Name" />
        <input v-model="lastName" type="text" placeholder="Last Name" />
        <input v-model="userEmail" type="text" placeholder="Email" />
        <input type="password" v-model="userPassword" placeholder="Password" />
        <input v-model="phone" type="text" placeholder="Phone" />
        <input type="text" v-model="gender" placeholder="Gender" />
        <input type="address" v-model="address" placeholder="Street,housenumber,postalcode,city" />
        <p v-if="errorEmail" class="error">{{ errorEmail }}</p>
        <button @click="createAccount" class="btn">Sign Up</button>
        
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      // for login part
      email: "",
      password: "",
      errorMessage: "",

      // for create account part
      firstName: "",
      lastName: "",
      userEmail: "",
      userPassword: "",
      phone: "",
      gender: "",
      address: "",
      errorEmail: "",

      // admin
      adminemail:'',
      adminpassword:'',

      user: null,
      newUser: "",
      users: [],
      showCreateAccountForm: false,
      showloginForm: true,
      isLoggedIn: false,
      isAdminLoggedIn: false,
    };
  },
  methods: {
    toggle() {
      this.showCreateAccountForm = true;
      this.showloginForm = false;
    },
    login() {
      fetch("https://localhost:5001/api/UserControler")
        .then((response) => response.json())
        .then((users) => {
          const user = users.find(
            (user) =>
              user.email === this.email && user.password === this.password
          );
          if (user) {
            this.isLoggedIn = true;
            this.user = user;
            localStorage.setItem("user-info", JSON.stringify(user));
            this.$router.push({ name: "Home" });
            
          } else {
            console.log("User not found!");
            this.errorMessage = "Invalid email or password";
          }
        });
    },
    fetchUser() {
      fetch("https://localhost:5001/api/UserControler")
        .then((response) => response.json())
        .then((_users) => (this.users = _users));
    },
    admin(){
      this.showloginForm=false,
      this.isAdminLoggedIn=true

    },
    createAccount() {
      const addressParts = this.address.split(",");

      
      const street = addressParts[0].trim();
      const houseNumber = addressParts[1].trim();
      const postalCode = addressParts[2].trim();
      const city = addressParts[3].trim();
      fetch(`https://localhost:5001/api/UserControler/${this.userEmail}`)
        .then((response) => response.json())
        .then((users) => {
          if (users.length > 0) {
            this.errorEmail = "This email is already used";
          } else {
            fetch("https://localhost:5001/api/UserControler", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstname: this.firstName,
                lastname: this.lastName,
                password: this.userPassword,
                email: this.userEmail,
                phone: this.phone,
                gender: this.gender,
                userAddress: {
                  street: street,
                  housenumber: houseNumber,
                  postalcode: postalCode,
                  city: city,
                },
              }),
            })
              .then((response) => response.json())
              .then((newUser) => {
                this.fetchUsers();
                console.warn(newUser);
                
                this.showloginForm = true;
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
    },
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
.login-container {
  width: 400px;
  height: 500px;
  margin: auto;
  padding: 40px 25px 0px 25px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
}
.createAccount-container {
  width: 400px;
  height: auto;
  margin: auto;
  padding: 40px 25px 106px 25px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
}
.login-container input {
  margin-bottom: 20px;
  height: 40px;
  width: 350px;
  border-radius: 6px;
  padding-left: 10px;
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
