<template>
  <div class="confirm-booking">
    <div class="booking-summary">
      <div class="hotel-info">
        <h2>{{ hotel.name }}</h2>
        <p>{{ hotel.address }}</p>
        <p>
          {{ hotel.rating }}
          <span
            v-for="star in Array(hotel.stars).fill('★')"
            :key="star"
            class="star"
            >★</span
          >
        </p>
        <p>{{ hotel.reviewCount }} reviews</p>
        <p>{{ hotel.amenities }}</p>
      </div>
      <div class="booking-details">
        <h3>Your booking details</h3>
        <p><strong>Check-in:</strong> {{ booking.checkIn }}</p>
        <p><strong>Check-out:</strong> {{ booking.checkOut }}</p>
        <p>
          <strong>Total length of stay:</strong> {{ booking.nights }} night(s)
        </p>
        <p>
          <strong>You selected:</strong> {{ booking.rooms }} room(s) for
          {{ booking.guests }} adult(s)
        </p>
        <a href="#" @click="changeSelection">Change your selection</a>
      </div>
      <div class="price-summary">
        <h3>Your price summary</h3>
        <p><strong>Total:</strong> €{{ total }}</p>
        <p>Includes taxes and fees</p>
        <a href="#" @click="changeSelection">check all price breakdown</a>
      </div>
    </div>

    <div class="user-details">
      <h3>Enter your details</h3>
      <div class="sign-in-info">
        <p>You are signed in</p>
        <p>{{ user.email }}</p>
      </div>
      <form>
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input type="text" id="firstName" v-model="user.firstname" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input type="text" id="lastName" v-model="user.lastname" required />
        </div>
        <div class="form-group">
          <label for="email">Email Address *</label>
          <input type="text" id="email" v-model="user.email" required />
        </div>
        <!-- <div class="form-group">
          <label for="country">Country/Region *</label>
          <select id="country" v-model="user.country" required>
            <option value="Belgium">Belgium</option>
            <option value="Belgium">Netherlands</option>
            
          </select>
        </div> -->
        <div class="form-group">
          <label for="phone">Telephone (mobile number preferred) *</label>
          <input type="tel" id="phone" v-model="user.phone" required />
        </div>

        
      </form>
      <button @click="confirmBooking">
          Confirm Booking
        </button>
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
  name: "ConfirmBooking",
  data() {
    return {
      spot: {},
      spotId: "",
      total: "",
      hotel: {
        name: "",
        address: "",
        rating: 8.6,
        stars: 5,
        reviewCount: "1,841",
        amenities: "Free WiFi",
      },
      booking: {
        checkIn: "",
        checkOut: "",
        nights: 1,
        rooms: 1,
        guests: "",
        totalPrice: 119.94,
        taxes: 12.39,
        vat: 6.45,
        cityTax: 5.94,
        cancellationFee: 114,
      },
      user: {
        id: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        paperlessConfirmation: false,
        bookingFor: "mainGuest",
        travelingForWork: "no",
      },
      showPriceInfo: false,
      showCancellationInfo: false,
      isErrorBox: false,
      errorMessage: "",
    };
  },
  methods: {
    cancelErrorPopup() {
      this.isErrorBox = false;
    },
    changeSelection() {
      this.$router.go(-1);
    },
    togglePriceInfo() {
      this.showPriceInfo = !this.showPriceInfo;
    },
    toggleCancellationInfo() {
      this.showCancellationInfo = !this.showCancellationInfo;
    },
    fetchSpot() {
      fetch(`https://localhost:5001/api/Spot/${this.spotId}`)
        .then((response) => response.json()) 
        .then((data) => {
          this.spot = data;
        })
        
    },
    fetchBooking() {
      fetch("https://localhost:5001/api/Booking")
        .then((response) => response.json())
        .then((data) => {
          console.log(data); 
        })
       
    },
    confirmBooking() {
      let payload = {
        spotName: this.spot.name,
        location: this.spot.location,
        checkin: `${this.booking.checkIn}T12:19:39.563Z`,
        checkout: `${this.booking.checkOut}T12:19:39.563Z`,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
        guests: this.booking.guests,
        price: this.total,
        userId: this.user.id,
        spotId: this.spot.id,
      };
      console.log(payload);

      fetch('https://localhost:5001/api/Booking',{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(payload),
      })
      .then((response) =>response.json())
      .then((newBooking) => {
        this.fetchBooking()
        alert("Booking confirmed!")
        console.log(newBooking)


      })
      .catch((error) => {
          this.isErrorBox=true
          this.errorMessage=error.response
          console.log("Error fetching booking:", error);
        })

      
    },
  },
  mounted() {
    this.booking.checkIn = this.$route.params.checkIn;
    this.booking.checkOut = this.$route.params.checkOut;
    this.booking.guests = this.$route.params.guests;
    this.hotel.name = this.$route.params.spotName;
    this.hotel.address = this.$route.params.spotLocation;
    this.spotId = this.$route.params.spotId;
    this.total = this.$route.params.totalCost;
    this.user = JSON.parse(localStorage.getItem("user-info"));
    this.fetchSpot();
    
  },
};
</script>
  
  <style>
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
.confirm-booking {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.booking-summary,
.user-details {
  width: 48%;
}

.hotel-info,
.booking-details,
.price-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.hotel-info h2,
.booking-details h3,
.price-summary h3,
.user-details h3 {
  margin-top: 0;
}

.hotel-info p,
.booking-details p,
.price-summary p {
  margin: 10px 0;
}

.price-summary p {
  margin: 5px 0;
}

.price-summary a {
  color: #007bff;
  cursor: pointer;
}

.sign-in-info {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.sign-in-info p {
  margin: 5px 0;
}

form .form-group {
  margin-bottom: 15px;
}

form .form-group label {
  display: block;
  margin-bottom: 5px;
}

form .form-group input,
form .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form .form-group input[type="radio"] {
  width: auto;
  margin-right: 5px;
}

form .form-group input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
}

form .form-group label[for="paperlessConfirmation"] {
  display: inline;
}

form .form-group label[for="mainGuest"],
form .form-group label[for="someoneElse"],
form .form-group label[for="travelingYes"],
form .form-group label[for="travelingNo"] {
  margin-right: 20px;
}


</style>
  