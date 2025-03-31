import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Home.module.css"; // Import CSS Module

export default function Home() {
  return (
    <div>
      {/* Section A: Carousel */}
      <section className={styles.carousel}>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
        >
          <div>
            <img
              src="https://northboundgear.co/cdn/shop/articles/Screen_Shot_2022-03-22_at_14.08.05.png?v=1647954506"
              alt="Donation Image 1"
            />
          </div>
          <div>
            <img
              src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2015/12/soundofhope.jpg"
              alt="Donation Image 2"
            />
          </div>
        </Carousel>
        <div className={styles.overlay}>
          <h1>Welcome to Clothes Donation</h1>
          <p>Donate old clothes to NGOs & orphanages in need.</p>
        </div>
      </section>

      {/* Section B: About Us */}
      <section className={styles.about}>
        <h2>About Us</h2>
        <p>
          Our platform connects donors with NGOs and orphanages, ensuring your
          old clothes reach those who truly need them. Join us in making a
          difference!
        </p>
      </section>

      {/* Section C: Stats */}
      <section className={styles.stats}>
        <div>
          <h2>50+</h2>
          <p>NGOs Connected</p>
        </div>
        <div>
          <h2>500+</h2>
          <p>Donors & Helpers</p>
        </div>
      </section>

      {/* Section D: Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Clothes Donation. All rights reserved.</p>
      </footer>
    </div>
  );
}
