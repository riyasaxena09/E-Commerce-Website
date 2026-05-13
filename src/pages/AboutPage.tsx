import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "500+", label: "Premium Products" },
  { number: "24/7", label: "Customer Support" },
  { number: "99%", label: "Positive Reviews" },
];

const team = [
  {
    name: "Sophia Carter",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ethan Brooks",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
   {
    name: "Emma Wilson",
    role: "Marketing Lead",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
];

export default function AboutPage() {

    const navigate = useNavigate();
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Trusted E-Commerce Brand</span>
          <h1>
            Building Better Shopping
            <span> Experiences</span>
          </h1>
          <p>
            We create modern online shopping experiences with quality products,
            fast delivery, and exceptional customer service.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => {navigate('/products')}}>
              Shop Now
            </button>
            <button className="secondary-btn" onClick={() => {navigate('/about')}}>
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
            alt="Shopping"
            className="hero-image"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-image">
          <img
           src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
            alt="Store Team"
          />
        </div>

        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for simplicity and innovation, our mission is
            to make online shopping smooth, affordable, and enjoyable for
            everyone.
          </p>

          <p>
            From fashion and electronics to home essentials, we carefully curate
            products that combine quality, style, and value.
          </p>
        </div>
      </section>
      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <h3>{item.number}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Meet Our Team</h2>
          <p>
            Dedicated professionals working together to create the best shopping
            experience.
          </p>
        </div>

          <div className="team-grid">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <span>{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Explore?</h2>
        <p>
          Discover thousands of premium products designed for your lifestyle.
        </p>
        <button className="primary-btn" onClick={() => {navigate('/products')}}>
          Start Shopping
        </button>
      </section>
    </div>
  );
}