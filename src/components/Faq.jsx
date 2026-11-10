const QUESTIONS = [
  {
    question: "What kind of websites can you build?",
    answer:
      "I build responsive portfolio, business, and custom web applications. Share what you need, and we can decide together on the right features and technology.",
  },
  {
    question: "How much will my project cost?",
    answer:
      "The cost depends on the scope, features, and timeline. Once I understand your requirements, I can discuss an estimate before work begins.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "Timing depends on the size and complexity of the project. After we agree on the requirements, I’ll provide a realistic timeline and keep you updated as work progresses.",
  },
  {
    question: "Can you help if I only have an idea?",
    answer:
      "Yes. You can start with a rough idea. We can discuss your goals, audience, and essential features, then shape them into a clear project plan.",
  },
  {
    question: "Will my website work on phones and tablets?",
    answer:
      "Yes. I build responsive layouts and check that the experience adapts to common screen sizes, including mobile, tablet, and desktop.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "I can help with agreed post-launch fixes and updates. We’ll discuss the support you need and its scope before the project is completed.",
  },
];

function Faq() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-content">
        <header className="faq-heading">
          <p>FAQ</p>
          <h2 id="faq-title">Questions clients ask</h2>
        </header>
        <div className="faq-list">
          {QUESTIONS.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
