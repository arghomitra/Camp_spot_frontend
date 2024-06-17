<template>
  <img src="../assets/spot-bg (1).jpg" alt="" class="bg-image" />

  <div class="div-container">
    <div class="search-container">
      <h2>Find Your Perfect Spot</h2>

      <p v-if="user.name">{{ user.name }}</p>
      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Location"
          v-model="city"
          required
        />
      </div>

      <div class="form-group">
        <label for="checkinDate">Check-in</label>
        <input type="date" id="checkinDate" v-model="checkinDate" required />
      </div>
      <div class="form-group">
        <label for="checkoutDate">Check-out</label>
        <input type="date" id="checkoutDate" v-model="checkoutDate" required />
      </div>
      <div class="form-group">
        <label for="guests">Guests</label>
        <input
          type="number"
          id="guests"
          placeholder="number of guest"
          v-model="guests"
          min="1"
          required
        />
      </div>
      <button @click="searchSpots" class="btn">Search spots</button>
    </div>
  </div>
  <div class="search-result">
    <div
      v-for="spot in spots"
      :key="spot.id"
      class="spot-details"
      @click="spot_full_details(spot)"
    >
      <img
        :src="spot.image_link1"
        alt="img"
        style="border-radius: 7px; width: 342px; height: 305px"
      />
      <label for="">show more ><span class="rating">★ 4.5</span></label>
      <label for="" style="font-weight: bold">{{ spot.name }}</label>
      <label for="">{{ spot.location }}</label>
      <label for="" style="font-weight: bold"
        >Price:€{{ spot.price }} / night</label
      >
    </div>
  </div>
  <div v-if="isErrorBox" class="no-spots-message">
    No camp spots available for the selected dates and location.
  </div>
  <div v-if="isErrorBox" class="popup-overlay">
    <div class="popup">
      <button class="close-btn" @click="cancelErrorPopup">X</button>
      <h2 style="color: red">⚠️ Error:</h2>
      <p>{{ errorMessage }}</p>
      <button @click="cancelErrorPopup" class="submit-btn">Ok</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CampSpots",
  data() {
    return {
      checkinDate: "",
      checkoutDate: "",
      guests: "",
      city: "",
      spots: [],
      
      user: {},
      isErrorBox: false,
      errorMessage: "",
    };
  },
  methods: {
    searchSpots() {
      const checkin = new Date(this.checkinDate);
      const checkout = new Date(this.checkoutDate);
      if(checkin>=checkout){

        this.isErrorBox = true;
        this.errorMessage = "Use realistic input";

      }
      else{
      fetch(
        `https://localhost:5001/api/Spot/${encodeURIComponent(this.city)}/${
          this.checkinDate
        }/${this.checkoutDate}/${this.guests}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.spots = data;
        })

        .catch((error) => {
          this.isErrorBox = true;
          if (error.response) {
            
            this.errorMessage = `Server Error: ${error.response.status} - ${error.response.statusText}`;
            console.error("Error fetching data:", error.response);
          } else {
            
            this.errorMessage = error.toString();
            console.error("Error fetching data:", error);
          }
        });
        
    }},
    spot_full_details(spot) {
      
      this.$router.push({
        name: "SpotDetails",
        params: { id: spot.id, name: spot.name },
      });
    },
    cancelErrorPopup() {
      this.isErrorBox = false;
    },
  },
  mounted() {
    let userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    }
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 650px;
  text-align: center;
}
label {
  display: block;
  text-align: left;
  margin-left: 6px;
}
.rating {
  margin-left: 150px;
}

.div-container {
  position: relative;
  top: -285px;
}

.bg-image {
  width: 729px;
  height: 607px;
  padding-left: 500px;
}
.search-result {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;

  gap: 20px;
}
.search-container {
  position: absolute;
  top: 50%;
  left: 29%;
  transform: translate(-50%, -50%);
  background-color: #e9f9ef;
  padding: 50px 45px 50px 45px;
  border-radius: 7px;
}

.spot-details {
  display: inline-block;
  width: 342px;
  height: 550px;
  margin: auto;
  padding: 10px 10px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  background-color: #e9f9ef;
}

.search-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
input[type="date"],
input[type="number"] {
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
}

.btn:hover {
  background-color: rgb(88, 192, 147);
}
</style>
