<template>
  <div class="booking-history">
    <h1>Booking History</h1>
    <table>
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Spot Name</th>
          <th>Location</th>
          <th>Check In Date</th>
          <th>Check Out Date</th>
          <th>Guests</th>
          <th>Price</th>
          <th>Comments</th>
          <th>Cancel Booking</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td>{{ booking.id }}</td>
          <td>{{ booking.spotName }}</td>
          <td>{{ booking.location }}</td>
          <td>{{ formatDate(booking.checkin) }}</td>
          <td>{{ formatDate(booking.checkout) }}</td>
          <td>{{ booking.guests }}</td>
          <td>{{ booking.price }}</td>
          <td>
            <button @click="openPopUpBox(booking)">Add</button>
          </td>
          <td>
            <button @click="cancelBookingPopUpBox(booking)">Request</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="isOpenPopUpBox" class="popup-overlay">
      <div class="popup">
        <button class="close-btn" @click="closePopUpBox">X</button>
        <h2>Add Comment</h2>
        <input
          class="comment"
          type="text"
          placeholder="First Name"
          v-model="user.firstname"
        />
        <input
          class="comment"
          type="text"
          placeholder="mail"
          v-model="user.email"
        />
        <input
          class="comment"
          v-model="commentText"
          placeholder="Enter your comments"
        /><br />
        <input
          class="rating"
          type="number"
          v-model="rating"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
        /><br />
        <button @click="addComment" class="submit-btn">Submit</button>
      </div>
    </div>
  </div>
  <div v-if="isCancelBookingPopUpBox" class="popup-overlay">
      <div class="popup">
        <button class="close-btn" @click="closePopUpBox">X</button>
        <h2>Booking cancellation</h2>
        
        <input
          class="comment"
          v-model="commentText"
          placeholder="Enter your comments"
        />
        <button @click="sendRequest" class="submit-btn">Submit</button>
      </div>
    </div>
  
</template>
  
  <script>
export default {
  name: "BookingHistory",
  data() {
    return {
      bookings: [],
      user: null,
      firstName: "",
      email: "",

      // comments
      commentText: "",
      rating: null,
      selactedBooking: {},
      isOpenPopUpBox: false,
    };
  },

  methods: {
    openPopUpBox(booking) {
      this.isOpenPopUpBox = true;
      this.selactedBooking = booking;
      console.log("Booking Id:", booking.id);
    },
    closePopUpBox() {
      this.isOpenPopUpBox = false;
    },
    cancelBookingPopUpBox(booking) {
      this.isOpenPopUpBox = true;
      this.selactedBooking = booking;
      console.log("Booking Id:", booking.id);
    },
    addComment() {
      fetch("https://localhost:5001/api/Comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          spotId: this.selactedBooking.spotId,
          userId: this.selactedBooking.userId,
          comment: this.commentText,
          rate: this.rating,
        }),
      }).then((response) => response.json());
    },
    fetchBookingHistory() {
      fetch("https://localhost:5001/api/Booking")
        .then((response) => response.json())
        .then((data) => {
          this.bookings = data.filter(
            (booking) => booking.userId === this.user.id
          );
        });
    },
    showSpotDetails(spotId) {
      this.$router.push({ name: "SpotDetails", params: { id: spotId } });
    },
    formatDate(datetimeStr) {
      // Parse datetime string to Date object
      const datetime = new Date(datetimeStr);

      // Extract date part
      const date = datetime.toISOString().split("T")[0];

      return date;
    },
  },
  mounted() {
    this.fetchBookingHistory();
    this.user = JSON.parse(localStorage.getItem("user-info"));
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
.close-btn {
  background-color: rgb(89, 227, 168);
  color: white;
  border: none;
  border-radius: 5px;
  width: 46px;
  height: 28px;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.close-btn:hover {
  background-color: rgb(237, 95, 95);
}
.submit-btn {
  border: none;
  border-radius: 5px;
  background-color: rgb(89, 227, 168);
  color: white;
  width: 95px;
  height: 40px;
}
.submit-btn:hover {
  background-color: rgb(84, 175, 136);
}
textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;

  border-radius: 5px;
}
.rating,
.comment {
  border: 0.9px solid black;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 14px;
}
.booking-history {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.booking-history h1 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
  