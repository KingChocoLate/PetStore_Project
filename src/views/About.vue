<template>
  <div class="about-page">
    <header class="hero-section">
      <div class="hero-content">
        <span class="tagline">EST. 2025</span>
        <h1>More Than a Store,<br>We Are <span class="highlight">Family.</span></h1>
        <p>
          Welcome to PetStore+, where every tail wag and purr matters.
          We provide premium quality for your furry, feathery, and scaly friends.
        </p>
        <router-link to="/shop" class="cta-button">
          Shop Now
        </router-link>
      </div>
      <div class="hero-image-container">
        <img :src="heroImage" alt="Happy Pet Owner" class="hero-img" />
      </div>
    </header>

    <section class="section-container story-section">
      <div class="content-wrapper">
        <div class="text-col">
          <h2 class="section-title">Our Story</h2>
          <p class="section-desc">
            It started with a simple goal: to bring happiness, comfort, and care to every pet.
            We believe that pets aren't just animals; they are members of the family.
          </p>
          <p class="section-desc">
            That's why we curate only the healthiest food, the safest toys, and the most modern accessories.
          </p>

          <div class="approach-container">
            <h3>Our Approach</h3>
            <ul class="approach-list">
              <li>
                <span class="arrow-icon">➜</span>
                Healthy and nutritious food for dogs, cats, and small animals
              </li>
              <li>
                <span class="arrow-icon">➜</span>
                Accessories such as collars, toys, harnesses, grooming tools, and beds
              </li>
              <li>
                <span class="arrow-icon">➜</span>
                Daily essentials made with pet-friendly materials
              </li>
              <li>
                <span class="arrow-icon">➜</span>
                Modern designs that fit your pet's lifestyle
              </li>
            </ul>
          </div>

          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-num">5k+</span>
              <span class="stat-label">Happy Pets</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">100+</span>
              <span class="stat-label">Premium Brands</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">24/7</span>
              <span class="stat-label">Support</span>
            </div>
          </div>
        </div>

        <div class="img-col">
          <img :src="storyImage" alt="Store Interior" class="rounded-img" />
        </div>
      </div>
    </section>

    <section class="section-container values-section">
      <h2 class="section-title center">Why Pet Parents Choose Us</h2>

      <div class="features-grid">
        <div class="feature-card">
          <div class="icon-circle"><svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
              class="feature-svg"
              fill="currentColor"
            >
              <g>
                <g>
                  <path d="M476.158,286.938l-13.259-53.035c3.625-0.77,6.345-3.986,6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392 v-17.637c0-9.136-7.432-16.568-16.568-16.568H246.32l68.24-27.296c4.111-1.644,6.11-6.31,4.466-10.421 c-1.644-4.11-6.307-6.111-10.421-4.466l-55.874,22.349c17.026-10.924,33.871-22.947,40.284-31.355 c12.485-16.369,9.323-39.843-7.046-52.328c-16.369-12.486-39.843-9.323-52.328,7.046c-9.122,11.962-21.158,45.573-28.948,69.258 c-7.79-23.683-19.826-57.296-28.948-69.258c-12.484-16.369-35.959-19.53-52.328-7.046c-16.369,12.484-19.53,35.958-7.046,52.328 c6.413,8.409,23.257,20.431,40.284,31.355l-55.874-22.349c-4.113-1.647-8.777,0.355-10.421,4.466 c-1.645,4.111,0.355,8.777,4.466,10.421l68.24,27.296H50.772c-9.136,0-16.568,7.432-16.568,16.568v145.37 c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017v-145.37c0-0.295,0.239-0.534,0.534-0.534h307.841 c0.295,0,0.534,0.239,0.534,0.534v145.372c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017v-9.088h94.566 c0.009,0,0.016,0.002,0.025,0.002s0.017-0.001,0.026-0.001c11.636,0.009,21.516,7.647,24.908,18.171h-24.928 c-4.427,0-8.017,3.589-8.017,8.017v17.102c0,13.851,11.268,25.119,25.119,25.119h9.086v35.273h-20.962 c-6.886-19.882-25.787-34.205-47.982-34.205s-41.097,14.322-47.982,34.205h-3.86V345.78c0-4.427-3.589-8.017-8.017-8.017 c-4.427,0-8.017,3.589-8.017,8.017v60.392H192.817c-6.886-19.882-25.787-34.205-47.982-34.205s-41.097,14.322-47.982,34.205 H50.772c-0.295,0-0.534-0.239-0.534-0.534v-17.637h34.739c4.427,0,8.017-3.589,8.017-8.017s-3.589-8.017-8.017-8.017H8.017 c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h26.188v17.637c0,9.136,7.432,16.568,16.568,16.568h43.304 c-0.002,0.178-0.014,0.355-0.014,0.534c0,27.995,22.777,50.772,50.772,50.772s50.772-22.777,50.772-50.772 c0-0.18-0.012-0.356-0.014-0.534h180.67c-0.002,0.178-0.014,0.355-0.014,0.534c0,27.995,22.777,50.772,50.772,50.772 c27.995,0,50.772-22.777,50.772-50.772c0-0.18-0.012-0.356-0.014-0.534h26.203c4.427,0,8.017-3.589,8.017-8.017v-85.511 C512,307.564,496.423,290.022,476.158,286.938z M172.9,121.059c-31.623-19.651-41.003-28.692-43.78-32.334 c-7.123-9.339-5.319-22.732,4.021-29.855c3.85-2.936,8.388-4.355,12.893-4.355c6.422,0,12.776,2.886,16.963,8.376 c7.755,10.168,19.9,44.391,27.918,69.052C185.504,128.757,179.284,125.028,172.9,121.059z M218.473,131.942 c8.018-24.66,20.163-58.882,27.917-69.052c7.123-9.339,20.516-11.142,29.855-4.02c9.34,7.123,11.143,20.516,4.021,29.855 c-2.777,3.641-12.157,12.683-43.778,32.333C230.105,125.026,223.885,128.756,218.473,131.942z M375.182,199.875h60.392 c9.725,0,17.637,7.912,17.637,17.637v0.534h-78.029V199.875z M375.182,286.456V234.08h71.235l13.094,52.376H375.182z M144.835,457.479c-19.155,0-34.739-15.584-34.739-34.739s15.584-34.739,34.739-34.739c19.155,0,34.739,15.584,34.739,34.739 S163.99,457.479,144.835,457.479z M427.023,457.479c-19.155,0-34.739-15.584-34.739-34.739s15.584-34.739,34.739-34.739 c19.155,0,34.739,15.584,34.739,34.739S446.178,457.479,427.023,457.479z M495.967,354.865h-9.086 c-5.01,0-9.086-4.076-9.086-9.086v-9.086h18.171V354.865z"></path>
                </g>
                <g>
                  <path d="M144.835,406.172c-9.136,0-16.568,7.432-16.568,16.568s7.432,16.568,16.568,16.568c9.136,0,16.568-7.432,16.568-16.568 S153.971,406.172,144.835,406.172z"></path>
                </g>
                <g>
                  <path d="M427.023,406.172c-9.136,0-16.568,7.432-16.568,16.568s7.432,16.568,16.568,16.568c9.136,0,16.568-7.432,16.568-16.568 S436.159,406.172,427.023,406.172z"></path>
                </g>
                <g>
                  <path d="M332.96,371.967H213.244c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017H332.96 c4.427,0,8.017-3.589,8.017-8.017S337.388,371.967,332.96,371.967z"></path>
                </g>
                <g>
                  <path d="M127.733,337.763H25.119c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h102.614 c4.427,0,8.017-3.589,8.017-8.017S132.16,337.763,127.733,337.763z"></path>
                </g>
                <g>
                  <path d="M127.733,218.046H93.528c-4.427,0-8.017,3.589-8.017,8.017v68.409c0,4.427,3.589,8.017,8.017,8.017 s8.017-3.589,8.017-8.017v-26.188h17.637c4.427,0,8.017-3.589,8.017-8.017s-3.589-8.017-8.017-8.017h-17.637V234.08h26.188 c4.427,0,8.017-3.589,8.017-8.017C135.749,221.636,132.16,218.046,127.733,218.046z"></path>
                </g>
                <g>
                  <path d="M190.822,272.043c8.023-5.255,13.337-14.317,13.337-24.602c0-16.209-13.186-29.395-29.395-29.395h-21.378 c-4.427,0-8.017,3.589-8.017,8.017v68.409c0,4.427,3.589,8.017,8.017,8.017s8.017-3.589,8.017-8.017v-17.637h13.346l14.722,22.083 c1.545,2.317,4.086,3.571,6.677,3.571c1.529,0,3.073-0.436,4.439-1.348c3.685-2.455,4.68-7.433,2.223-11.116L190.822,272.043z M174.764,260.802h-13.361V234.08h13.361c7.368,0,13.361,5.993,13.361,13.361C188.125,254.809,182.132,260.802,174.764,260.802z"></path>
                </g>
                <g>
                  <path d="M256,286.456h-26.188v-18.198c0.177,0.012,0.354,0.027,0.534,0.027h17.102c4.427,0,8.017-3.589,8.017-8.017 s-3.589-8.017-8.017-8.017h-17.102c-0.181,0-0.357,0.015-0.534,0.027V234.08H256c4.427,0,8.017-3.589,8.017-8.017 c0-4.427-3.589-8.017-8.017-8.017h-34.205c-4.427,0-8.017,3.589-8.017,8.017v68.409c0,4.427,3.589,8.017,8.017,8.017H256 c4.427,0,8.017-3.589,8.017-8.017S260.427,286.456,256,286.456z"></path>
                </g>
                <g>
                  <path d="M315.858,286.456H289.67v-18.171h9.086c4.427,0,8.017-3.589,8.017-8.017s-3.589-8.017-8.017-8.017h-9.086V234.08h26.188 c4.427,0,8.017-3.589,8.017-8.017c0-4.427-3.589-8.017-8.017-8.017h-34.205c-4.427,0-8.017,3.589-8.017,8.017v68.409 c0,4.427,3.589,8.017,8.017,8.017h34.205c4.427,0,8.017-3.589,8.017-8.017S320.285,286.456,315.858,286.456z"></path>
                </g>
              </g>
            </svg>
          </div>
          <h3>Free Shipping</h3>
          <p>No hidden fees. Delivered straight to your door, fast and free.</p>
        </div>

        <div class="feature-card">
          <div class="icon-circle"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 485 485" xml:space="preserve" class="feature-svg" fill="currentColor">
              <g>
                <path d="M444.931,270.056c3.169-10.513,4.814-21.496,4.814-32.562c0-62.054-50.484-112.539-112.538-112.539 c-1.055,0-2.121,0.016-3.194,0.048c-9.292-12.96-21.286-23.885-35.105-31.907C281.84,83.188,262.334,77.95,242.5,77.95 s-39.34,5.238-56.408,15.147c-13.819,8.022-25.813,18.947-35.105,31.907c-1.073-0.032-2.139-0.048-3.194-0.048 c-0.093,0-0.185,0.003-0.277,0.003V5.112h-30v123.986c-20.308,5.68-38.311,16.927-52.261,31.983V5.112h-30v264.944H0v62.276 c0,81.362,66.193,147.555,147.555,147.555h189.89c81.362,0,147.555-66.193,147.555-147.555v-62.276H444.931z M147.793,154.956 c2.974,0,6.085,0.178,9.248,0.53l9.592,1.067l4.946-8.287c14.843-24.868,42.019-40.316,70.921-40.316s56.078,15.448,70.921,40.316 l4.946,8.287l9.592-1.067c3.163-0.352,6.274-0.53,9.248-0.53c45.512,0,82.538,37.027,82.538,82.539 c0,11.229-2.298,22.333-6.682,32.562h-87.205l41.059-41.059l-21.213-21.213l-62.271,62.271H257.5V163.459h-30v106.597h-25.932 l-62.272-62.271l-21.213,21.213l41.059,41.059H71.937c-4.384-10.228-6.682-21.333-6.682-32.562 C65.255,191.983,102.281,154.956,147.793,154.956z M455,332.333c0,64.82-52.735,117.555-117.555,117.555h-189.89 C82.735,449.888,30,397.153,30,332.333v-32.276h425V332.333z"></path>
              </g>
            </svg></div>
          <h3>Healthy & Nutritious</h3>
          <p>Only the best ingredients for your dogs, cats, and small animals.</p>
        </div>

        <div class="feature-card">
          <div class="icon-circle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="feature-svg">
              <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.919z" clip-rule="evenodd" />
            </svg></div>
          <h3>Easy Returns</h3>
          <p>Changed your mind? No worries. Our return process is stress-free.</p>
        </div>

        <div class="feature-card">
          <div class="icon-circle"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" class="feature-svg" fill="currentColor">
              <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1ZM8.149,3.878A4.063,4.063,0,0,1,7.376,6.07c-.394-.2-.86-.457-1.378-.757A9.025,9.025,0,0,1,8.149,3.878ZM6.183,18.855a9,9,0,0,1-2.992-5.012c3.609-1.225,5.149-1.41,5.749-1.41h0a1.775,1.775,0,0,1-.523.735,2.157,2.157,0,0,0-.648.959,1.485,1.485,0,0,0,.5,1.523c.046.427-.983,1.762-1.664,2.646C6.465,18.476,6.324,18.67,6.183,18.855ZM12,21a8.937,8.937,0,0,1-4.156-1.025c.115-.152.231-.311.344-.458,1.353-1.755,2.748-3.566,1.709-5A3.382,3.382,0,0,0,11,12a1.452,1.452,0,0,0-.619-1.2c-.463-.327-1.395-.989-7.371.992A8.941,8.941,0,0,1,4.64,6.837c.738.436,1.379.791,1.913,1.058a1.838,1.838,0,0,0,1.92-.152c1.12-.784,1.7-2.8,1.713-4.559a8.911,8.911,0,0,1,4.787.331C11.758,4.888,11,6.653,11,8c0,3.034,2.017,3.268,3.1,3.394.9.105.9.105.9.606a6.574,6.574,0,0,1-.526,2.455c-.363.973-.911,2.445,1.079,3.44a2.339,2.339,0,0,0,1.061.243,6.4,6.4,0,0,0,2.643-.837A8.987,8.987,0,0,1,12,21Zm8.635-6.485a14.445,14.445,0,0,0-1.969.851c-.786.387-1.862.917-2.219.739a2.835,2.835,0,0,1-.336-.193,4.1,4.1,0,0,1,.237-.76A8.476,8.476,0,0,0,17,12c0-2.283-1.8-2.492-2.67-2.593C13.282,9.286,13,9.253,13,8c0-1.628,2.545-2.677,4.354-3.217a8.939,8.939,0,0,1,3.281,9.732Z"/>
            </svg>
          </div>
          <h3>Eco-Friendly</h3>
          <p>Sustainable products that are good for your pet and the planet.</p>
        </div>
      </div>
    </section>

    <section class="section-container feedback-section">
      <h2 class="section-title center">Customer Love</h2>

      <div class="feedback-scroll-container">

        <div class="feedback-card green-theme">
          <div class="stars">★★★★★</div>
          <p class="feedback-text">
            "I absolutely love shopping at PetStore+! The website is super easy to navigate,
            and I found everything I needed for my puppy in just a few clicks."
          </p>
          <div class="user-profile">
            <img :src="userImage" alt="User" class="avatar" />
            <div class="user-info">
              <h4>Kakaka Jong</h4>
              <span>Loyal Customer</span>
            </div>
          </div>
        </div>

        <div class="feedback-card green-theme">
          <div class="stars">★★★★★</div>
          <p class="feedback-text">
            "The quality of the food is amazing. My cat is usually very picky,
            but she loves the premium brands you carry. Highly recommended!"
          </p>
          <div class="user-profile">
            <img :src="userImage" alt="User" class="avatar" />
            <div class="user-info">
              <h4>Sarah Smith</h4>
              <span>Cat Mom</span>
            </div>
          </div>
        </div>

        <div class="feedback-card green-theme">
          <div class="stars">★★★★★</div>
          <p class="feedback-text">
            "Super fast shipping and the packaging was so cute. You can really tell they care about pets.
            Will definitely be buying again."
          </p>
          <div class="user-profile">
            <img :src="userImage" alt="User" class="avatar" />
            <div class="user-info">
              <h4>James Doi</h4>
              <span>Dog Lover</span>
            </div>
          </div>
        </div>

        <div class="feedback-card green-theme">
          <div class="stars">★★★★☆</div>
          <p class="feedback-text">
            "Great selection of toys. My hamster loves the new wheel I bought.
            Customer service was very helpful when I had a question."
          </p>
          <div class="user-profile">
            <img :src="userImage" alt="User" class="avatar" />
            <div class="user-info">
              <h4>Emily Chen</h4>
              <span>Hamster Owner</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <footer class="footer">
      <p>&copy; 2025 PetStore+. All rights reserved.</p>
    </footer>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import logo from '../assets/photos/Logo_PetStore.png';
