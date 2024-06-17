<template>
  <div id="app">
    <img alt="CampEase logo" src="./assets/logo.png" class="logo" />

    <!--Navigation-->
    <nav>
      <ul class="horizontal-nav">
        
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/campspots" class="nav-link">CampSpots</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <!-- <router-link to="/admin" class="nav-link">Admin</router-link> -->

        <div id="profile-button" @click="togglePopup" class="popup-button">
          
          <div class="profile-photo">
            <span class="profile-initial">{{ userInitial }}</span>
          </div>

          <span class="username">{{ firstName }}</span>
          <div v-if="isPopupVisible" class="popup-menu">
            <ul>
              <li @click="profileInfo">My profile</li>
              <li @click="bookings">Bookings</li>
              <li @click="logout">Log out</li>
            </ul>
          </div>
        </div> 

        <a href="/login" class="nav-link" id="log" v-if="!islogedIn" target="_blank">Login</a>
      </ul>
    </nav>

    <router-view />
  </div>
</template>
  <script>
export default {
  name: "App",
  data() {
    return {
      isPopupVisible: false,
      userName:'user',
      firstName:'user',
      user:null,
      islogedIn:false
    };
  },
  computed: {
    userInitial() {
      return this.userName.charAt(0).toUpperCase();
    }
  },
  methods: {
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    handleOption(option) {
      alert(`You selected ${option}`);
      this.isPopupVisible = false; 
    },
    logout(){
      localStorage.removeItem("user-info");
      alert("You are logged out.")
      window.location.reload();
    },
    profileInfo(){
      if(this.user){
      this.$router.push({ name: "ProfileInfo" });}
      else alert("Please log in to access your profile information.")
    },
    bookings(){
      if(this.user){
      this.$router.push({ name: "BookingHistory" });}
      else alert("Please log in to access your booking history.")
    }
  },
  mounted(){
    this.user=localStorage.getItem("user-info")
    
    if(this.user){
      
    this.islogedIn = true;
    
    this.firstName = JSON.parse(this.user).firstname; 
    this.userName = JSON.parse(this.user).firstname; 
    console.log("name", this.firstName);
      
    }
  }
};
</script>
  <style>
.logo {
  position: absolute;
  top: 0;
  left: 0;
}

.horizontal-nav .nav-link {
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 1.3rem;
  text-align: center;
  
  padding: 10px;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
  color: #2C3E50;  
  transition: color 0.3s; /* Smooth transition */
  text-decoration: none; /* Remove underline */
  
  margin-top: 5px;
}

.horizontal-nav .nav-link:hover {
  color: rgb(89, 227, 168); /* Text color on hover */
  
}
.horizontal-nav .router-link-active {
  color: rgb(89, 227, 168);
}
#log {
  position: absolute;
  top: 59px;
  right: 18px;
  width: 90px;
  /* height: 18px; */
  border: 2px solid #000;
  border-radius: 16px;
}

#profile-button {
  width: auto;
    height: 46px;
    display: flex;
    align-items: center;
    background-color: rgb(88, 192, 147);
    padding: 5px 13px 5px 9px;
    border-radius: 20px;
    cursor: pointer;
    position: absolute;
    top: 59px;
    right: 150px;
}

.profile-photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #20639B;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.profile-initial {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.username {
  color: white;
  
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 1rem;
}

/* menu */
.popup-menu-container {
  position: relative;
  display: inline-block;
}

.popup-menu {
  position: absolute;
  top: 100%;
  left: -97px;
  color: white;
  width: 207px;
  height: 165px;
  background-color: rgb(88, 192, 147);
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.popup-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.popup-menu li {
  padding: 15px 20px;
  cursor: pointer;
}

.popup-menu li:hover {
  background-color: rgba(74, 157, 121, 0.725);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>