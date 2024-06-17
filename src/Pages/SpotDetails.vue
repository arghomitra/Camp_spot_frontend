<template>
  <div class="title">
    <h3>{{ capitalizeFirstLetter(spot.name) }}</h3>
  <p>{{ capitalizeFirstLetter(spot.location)  }}</p>
  <p><span>|★4.5(1.5k reviews)</span></p>
  </div>
  
  <div class="img-container" v-if="img_loaded">
    
    <div class="text"><h4>About this spot</h4>
        <p><strong>Description:</strong> {{ spot.description }}</p></div>
        <div class="photo"><img :src="spot.image_link1" alt="img" class="img" /><img :src="spot.image_link2" alt="img" class="img" /></div>
  </div>
  
  
  <div>
    <div class="description-container">
      <!-- Display spot details -->
      <div class="details">
        <div class="facility">
          <h4>What is place offer</h4>
          <label for="">▣  Garden view</label><br>
          <label for="">▣  Free parking</label><br>
          <label for="">▣  kitchen</label><br>
          <label for="">▣  wifi</label><br>
        </div>
        <div class="contact">
          <p><strong>Owner Contact:</strong> </p>
        <p>✉️email:{{spot.owner_Email}}</p>
        <p>📱phone: {{spot.owner_Phone}}</p>

        </div>
        
        
        
      </div>
      <div class="price-info">
        <h3 class="br">€{{spot.price}}/night</h3>
        <div class="form-group">
          <label for="checkInDate">Check-in Date</label>
          <input
            type="date"
            id="checkInDate"
            v-model="checkInDate"
            required
          />
        </div>
        <div class="form-group">
          <label for="checkOutDate">Check-out Date</label>
          <input
            type="date"
            id="checkOutDate"
            v-model="checkOutDate"
            required
          />
        </div>
        <div class="form-group">
          <label for="guests">Number of Guests</label>
          <input type="number" id="guests" v-model="guests" min="1" required />
        </div>
        <button @click="booking" class="book-button">Book This Spot</button>
        <h3 class="br">Pricing breakdown</h3>
        <label class="br">€{{spot.price}} x {{calculateDays}} days <span class="result">=€{{spot.price *  calculateDays}}</span></label>
        <label class="br">Tax <span class="result">=€{{spot.price *  calculateDays * 0.21}}</span></label>
        <label class="br">cleaning <span class="result">=€10</span></label>
        
        <hr style="height: 1px; background-color: black; border: none; margin: 10px 0;">
        <label class="br">total = <span class="result" style="font-weight: bold;">€{{totalCost }}</span> </label>
      
      </div>
    </div>

    <!-- Display comments -->
    <h3 style="left: 0;margin: 0;position: absolute;margin-left: 39px;margin-top: -48px;">Comments</h3>
    <div id="comments-container">
      
      
      <div class="comments" v-for="c in comments" :key="c.id">
        <p>
          <img
            style="width: 35px; height: 35px; "
            src="https://banner2.cleanpng.com/20180602/ytc/kisspng-computer-icons-user-profile-male-logo-5b123ed1093740.8042409615279223850378.jpg"
            alt=""
          />
          first name<span class="ratings" style="margin-Right:10px ">★{{ c.rate  }} </span>
        </p>
        
        <p>{{ c.comment + "..." }}</p>
      </div>
    </div>

    
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
  name: "SpotDetails",
  data() {
    return {
      id: "",
      spot: {},
      comments: [],
      showBookingPopup: false,
      checkInDate: "",
      checkOutDate: "",
      guests: '',
      name:'',
      img_loaded: false,
      days:null,
      user:null,
      isErrorBox:false,
      errorMessage: "",
      

    };
  },
  computed: {
  calculateDays() {
    const timeDiff = Math.abs(new Date(this.checkOutDate) - new Date(this.checkInDate));
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days;
  },
  totalCost() {
    const days = this.calculateDays;
    const cost = this.spot.price * days;
    const tax = cost * 0.21;
    const total = cost + tax + 10;
    return total
    
  }
}
,
  methods: {
    getSpotDetails() {
      // Fetch spot details based on ID
      fetch(`https://localhost:5001/api/Spot/${this.id}`)
        .then((response) => response.json())
        .then((_spot) => {
          this.spot = _spot;
          this.img_loaded = true;
          this.getComments() 
          
        })

        .catch((error) => {
          console.error("Error fetching spot details:", error);
        });
    },
    getComments() {
      // Fetch comments for the spot
      fetch(`https://localhost:5001/api/Comment/${this.spot.id}`)
        .then((response) => response.json())
        .then((comments) => {
          this.comments = comments;
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    },
    bookSpot() {
      // Handle booking logic here
      alert(
        `Booking from ${this.checkInDate} to ${this.checkOutDate} for ${this.guests} guests.`
      );
      this.showBookingPopup = false;
    },
    booking() {
      if(this.user==null){
        this.isErrorBox=true
        this.errorMessage="You are not loged in yet!"
      }
      else
      {this.$router.push({
        name: "ConfirmBooking",
        params: {
          
          spotName: this.spot.name,
          spotId: this.spot.id,
          spotLocation: this.spot.location,
          checkIn: this.checkInDate,
          checkOut: this.checkOutDate,
          guests: this.guests,
          spot: this.spot,
          totalCost: this.totalCost
        },
      });}
    },
    capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    cancelErrorPopup() {
      this.isErrorBox = false;
    },
  },
  
  mounted() {
    
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    
    
    this.getSpotDetails();
    
    

    this.user=localStorage.getItem('user-info')
  },
};
</script>

<style>
.ratings {
  margin-left: 443px;
  border: none;
}
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
  margin-left: 55px;
}
.br{
  display: block;
  text-align: left;
  margin-left: 5px;
}
.result {
  display: inline;
  text-align: right;
  margin-left: 20px;
}
.title {
  margin-right: 1000px;
}


#comments-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin-left: 15px;
  
}
.img-container{
  display: flex;
 
}
.text{
  flex:1;
  margin-left: 50px;
  
}
.photo{
flex: 2;
display: flex;
gap: 4px;
}
.img {
  margin-top: -105px;
    margin-left: 24px;
    width: 470px;
    height: 415px;
    border-radius: 7px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
}
.description-container {
  display: flex;
}
.details {
  flex: 2;
  display: flex;
}
.contact{
  flex: 2;
  margin-top: 6px;
}
.facility{
  flex: 1;
}
.price-info {
  flex: 1;
  width: 30%;
  height: auto;
  margin-top: 20px;
  margin-right: 72px;
  padding: 40px 25px 106px 25px;
  
  border-radius: 7px;
  background: linear-gradient(to bottom,  #e9f9ef, #fff); /* Gradient background from dark to light */
 
}
.comments {
  width: 700px;
    height: auto;
    margin-left: 14px;
    margin-bottom: 31px;
    padding: 10px 10px 10px 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0px 9px 19px rgba(0, 0, 0, 0.3);
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 300px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.book-button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
.book-button:hover {
  background-color: #0056b3;
}
</style>
