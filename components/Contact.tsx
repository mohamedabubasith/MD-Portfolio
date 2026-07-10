import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xpwrbrdv', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // silent fail — user can retry
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="eyebrow reveal">OPEN TO INTERESTING PROBLEMS</div>
      <h2 className="reveal d2">LET'S BUILD<br /><span className="hollow">WHAT'S NEXT</span></h2>
      <a className="mail reveal d3" href="mailto:mohamedabu.basith@gmail.com">mohamedabu.basith@gmail.com</a>

      <div className="contact-grid">
        <div className="panel reveal d1">
          <p className="contact-intro">
            I'm open to interesting AI engineering problems, consulting on LLM infrastructure,
            and conversations about building things that actually ship. Drop a message — I read
            everything and reply within 24h.
          </p>
          <div className="panel-head">
            <span>STATUS</span>
            <span className="live">OPEN</span>
          </div>
          <div className="tele-row"><span className="k">AVAILABILITY</span><span className="v good">Open to consult</span></div>
          <div className="tele-row"><span className="k">TIMEZONE</span><span className="v">IST (UTC+5:30)</span></div>
          <div className="tele-row"><span className="k">RESPONSE TIME</span><span className="v">&lt; 24h</span></div>
          <div className="tele-row"><span className="k">PREFERRED</span><span className="v">Email / LinkedIn</span></div>
        </div>

        <div className="panel reveal d2">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cf-name">NAME</label>
              <input id="cf-name" type="text" name="name" placeholder="your name" required disabled={submitting} />
            </div>
            <div className="field">
              <label htmlFor="cf-email">EMAIL</label>
              <input id="cf-email" type="email" name="email" placeholder="your@email.com" required disabled={submitting} />
            </div>
            <div className="field">
              <label htmlFor="cf-message">MESSAGE</label>
              <textarea id="cf-message" name="message" placeholder="what are you building?" rows={5} required disabled={submitting} />
            </div>
            <div className="submit-row">
              <button type="submit" className="btn btn-primary" disabled={submitting || submitted}>
                {submitted ? 'TRANSMITTED ✓' : submitting ? 'SENDING...' : 'SEND MESSAGE'}
                {!submitted && !submitting && <span className="arrow">↗</span>}
              </button>
              <div className={`submit-status${submitted ? ' show' : ''}`}>
                Packet delivered — expect a reply within 24h
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="contact-foot">
        <a className="contact-link reveal d1" href="mailto:mohamedabu.basith@gmail.com">
          <span className="k">EMAIL</span>
          <span className="v">mohamedabu.basith@gmail.com</span>
        </a>
        <a className="contact-link reveal d2" href="https://github.com/mohamedabubasith" target="_blank" rel="noopener noreferrer">
          <span className="k">GITHUB</span>
          <span className="v">github.com/mohamedabubasith</span>
        </a>
        <a className="contact-link reveal d3" href="https://www.linkedin.com/in/mohamedabubasith" target="_blank" rel="noopener noreferrer">
          <span className="k">LINKEDIN</span>
          <span className="v">in/mohamedabubasith</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
