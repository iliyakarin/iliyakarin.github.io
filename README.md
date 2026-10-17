# Iliya Karin - Fractional CTO & AI Infrastructure

Source code for the B2B Consulting and Fractional Executive landing page targeting Seed to Series B startups, VCs, and enterprise leaders.

## Project Overview

- **Purpose**: B2B consulting lead generation and executive advisory.
- **Tech Stack**: [Astro v5](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com).
- **Deployment**: Automatic deployment to GitHub Pages via GitHub Actions.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Architecture & Components

- `src/components/Navigation.astro`: Header navigation with Austin, TX badge, smooth-scrolling links, and CTA button.
- `src/components/Hero.astro`: Above-the-fold value proposition and discovery call CTA.
- `src/components/TrackRecord.astro`: 5-column metric grid highlighting hard business outcomes ($5M+ saved, 64% OpEx cut, SOC2 Type II, 99.99% uptime, team scaling).
- `src/components/Pricing.astro` & `PricingCard.astro`: Productized services (Cloud & AI Audit, Sovereign On-Prem AI & Compliance, Fractional CTO Retainer, Hourly Advisory).
- `src/components/Expertise.astro`: Core technical philosophy (Playing Coach model) and EB-1A extraordinary ability authority block.
- `src/components/Experience.astro`: 15+ years career timeline (Invent, Innotech/VTB Bank, Nokia, Gazprom, Demetra IoT).
- `src/components/Contact.astro`: Direct Calendly booking, WhatsApp, Telegram, LinkedIn, and inquiry form.
- `src/components/Footer.astro`: Footer branding and navigation links.
- `tests/b2b-constraints.test.js`: Automated test suite guarding against dashes, buzzwords, and emojis.
