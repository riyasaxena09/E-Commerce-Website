import { Mail } from "lucide-react";
import { useState } from "react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 md:py-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <Mail className="w-12 h-12" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Stay Updated with Our Latest Trends
        </h2>

        <p className="text-gray-300 text-lg mb-8">
          Subscribe to our newsletter and get exclusive deals, styling tips, and new
          arrivals delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="text-green-400 mt-4 animate-slideUp">
            Thanks for subscribing! Check your email for confirmation.
          </p>
        )}

        <p className="text-gray-400 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};
