<template>
  <div class="form_container">
    <div class="form-container" v-if="isConfirmEmail">
      <div class="lock-icon">
        <img src="../assets/lock1.png" alt="Lock Icon" style="width: 130px" />
      </div>
      <h2>Forgot Password</h2>
      <p>Enter your email address here.</p>
      <input
        type="email"
        v-model="email"
        placeholder="email address"
        required
      />
      <button class="btn" @click="getUser">Reset Password</button>
    </div>

    <div class="form-container" v-if="resetpassword">
      <h2>Reset Password</h2>
      <p>New password</p>
      <input type="password" v-model="newPassword" placeholder="password" />
      <p>Confirm password</p>
      <input type="text" placeholder="password" />
      <button class="btn" @click="updatePassword">Submit</button>
    </div>
    <div class="form-container" v-if="isSuccessful">
      <img src="../assets/password-reset.gif" alt="" style="width: 213px;">
      <p>Your password has been reset</p>
      <h4>Successfully</h4>
      <button class="btn" @click="continueToLogin">continue</button>
    </div>
    <img src="../assets/forget.png" alt="" class="bg" />
  </div>
  
</template>
<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      email: "",
      newPassword: "",
      confirmPassword: "",
      user: [],
      isConfirmEmail: true,
      resetpassword:false,
      isSuccessful:false,
      
    };
  },

  methods: {
    getUser(){
      this.isConfirmEmail=false
      this.resetpassword=true
    },
    updatePassword() {
      fetch(`https://localhost:5001/api/UserControler/${this.email}/update-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword:this.newPassword,
        }),
      })
        .then((response) => {
          response.json()
          this.resetpassword=false
          this.isSuccessful=true
          
        })
        
        .catch((error) => {
          console.error(error);
        });
    },
    continueToLogin(){
      this.$router.push({name:'Login'})
    }
  },
};
</script>
<style>
.bg {
  width: 736px;
  height: 721px;
}
.form_container {
  display: flex;
  justify-content: center;
}
.form-container {
  width: 400px;
  height: 500px;
  margin: auto;
  padding: 40px 25px 0px 25px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: rgb(226,244,229);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
}
input {
  width: 350px;
  height: 40px;
  border-radius: 6px;
}

.btn {
  background-color: rgb(89, 227, 168);
  color: white;
  border: none;
  cursor: pointer;
  width: 215px;
  margin-top: 25px;
}

.btn:hover {
  background-color: rgb(88, 192, 147);
}
</style>