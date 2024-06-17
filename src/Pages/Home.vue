<template>
  <div>
    <h1>Campers</h1>
    <div class="image-container">
      <img src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-691151500767891828/original/09f2b25b-97ef-4ce1-bfe9-0adc958fe257.jpeg?im_w=960" alt="" style="border-radius: 30px;">
      <img src="https://a0.muscache.com/im/pictures/b8526a3c-3b47-42e3-903f-212dcb3e98be.jpg?im_w=960" alt="" style="border-radius: 30px;">
      <img src="https://a0.muscache.com/im/pictures/350b9c86-a068-44db-a782-0dce0b2f97a7.jpg?im_w=720" alt="" style="border-radius: 30px;">
    </div>

    <p class="tagline">Embark on Your Journey to Serenity: Discover, <br>Explore, and Book Your Perfect Camping<br> Spot with Ease!</p>
    <button @click="redirect" class="btn">Explore Spots</button>
    
    <div class="details">
      <div class="texts">
        <h4>Discover Diverse Camping Locations with Ease!</h4>
        <p>At Campease, we offer a wide variety of camping spots tailored to your preferences. Whether you’re looking for a serene retreat in the woods, a cozy RV park, or a scenic lakeside spot, our platform makes it easy to find and book your perfect spot. With excellent management and user-friendly features, your next adventure is just a few clicks away!</p>
      </div>
      <div class="photos">
        <img src="../assets/Directions-bro.png" alt="">
      </div>
    </div>
    
    <div class="details reverse">
      <div class="photos">
        <img src="../assets/Current location-pana.png" alt="">
      </div>
      <div class="texts">
        <h4>24/7 Customer Support at Your Fingertips!</h4>
        <p>At Campease, we understand that adventure can come with unexpected challenges. That's why we offer round-the-clock customer support to assist you wherever you are. Simply share your current location, and our dedicated team will be there to provide the help you need, ensuring a seamless and enjoyable camping experience. Your adventure is our priority, and we're here to make it extraordinary.</p>
      </div>
    </div>
  </div>

  <footer class="footer">
    <p>© 2024 Campease. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: "HomeComponent",
  data() {
    return {};
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'CampSpots' });
    }
  },
  mounted(){
    
  }
}
</script>

<style>


.image-container {
  display: flex;
  justify-content: center;
}

.image-container img {
  width: 30%; 
  height: auto;
  padding: 10px;
}

.tagline {
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  padding: 20px 0; 
}



.details {
  display: flex;
  align-items: center; /* Optional: vertically center-aligns items */
  margin: 20px 0; /* Add some spacing between sections */
}

.details.reverse {
  flex-direction: row-reverse;
}

.texts {
  flex: 1;
  font-size: large;
  margin: 0 50px; /* Adjusted margin for consistent spacing */
}

.photos {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photos img {
  width: 100%;
  height: auto;
  max-width: 400px; /* Ensures image doesn't get too large */
  max-height: 700px; /* Ensures image doesn't get too large */
}

.footer {
  background-color: rgb(44,62,80);
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  width: 100%;
  bottom: 0;
}
</style>
