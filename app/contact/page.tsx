
const contactItems = [
  {
    label: "Ibadan: No 2 Akinboade Close, Agodi GRA",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Oyo: Opposite Alawe Palace, Isaale Alawe First Bank Road",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "teensfootballproject@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "+234 800 000 0000",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.01 21 3 13.99 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
      </svg>
    ),
  },
  {
    label: "Mon - Sat: 8:00 AM - 5:00 PM",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-800 bg-[#1a1a1a] p-3 font-sans text-sm text-white placeholder-gray-500 transition-colors focus:border-primary focus:outline-none";

const labelClass = "mb-2 block font-sans text-sm text-white/80";

export default function ContactPage() {
  return (
    <main>

      {/* Section 1: Hero Banner */}
      <section
        className="relative flex min-h-[40vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/contact-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-7xl">
            GET IN TOUCH
          </h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/60 md:text-base">
            Book a trial, ask a question, or partner with us. We&apos;re always open.
          </p>
        </div>
      </section>

      {/* Section 2: Contact Info + Form */}
      <section className="bg-[#010101] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

          {/* Left: Contact Info */}
          <div>
            <h2 className="font-display text-3xl leading-none text-white">
              CONTACT INFORMATION
            </h2>
            <div className="mt-4 mb-8 h-1 w-12 bg-primary" />

            <ul className="flex flex-col gap-6">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="text-primary">{item.icon}</span>
                  <span className="font-sans text-sm text-white">{item.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="mb-4 font-sans text-sm text-muted">Follow Us</p>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:border-primary hover:bg-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="TFP Location — Oyo State, Nigeria"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.7470%2C7.2775%2C4.1470%2C7.4775&layer=mapnik&marker=7.3775%2C3.9470"
                width="100%"
                height="280"
                loading="lazy"
                className="block grayscale"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="rounded-2xl bg-[#0d0d0d] p-8">
            <form className="flex flex-col gap-5">

              <div>
                <label htmlFor="name" className={labelClass}>Full Name</label>
                <input id="name" type="text" placeholder="e.g. Emeka Johnson" className={inputClass} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email Address</label>
                <input id="email" type="email" placeholder="you@example.com" className={inputClass} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input id="phone" type="text" placeholder="+234 800 000 0000" className={inputClass} />
              </div>

              <div>
                <label htmlFor="ageGroup" className={labelClass}>Age Group</label>
                <select id="ageGroup" className={inputClass}>
                  <option value="" disabled>Select an option</option>
                  <option value="u13">U13 Grassroots</option>
                  <option value="u16">U16 Rising Players</option>
                  <option value="u19">U19 Elite &amp; Exposure</option>
                  <option value="general">General Enquiry</option>
                  <option value="sponsorship">Sponsorship</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us how we can help..."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-primary py-4 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
        </div>
      </section>

    </main>
  );
}
