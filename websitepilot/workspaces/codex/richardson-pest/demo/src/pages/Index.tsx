import { Helmet } from "react-helmet-async";

const phone = "602-380-8869";
const tel = "tel:6023808869";
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const services = [
  {
    title: "Scorpion Control",
    kicker: "Arizona bark scorpion focus",
    copy: "Built around wall void flushing, cinder-block wall treatment, and regular prevention for the pest Richardson is known for controlling."
  },
  {
    title: "Termite Treatment",
    kicker: "Trenching and drilling",
    copy: "Specialty termite treatment for East Valley homes where fast identification and consistent follow-up matter."
  },
  {
    title: "General Pest Control",
    kicker: "Roaches, crickets, ants, spiders",
    copy: "Exterior and interior treatments are planned around the issues at your home, with interior service available at no extra charge."
  },
  {
    title: "Mosquito and Bee Treatment",
    kicker: "Outdoor comfort",
    copy: "Residential mosquito spray and fog service plus bee treatment for Arizona properties."
  },
  {
    title: "Roof-Rat Treatment",
    kicker: "Quiet problems, serious damage",
    copy: "Targeted service for roof-rat issues in Mesa, Gilbert, Chandler, and surrounding communities."
  },
  {
    title: "Weed Control",
    kicker: "Yard protection",
    copy: "Weed control is now offered alongside pest service for homeowners who want the whole exterior under control."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Home Evaluation",
    copy: "A technician walks the property, listens to the issues you are seeing, and builds the treatment plan around your home."
  },
  {
    number: "02",
    title: "Pest Control Service",
    copy: "General pest service includes exterior wall void flush out, cinder-block wall void treatment, and vegetation-base spraying."
  },
  {
    number: "03",
    title: "Regular Exterminating",
    copy: "Richardson recommends every-other-month service because controlling pests, especially scorpions, is a process."
  }
];

const serviceAreas = [
  "Chandler",
  "Gilbert",
  "Queen Creek",
  "Mesa",
  "Tempe",
  "San Tan Valley",
  "Scottsdale",
  "Ahwatukee",
  "Sun Lakes",
  "Gold Canyon",
  "Apache Junction"
];

const trustItems = [
  "Father-son owned and operated",
  "Same-day exterminating now available",
  "Open Saturdays 9:00am-2:00pm",
  "Licensed Arizona pest control, #9626"
];