import heroImage from '../assets/photos/pets2.png';
import storyImage from '../assets/photos/shop.png';
import userImage from '../assets/photos/paws.png';

export default defineComponent({
  name: 'AboutPage',
  setup() {
    return {
      logo,
      heroImage,
      storyImage,
      userImage
    };
  }
});
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.about-page {
  width: 100%;
  background-color: #fff;
  color: #333;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 10%;
  background: linear-gradient(135deg, #fff 0%, #AEE2E8 100%);
  min-height: 45vh;
}

.hero-content {
  flex: 1;
  padding-right: 50px;
}

.tagline {
  color: #009200;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: block;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.highlight {
  color: #009200;
}

.hero-content p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  max-width: 500px;
  margin-bottom: 25px;
}

.cta-button {
  display: inline-block;
  padding: 12px 35px;
  background-color: #009200;
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(0, 146, 0, 0.2);
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #007a00;
  transform: translateY(-2px);
}

.hero-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-img {
  max-width: 100%;
  max-height: 350px;
  height: auto;
  border-radius: 30px;
  object-fit: cover;
}

/* --- SHARED SECTION STYLES --- */
.section-container {
  padding: 80px 10%;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #000;
  font-weight: 700;
}

.section-title.center {
  text-align: center;
  margin-bottom: 60px;
}

