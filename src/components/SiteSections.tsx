import { BrandMark } from '@/components/BrandMark';
import { PhoneGarden } from '@/components/PhoneGarden';
import {
  company,
  faqs,
  features,
  hero,
  navigation,
  plans,
  pricingNote,
  privacyFacts,
  privacyUrl,
  tensions,
  termsUrl,
} from '@/content/site';

function SproutGlyph() {
  return (
    <svg aria-hidden="true" className="sprout-glyph" viewBox="0 0 64 64">
      <path d="M32 56V26m0 8C21 34 15 28 13 17c10.5-.4 17 5 19 17Zm0-9c9.7-.5 15.8-5.4 19-14-9.5-.5-16 4.1-19 14Z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <a aria-label="HeadGarden home" className="site-header__brand" href="#top">
        <BrandMark />
      </a>
      <nav aria-label="Primary" className="site-header__nav">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <span className="status-chip">Prelaunch</span>
    </header>
  );
}

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="hero" id="top">
      <div aria-hidden="true" className="hero__seed-lines">
        <span />
        <span />
        <span />
      </div>
      <div className="hero__copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title">
          Small practices.
          <span>A steadier day.</span>
        </h1>
        <p className="hero__body">{hero.body}</p>
        <div className="hero__actions">
          <span className="status-action">{hero.status}</span>
          <a className="text-action" href="#practices">
            {hero.secondaryAction}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="boundary-note">{hero.boundary}</p>
      </div>
      <div className="hero__preview">
        <PhoneGarden />
      </div>
    </section>
  );
}

export function TensionSection() {
  return (
    <section aria-labelledby="tension-title" className="tension-section">
      <div className="section-heading section-heading--wide">
        <p className="eyebrow">Start small</p>
        <h2 id="tension-title">When the day feels noisy, begin with one thing.</h2>
      </div>
      <div className="tension-grid">
        {tensions.map((item) => (
          <article className="tension-card" key={item.eyebrow}>
            <span className="tension-card__mark" />
            <p className="card-eyebrow">{item.eyebrow}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GrowthSection() {
  return (
    <section aria-labelledby="growth-title" className="growth-section" id="practices">
      <div className="growth-section__intro">
        <p className="eyebrow eyebrow--dark">How HeadGarden grows</p>
        <h2 id="growth-title">A practice, a rhythm, a place to reflect.</h2>
        <p>
          Choose what fits the moment. Nothing here asks you to perform a better
          version of your day.
        </p>
      </div>
      <div className="growth-list">
        {features.map((feature) => (
          <article className="growth-card" key={feature.eyebrow}>
            <div className="growth-card__glyph">
              <SproutGlyph />
            </div>
            <div>
              <p className="card-eyebrow">{feature.eyebrow}</p>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PreviewSection() {
  return (
    <section aria-labelledby="preview-title" className="preview-section">
      <div className="section-heading">
        <p className="eyebrow">Inside the garden</p>
        <h2 id="preview-title">Quiet structure, without the pressure.</h2>
        <p>
          A safe illustrative preview using only HeadGarden-authored words and
          shapes.
        </p>
      </div>
      <div className="preview-shelf">
        <article className="preview-card preview-card--today">
          <div className="preview-card__chrome">
            <span>Today</span>
            <span aria-hidden="true">•••</span>
          </div>
          <div className="preview-card__sun" />
          <p className="card-eyebrow">Your next small thing</p>
          <h3>Two-minute reset</h3>
          <p>A brief guided pause, ready when you are.</p>
          <span className="preview-card__button">Open practice</span>
        </article>
        <article className="preview-card preview-card--program">
          <div className="preview-card__chrome">
            <span>Program</span>
            <span>Day 2 of 5</span>
          </div>
          <div className="preview-card__steps" aria-hidden="true">
            <span className="is-complete" />
            <span className="is-current" />
            <span />
            <span />
            <span />
          </div>
          <p className="card-eyebrow">A gentle sequence</p>
          <h3>A quieter evening</h3>
          <p>Build a rhythm one optional step at a time.</p>
        </article>
        <article className="preview-card preview-card--orb">
          <div className="preview-card__chrome">
            <span>Orb</span>
            <span>Reflection</span>
          </div>
          <div className="preview-card__orb" aria-hidden="true">
            <SproutGlyph />
          </div>
          <h3>What would feel supportive next?</h3>
          <p>A bounded prompt for your own reflection, not professional advice.</p>
        </article>
      </div>
    </section>
  );
}

export function PrivacySection() {
  return (
    <section aria-labelledby="privacy-title" className="privacy-section" id="privacy">
      <div className="privacy-section__mark" aria-hidden="true">
        <span className="privacy-section__ring" />
        <BrandMark compact />
      </div>
      <div className="privacy-section__copy">
        <p className="eyebrow eyebrow--dark">Local-first by design</p>
        <h2 id="privacy-title">Your garden does not need an account.</h2>
        <p className="privacy-section__lead">
          HeadGarden keeps progress close, asks before optional access, and
          separates general-wellness context from advertising and measurement.
        </p>
        <ul className="privacy-list">
          {privacyFacts.map((fact) => (
            <li key={fact}>
              <span aria-hidden="true">✓</span>
              {fact}
            </li>
          ))}
        </ul>
        <a className="text-action text-action--dark" href={privacyUrl}>
          Read the full Privacy Policy
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export function PlansSection() {
  return (
    <section aria-labelledby="plans-title" className="plans-section" id="plans">
      <div className="section-heading section-heading--centered">
        <p className="eyebrow">Plans at launch</p>
        <h2 id="plans-title">Begin free. Grow when it feels useful.</h2>
        <p>Clear choices, managed through Apple, with no purchase button before launch.</p>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <article
            className={`plan-card${plan.name === 'Yearly Premium' ? ' plan-card--featured' : ''}`}
            key={plan.name}
          >
            {plan.name === 'Yearly Premium' && (
              <span className="plan-card__flag">3 days when eligible</span>
            )}
            <p className="card-eyebrow">{plan.name}</p>
            <p className="plan-card__price">
              <strong>{plan.price}</strong>
              <span>{plan.cadence}</span>
            </p>
            <p className="plan-card__detail">{plan.detail}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="pricing-note">{pricingNote}</p>
    </section>
  );
}

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="faq-section" id="faq">
      <div className="faq-section__heading">
        <p className="eyebrow">Good to know</p>
        <h2 id="faq-title">Questions before the first seed.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalPanel() {
  return (
    <section aria-labelledby="final-title" className="final-panel">
      <div aria-hidden="true" className="final-panel__contour" />
      <BrandMark compact />
      <p className="eyebrow eyebrow--dark">A calm beginning</p>
      <h2 id="final-title">One small practice can be enough for today.</h2>
      <p>HeadGarden is preparing for the App Store.</p>
      <span className="status-action status-action--light">{hero.status}</span>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <BrandMark />
        <p>General wellness for adults 18+. Not medical care.</p>
      </div>
      <div className="site-footer__links">
        <a href={termsUrl}>Terms</a>
        <a href={privacyUrl}>Privacy</a>
        <a href="https://codeobscura.com/">CodeObscura</a>
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </div>
      <address className="site-footer__company">
        <strong>{company.name}</strong>
        <span>Company number {company.number}</span>
        <span>{company.registration}</span>
        <span>Registered office: {company.office}</span>
      </address>
      <p className="site-footer__copyright">
        © {new Date().getUTCFullYear()} {company.name}
      </p>
    </footer>
  );
}