const Index = () => {
  return (
    <div className="rpm-page">
      <Helmet>
        <title>Richardson Pest Management | Same-Day East Valley Pest Control</title>
        <meta
          name="description"
          content="Same-day pest control from Richardson Pest Management, a father-son East Valley team specializing in scorpions, termites, and family-first pest protection."
        />
      </Helmet>

      <header className="site-header" aria-label="Richardson Pest Management navigation">
        <a className="brand-lockup" href="#top" aria-label="Richardson Pest Management home">
          <img src={asset("assets/rpm/logo-full-color.png")} alt="Richardson Pest Management logo" />
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#story">Why RPM</a>
          <a href="#areas">Areas</a>
        </nav>
        <a className="header-call" href={tel}>
          <span>Call or text</span>
          {phone}
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-bg" aria-hidden="true">
            <img
              src={asset("assets/rpm/02-queen-creek-pest-control-companies-spraying-house-rpm-orig.jpg")}
              alt=""
            />
          </div>
          <div className="stinger-grid" aria-hidden="true" />
          <div className="hero-shell">
            <div className="hero-copy">
              <p className="eyebrow">East Valley scorpion and termite specialists</p>
              <h1>Same-day pest control for families who need their home back.</h1>
              <p className="hero-lede">
                Richardson Pest Management is a local father-son team built around one promise:
                protect your little ones from scorpions and the pests Arizona homes fight every season.
              </p>
              <div className="hero-actions" aria-label="Primary actions">
                <a className="btn btn-primary" href={tel}>
                  Call {phone}
                </a>
                <a className="btn btn-secondary" href="#quote">
                  Request service
                </a>
              </div>
              <div className="proof-strip" aria-label="Trust highlights">
                {trustItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <aside className="hero-card" aria-label="Service promise">
              <img src={asset("assets/rpm/logo-circle.png")} alt="RPM scorpion badge" />
              <p className="card-kicker">A safer home starts outside the walls</p>
              <h2>Wall void flush. Cinder-block treatment. Regular prevention.</h2>
              <p>
                RPM treats the places scorpions and insects hide, then keeps pressure on them with
                every-other-month service.
              </p>
            </aside>
          </div>
        </section>

        <section className="quick-intake" id="quote" aria-label="Request pest control service">
          <div>
            <p className="eyebrow dark">Same-day exterminating now available</p>
            <h2>Tell Richardson what is bothering you most.</h2>
          </div>
          <form className="mini-form">
            <label>
              Pest issue
              <select defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option>Scorpions</option>
                <option>Termites</option>
                <option>Roaches</option>
                <option>Ants</option>
                <option>Mosquitoes</option>
                <option>Roof rats</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              ZIP code
              <input type="text" inputMode="numeric" placeholder="852..." />
            </label>
            <label>
              Phone or email
              <input type="text" placeholder="Best way to reach you" />
            </label>
            <a className="btn btn-form" href={tel}>
              Call instead
            </a>
          </form>
        </section>

        <section className="story-band" id="story">
          <div className="story-photo">
            <img
              src={asset("assets/rpm/10-chase-richardson-spraying-house-orig.jpg")}
              alt="Richardson Pest Management technician treating a home"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">Why this company exists</p>
            <h2>Started after a scorpion sent a 2-year-old to the hospital.</h2>
            <p>
              The Richardson story is personal. Nelson Richardson started RPM after his young
              daughter was stung by a scorpion and had a severe reaction. That fear became the
              company's mission: give Arizona families peace of mind inside their own homes.
            </p>
            <div className="story-callout">
              "No one else will treat you like family" is not filler copy here. It is the operating
              idea behind the service.
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>Built for the pests East Valley homes actually deal with.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <span>{service.kicker}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="method-section" id="process">
          <div className="method-intro">
            <p className="eyebrow">What to expect</p>
            <h2>Not a quick spray. A repeatable protection system.</h2>
            <p>
              Richardson explains pest control as a process, not an event. The demo brings that
              difference forward so homeowners understand why regular service matters.
            </p>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="safety-section">
          <div className="safety-copy">
            <p className="eyebrow dark">Safety first</p>
            <h2>Designed to protect the family, pets, and the home.</h2>
            <p>
              RPM says its products are safe for children, pets, and the environment once dried.
              The site identifies the products as pyrethrins, organically derived and labeled for
              use around schools, animal shelters, and hospitals.
            </p>
          </div>
          <div className="safety-list" aria-label="Safety highlights">
            <span>Pet friendly pest control</span>
            <span>Child-conscious treatment plan</span>
            <span>Interior treatments available</span>
            <span>Return visits between regular services</span>
          </div>
        </section>

        <section className="areas-section" id="areas">
          <div className="areas-copy">
            <p className="eyebrow">Service area</p>
            <h2>Local to the Arizona East Valley.</h2>
          </div>
          <div className="area-chips">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div>
            <p className="eyebrow">Emergency bug exterminator</p>
            <h2>Need relief today?</h2>
            <p>
              Call Richardson Pest Management for same-day exterminating availability, Saturday
              hours, and a family-owned team that treats your concerns like their own.
            </p>
          </div>
          <a className="btn btn-primary" href={tel}>
            Call {phone}
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <img src={asset("assets/rpm/logo-full-color.png")} alt="Richardson Pest Management" />
        <p>
          Professional pest control and exterminator in Chandler, Gilbert, Queen Creek, Mesa,
          Tempe, San Tan Valley, Scottsdale, Ahwatukee, Sun Lakes, Gold Canyon, and Apache
          Junction.
        </p>
        <p>Office Hours: Monday-Friday 9:00am-5:00pm. Saturdays 9:00am-2:00pm.</p>
        <p>License #9626</p>
      </footer>

      <a className="mobile-call" href={tel}>
        Call Richardson: {phone}
      </a>
    </div>
  );
};

export default Index;