.section-desc {
  font-size: 1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 15px;
}

/* --- STORY SECTION --- */
.story-section {
  background-color: #fff;
}

.content-wrapper {
  display: flex;
  align-items: center;
  gap: 60px;
}

.text-col {
  flex: 1;
}

.img-col {
  flex: 1;
}

.rounded-img {
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  height: auto;
}

/* --- APPROACH STYLES --- */
.approach-container {
  margin-top: 30px;
  margin-bottom: 30px;
}

.approach-container h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 15px;
}

.approach-list {
  list-style: none;
  padding: 0;
}

.approach-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
}

.arrow-icon {
  color: #009200;
  font-weight: 800;
  margin-right: 12px;
}

/* --- STATS STYLES --- */
.stats-row {
  display: flex;
  gap: 40px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 1.8rem;
  font-weight: 800;
  color: #009200;
}

.stat-label {
  font-size: 0.9rem;
  color: #888;
}

/* --- VALUES SECTION --- */
.values-section {
  background-color: #f9fdf9;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: #fff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  text-align: left;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.icon-circle {
  width: 60px;
  height: 60px;
  background-color: #AEE2E8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #009200;
}
.feature-svg {
  width: 35px;
  height: 35px;
}
.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #222;
}

.feature-card p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
}

/* --- FEEDBACK SECTION (GREEN THEME & SCROLLABLE) --- */
.feedback-section {
  background-color: #fff;
  overflow: hidden;
}

