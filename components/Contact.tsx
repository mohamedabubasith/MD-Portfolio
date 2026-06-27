import React, { useState } from 'react';
import CardTicks from './CardTicks';

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
    <section className="section" id="contact">
      <div className="bento contact-bento">
        <div className="bento-head-card reveal">
          <div className="section-head">
            <div>
              <div className="section-label"><span className="num">/06</span> CHANNEL</div>
              <h2 className="section-title">
                Let's <em>build</em> something.
              </h2>
            </div>
            <div className="section-meta">
              <div>SECTION 06 / 06</div>
              <div style={{ marginTop: 6 }}>// COMM LINK</div>
            </div>
          </div>
        </div>

        <div className="bento-card is-data contact-aside col-5 reveal d1">
          <CardTicks />
          <p className="contact-intro">
            I'm open to interesting AI engineering problems, consulting on LLM infrastructure,
            and conversations about building things that actually ship. Drop a message — I read
            everything and reply within 24h.
          </p>
          <div className="bento-card-head">
            <span>STATUS</span>
            <span className="live">OPEN</span>
          </div>
          <div className="tele-row"><span className="k">AVAILABILITY</span><span className="v good">Open to consult</span></div>
          <div className="tele-row"><span className="k">TIMEZONE</span><span className="v">IST (UTC+5:30)</span></div>
          <div className="tele-row"><span className="k">RESPONSE TIME</span><span className="v">&lt; 24h</span></div>
          <div className="tele-row"><span className="k">PREFERRED</span><span className="v">Email / LinkedIn</span></div>
        </div>

        <div className="bento-card is-feature contact-form-card col-7 reveal d2">
          <CardTicks />
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

        <div className="contact-foot">
          <a className="contact-link reveal d1" href="mailto:mohamedabu.basith@gmail.com">
            <CardTicks />
            <span className="k">EMAIL</span>
            <span className="v">mohamedabu.basith@gmail.com</span>
          </a>
          <a className="contact-link reveal d2" href="https://github.com/mohamedabubasith" target="_blank" rel="noopener noreferrer">
            <CardTicks />
            <span className="k">GITHUB</span>
            <span className="v">github.com/mohamedabubasith</span>
          </a>
          <a className="contact-link reveal d3" href="https://www.linkedin.com/in/mohamedabubasith" target="_blank" rel="noopener noreferrer">
            <CardTicks />
            <span className="k">LINKEDIN</span>
            <span className="v">in/mohamedabubasith</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
