<template>
  <div class="admin-page">
    <div class="tabs">
      <div
        class="tab"
        v-for="tab in tabs"
        :key="tab.label"
        :class="{ active: currentTab === tab.label }"
        @click="currentTab = tab.label"
      >
        <span>{{ tab.label }}</span>
      </div>
    </div>

    <div class="tab-content" v-if="currentTab === 'Dashboard'">
      <div class="dashboard">
        <div class="card" style="background-color: #d5f4e6">
          <i class="fa fa-book"></i>
          <div class="card-info">
            <h3>{{ userCount }}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div class="card" style="background-color: #d4edda">
          <i class="fa fa-check-circle"></i>
          <div class="card-info">
            <h3>{{ bookingCount }}</h3>
            <p>Confirm Booking</p>
          </div>
        </div>
        <div class="card" style="background-color: #fff3cd">
          <i class="fa fa-map-marker-alt"></i>
          <div class="card-info">
            <h3>{{ spotCount }}</h3>
            <p>Total Spots</p>
          </div>
        </div>
        <div class="card" style="background-color: #f8d7da">
          <i class="fa fa-envelope"></i>
          <div class="card-info">
            <h3>5</h3>
            <p>Report Messages</p>
          </div>
        </div>
      </div>

      <div class="latest-bookings">
        <h2>Latest Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Spot Name</th>
              <th>Location</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.id }}</td>
              <td>{{ booking.spotName }}</td>
              <td>{{ booking.location }}</td>
              <td>{{ formatDate(booking.checkin) }}</td>
              <td>{{ formatDate(booking.checkout) }}</td>
              <td>{{ booking.firstname }}</td>
              <td>{{ booking.lastname }}</td>
              <td>{{ booking.email }}</td>
              <td>{{ booking.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB CREATE SPOT -->
    <div class="tab-content" v-if="currentTab === 'Create Spot'">
      <div class="create-spot">
        <h2>Create a New Spot</h2>
        <input v-model="name" type="text" placeholder="Name" />
        <input v-model="city" type="text" placeholder="City" />
        <input v-model="location" type="text" placeholder="Location" />
        <input v-model="description" type="text" placeholder="Description" />
        <input type="date" v-model="startDate" placeholder="Start Date" />
        <input type="date" v-model="endDate" placeholder="end Date" />
        <input v-model="ownerEmail" type="text" placeholder="Owner Email" />
        <input v-model="phone" type="text" placeholder="Phone" />
        <input type="number" v-model="price" placeholder="Price" />
        <input type="number" v-model="guest" placeholder="Guest" />
        
        <input type="text" v-model="imageLink1" placeholder="Image link 1" />
        <input type="text" v-model="imageLink2" placeholder="Image link 2" />
        <br />
        <button @click="saveSpot">Save Spot</button>
      </div>
    </div>

    <!-- TAB REPORTS -->
    <div class="tab-content" v-if="currentTab === 'Reports'">
      <div class="reports">
        <h2>Report Messages</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reports" :key="report.id">
              <td>{{ report.id }}</td>
              <td>{{ report.message }}</td>
              <td>
                <input
                  type="text"
                  v-model="spot.location"
                  placeholder="Location"
                />
              </td>
              <td>{{ report.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "AdminPage",
  data() {
    return {
      currentTab: "Dashboard",
      tabs: [
        { label: "Dashboard"},
        { label: "Create Spot"},
        { label: "Reports"},
      ],
      spot: {
        name: "",
        city: "",
        location: "",
        description: "",
        spot_Details: "",
        facilities_And_Activities: "",
        startDate: "",
        endDate: "",
        guest: null,
        ownerEmail: "",
        phone: "",
        price: null,
        imageLink1: "",
        imageLink2:""
      },
      bookings: [],
      reports: [],
      userCount: null,
      bookingCount: null,
      spotCount: null,
      messageCount: null,
    };
  },
  methods: {
    fetchSpots() {
      fetch("https://localhost:5001/api/Spot/").then((response) =>
        response.json()
      );
    },
    saveSpot() {
      let payload = {
        name: this.name,
        city: this.city,
        location: this.location,
        description: this.description,
        startDate: `${this.startDate}T12:19:39.563Z`,
        endDate: `${this.endDate}T12:19:39.563Z`,
        guest: this.guest,
        owner_Phone: this.phone,
        owner_Email: this.ownerEmail,
        price: this.price,
        image_link1: this.imageLink1,
        image_link2: this.imageLink2,
      };

      
      fetch("https://localhost:5001/api/Spot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((newSpot) => {
          this.fetchSpots();

          console.log(newSpot);
          alert("A new spot added!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    formatDate(datetimeStr) {
      const datetime = new Date(datetimeStr);

      const date = datetime.toISOString().split("T")[0];

      return date;
    },
    calculateUsers() {
      return fetch("https://localhost:5001/api/UserControler")
        .then((response) => response.json())
        .then((data) => {
          this.userCount = data.length;
        });
    },
    calculateSpot() {
      return fetch("https://localhost:5001/api/Spot")
        .then((response) => response.json())
        .then((data) => {
          this.spotCount = data.length;
        });
    },
    calculateBooking() {
      return fetch("https://localhost:5001/api/Booking")
        .then((response) => response.json())
        .then((data) => {
          this.bookingCount = data.length;
        });
    },
    fetchBookings() {
      fetch("https://localhost:5001/api/Booking")
        .then((response) => response.json())
        .then((data) => (this.bookings = data));
    },
  },
  mounted() {
    this.calculateUsers();
    this.calculateSpot();
    this.calculateBooking();
    this.fetchBookings();
  },
};
</script>

<style>
.admin-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.tabs {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.tab {
  padding: 10px 20px;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.tab.active {
  background-color: #d5f4e6;
  border: 1px solid #ccc;
  border-bottom: none;
}
.dashboard {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 7px;
  color: #333;
  flex: 1;
}
.card i {
  font-size: 61px;
  margin-right: 10px;
}

.latest-bookings,
.create-spot,
.reports {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #0056b3;
}
</style>
