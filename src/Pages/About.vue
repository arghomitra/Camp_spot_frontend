<template>
  <div class="about-page">
    <section class="about-section">
      <h1>About Us.</h1>
      <p>
        Welcome to Campease, your ultimate destination for booking the best
        camping spots in Belgium. We are dedicated to providing an easy and
        seamless camping booking experience for all nature enthusiasts. Whether
        you are looking for a serene lakeside spot or a forest retreat, Campease
        has got you covered.
      </p>
    </section>
    <section class="quote-section">
      <blockquote>
        Our work does make sense only if it is a faithful witness of its time.
      </blockquote>
      <cite>— Jean-Philippe Nuel, Director</cite>
    </section>
    <section class="team-section">
      <img
        src="https://cdn.dribbble.com/users/1196036/screenshots/4113961/media/833ab3c0a78d426ca696bc7d4dbf0614.gif"
        alt="gif"
        style="
          border-radius: 15px;
          width: 100%;
          max-width: 600px;
          display: block;
          margin: 0 auto;
        "
      />
      <h1 style="margin-top: 70px">Why You Select CampEase</h1>
      <p>
        
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          hendrerit, sapien non mattis placerat, ligula velit ultrices risus, ut
          sollicitudin ante sapien sed lacus. Integer id nunc vel justo
          convallis tincidunt. Fusce lobortis, ipsum at vestibulum fermentum,
          nisl risus tincidunt sapien, eget eleifend nulla magna non mauris.
        
      </p>

      <h2>Top Camping locations.</h2>
      <div class="team-members">
        <div class="team-member">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/12/18/a6/camping-memling-may.jpg?w=2400&h=-1&s=1"
            alt=""
            style="border-radius: 7px; width: 342px; height: 305px"
          />
          <p>Camping Baalse Hei</p>
          <p> Turnhout, Antwerp</p>
        </div>
        <div class="team-member">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-946891754525944779/original/81ef869f-583b-4a42-a69c-54a59e0d99fe.jpeg?im_w=1200"
            alt=""
            style="border-radius: 7px; width: 342px; height: 305px"
          />
          
          <p>Camping Klein Strand</p>
          <p>Jabbeke, West Flanders</p>
        </div>
        <div class="team-member">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-700729934091050704/original/a3dc385a-1c4e-468a-815a-14e2c9eecf4a.jpeg?im_w=1200"
            alt=""
            style="border-radius: 7px; width: 342px; height: 305px"
          />
          
          <p>Camping Spa d'Or</p>
          <p>Sart-lez-Spa, Liège</p>
        </div>
      </div>
      
    </section>
    
  </div>
</template>
  
  <script>
export default {
  name: "AboutComponent",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
  
  <style>
.about-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.nav ul {
  display: flex;
  justify-content: space-between;
  padding: 0;
  list-style: none;
  margin-bottom: 20px;
}

.about-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.about-section h1 {
  font-size: 36px;
  color: #000;
}

.quote-section {
  margin: 40px 0;
  font-style: italic;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

.team-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.team-section h2 {
  font-size: 36px;
  color: #000;
}

.team-members {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.team-member {
  text-align: center;
}

.team-member img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.stats div {
  text-align: center;
}

.stats h3 {
  font-size: 36px;
  margin: 0;
}

.footer {
  margin-top: 40px;
}

.footer p {
  font-size: 14px;
  color: #777;
}
</style>
  