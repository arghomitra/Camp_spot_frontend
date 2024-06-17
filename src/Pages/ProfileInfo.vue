<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar">
          <span class="profile-initial-letter">{{ userInitial }}</span>
        </div>
        <h2>{{ user.firstname + " " + user.lastname }}</h2>
        <p>{{ user.email }}</p>
      </div>
      <div class="profile-about">
        <h3>About</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          hendrerit, sapien non mattis placerat, ligula velit ultrices risus, ut
          sollicitudin ante sapien sed lacus. Integer id nunc vel justo
          convallis tincidunt. Fusce lobortis, ipsum at vestibulum fermentum,
          nisl risus tincidunt sapien, eget eleifend nulla magna non mauris.
        </p>
      </div>
    </div>
    <div class="profile-form">
      <h3>Personal Details</h3>
      <form @submit.prevent="update">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" v-model="user.firstname" />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" v-model="user.lastname" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" :value="user.email" readonly />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="text" v-model="user.phone" />
        </div>
        <div class="form-group">
          <label>Gender</label>
          <input type="text" v-model="user.gender" />
        </div>
        <h3>Address</h3>
        <div class="form-group">
          <label>Street</label>
          <input type="text" v-model="user.userAddress.street" />
        </div>
        <div class="form-group">
          <label>House number</label>
          <input type="text" v-model="user.userAddress.housenumber" />
        </div>
        <div class="form-group">
          <label>Postal Code</label>
          <input type="text" v-model="user.userAddress.postalcode" />
        </div>
        <div class="form-group">
          <label>City</label>
          <input type="text" v-model="user.userAddress.city" />
        </div>
        <div class="form-buttons">
          <button type="button" @click="cancelUpdate">Cancel</button>
          <button type="submit">Update</button>
        </div>
      </form>
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
  name: "ProfileInfo",
  data() {
    return {
      user: {
        id: 3, // Assuming user ID is hardcoded here for testing; ideally fetched from the server or localStorage
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        userAddress: {
          street: "",
          housenumber: "",
          postalcode: "",
          city: "",
        },
      },
      isErrorBox: false,
      errorMessage: ""
    };
  },
  computed: {
    userInitial() {
      return this.user.firstname.charAt(0).toUpperCase();
    },
  },
  methods: {
    update() {
      const payload = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password,
        phone: this.user.phone,
        gender: this.user.gender,
        userAddress: {
          street: this.user.userAddress.street,
          housenumber:this.user.userAddress.housenumber, // Ensure string type
          postalcode: this.user.userAddress.postalcode,   // Ensure string type
          city: this.user.userAddress.city,
        },
      };

      console.log("Payload:", JSON.stringify(payload));

      fetch(`https://localhost:5001/api/UserControler/${this.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              console.log("Error response JSON:", error);
              throw new Error(error.message || 'Unknown error');
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Profile updated successfully:", data);
        })
        .catch((error) => {
          this.isErrorBox = true;
          this.errorMessage = `Failed to update profile: ${error.message}`;
          console.error("Error updating profile:", error);
        });
    },
    cancelUpdate() {
      console.log("Update canceled");
    },
    cancelErrorPopup() {
      this.isErrorBox = false;
      this.errorMessage = "";
    }
  },
  mounted() {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    } else {
      console.error("User info not found in localStorage");
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
.profile-page {
  display: flex;
  gap: 20px;
}
.profile-card {
  flex: 1;
  background: rgb(89, 227, 168);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.profile-header {
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #20639B;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 205px;
}
.profile-initial-letter {
  color: white;
  font-size: 36px;
  font-weight: bold;
}
.profile-about {
  margin-top: 20px;
}
.profile-form {
  flex: 2;
  background: #e9f9ef;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.form-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.form-buttons button[type="button"] {
  background: #ccc;
}
.form-buttons button[type="submit"] {
  background: #007bff;
  color: #fff;
}
</style>
