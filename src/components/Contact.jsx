import { useEffect, useRef, useState } from "react";
import contactImage from "../assests/contact-img.png";

function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setSubmissionStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We couldn't send your message.");
      }

      form.reset();
      setSubmissionStatus({ type: "success", message: result.message });
    } catch (error) {
      setSubmissionStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We couldn't send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`contact-section${isVisible ? " contact-section--visible" : ""}`}
      id="contact"
      aria-labelledby="contact-title"
      ref={sectionRef}
    >
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="contact-eyebrow">GET IN TOUCH</p>
          <h2 id="contact-title">
            Let&apos;s <span>talk.</span>
          </h2>
          <p className="contact-intro">
            Have a project in mind or want to connect? Send me a message and
            I&apos;ll get back to you.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Your name</label>
            <input
              autoComplete="name"
              id="contact-name"
              maxLength={120}
              name="name"
              placeholder="Name"
              required
            />

            <label htmlFor="contact-email">Your email</label>
            <input
              autoComplete="email"
              id="contact-email"
              maxLength={254}
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />

            <label htmlFor="contact-message">Your message</label>
            <textarea
              id="contact-message"
              maxLength={5000}
              name="message"
              placeholder="Tell me a little about what you have in mind..."
              required
              rows="4"
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
            {submissionStatus.message && (
              <p
                className={`contact-form-status contact-form-status--${submissionStatus.type}`}
                role={submissionStatus.type === "error" ? "alert" : "status"}
              >
                {submissionStatus.message}
              </p>
            )}
          </form>

        </div>

        <div className="contact-portrait">
          <img src={contactImage} alt="Portrait for the contact section" />
        </div>
      </div>
    </section>
  );
}

export default Contact;