.feedback-scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 30px;
  padding: 10px 5px 30px 5px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Custom Scrollbar */
.feedback-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.feedback-scroll-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.feedback-scroll-container::-webkit-scrollbar-track {
  background-color: transparent;
}

/* GREEN THEME CARD STYLES */
.feedback-card.green-theme {
  flex: 0 0 350px;
  /* Green background */
  background-color: #009200;
  /* White text */
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.feedback-card.green-theme:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 146, 0, 0.2);
}

.stars {
  color: #FFD700; /* Gold stars look good on green */
  font-size: 1.2rem;
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.feedback-text {
  /* Slightly transparent white for better readability */
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 25px;
  flex-grow: 1;
}

/* USER PROFILE ON GREEN */
.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
  /* Subtle white border */
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  /* White border to pop against green */
  border: 3px solid #fff;
}

.user-info h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff; /* White name */
}

.user-info span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7); /* Off-white role */
}

/* --- FOOTER --- */
.footer {
  text-align: center;
  padding: 30px;
  border-top: 1px solid #eee;
  color: #999;
  font-size: 0.9rem;
}

/* --- RESPONSIVE DESIGN --- */
@media (max-width: 992px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 30px;
  }

  .content-wrapper {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 15px 20px;
  }

  .nav-center {
    display: none;
  }

  .section-container {
    padding: 60px 20px;
  }

  .feedback-card.green-theme {
    flex: 0 0 280px;
  }
}
</style>
