export const marketingUrl = 'https://headgarden.codeobscura.com/';
export const termsUrl = 'https://codeobscura.com/headgarden/terms.html';
export const privacyUrl =
  'https://codeobscura.com/headgarden/privacy.html';

export type NavigationItem = Readonly<{
  label: string;
  href: `#${string}`;
}>;

export type ContentCard = Readonly<{
  eyebrow: string;
  title: string;
  body: string;
}>;

export type PlanCard = Readonly<{
  name: string;
  price: string;
  cadence: string;
  detail: string;
  features: readonly string[];
}>;

export type FrequentlyAskedQuestion = Readonly<{
  question: string;
  answer: string;
}>;

export const navigation: readonly NavigationItem[] = [
  { label: 'Practices', href: '#practices' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Plans', href: '#plans' },
  { label: 'FAQ', href: '#faq' },
];

export const hero = {
  eyebrow: 'A private space for everyday wellness',
  title: 'Small practices. A steadier day.',
  body:
    'HeadGarden brings guided practices, gentle routines, progress you can see, and an AI reflection companion into one calm, accountless app for adults 18+.',
  status: 'Coming to the App Store',
  secondaryAction: 'See how it grows',
  boundary: 'General wellness for adults 18+. HeadGarden is not medical care.',
} as const;

export const tensions: readonly ContentCard[] = [
  {
    eyebrow: 'Reset',
    title: 'Make a little room',
    body: 'Start with a short guided practice when the day feels crowded.',
  },
  {
    eyebrow: 'Refocus',
    title: 'Return to one thing',
    body: 'Use a small routine to mark a thoughtful transition.',
  },
  {
    eyebrow: 'Wind down',
    title: 'Close the day gently',
    body: 'Choose a quiet practice and let progress stay pressure-free.',
  },
];

export const features: readonly ContentCard[] = [
  {
    eyebrow: 'Guided practices',
    title: 'Begin where you are',
    body: 'Browse short, clearly structured practices for everyday moments.',
  },
  {
    eyebrow: 'Programs',
    title: 'Grow a rhythm',
    body: 'Follow a sequence over several days, with each step still yours to choose.',
  },
  {
    eyebrow: 'Orb reflection',
    title: 'Put a thought into words',
    body: 'Use a bounded AI reflection companion for general-wellness prompts, never professional advice.',
  },
];

export const privacyFacts = [
  'No consumer account or cloud progress profile.',
  'Progress lives on your device until you remove the app or its data.',
  'Optional Health context is processed transiently and is not sent to ads, attribution, AI, or crash reporting.',
  'Advertising and attribution are consent-gated; ad-free Premium makes no ad requests.',
] as const;

export const plans: readonly PlanCard[] = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'to begin',
    detail: 'Limited free practices with ads only for eligible free use.',
    features: ['A considered starting collection', 'Local progress', 'Privacy choices'],
  },
  {
    name: 'Monthly Premium',
    price: '$9.99',
    cadence: 'per month',
    detail: 'No free trial. Renews automatically until cancelled.',
    features: ['Premium practices and programs', 'Ad-free use', 'Restore Purchases'],
  },
  {
    name: 'Yearly Premium',
    price: '$69.99',
    cadence: 'per year',
    detail:
      'A 3-day free trial is available only when Apple says you are an eligible new subscriber.',
    features: ['Premium practices and programs', 'Ad-free use', 'Restore Purchases'],
  },
];

export const pricingNote =
  'US launch prices are shown. Local storefront pricing may vary. Subscriptions renew automatically until cancelled in App Store settings.';

export const faqs: readonly FrequentlyAskedQuestion[] = [
  {
    question: 'What is HeadGarden?',
    answer:
      'HeadGarden is an adults 18+ general-wellness app for guided practices, gentle programs, local progress, and bounded AI reflection. It is not medical care or an emergency service.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No consumer account is required. Progress and preferences stay local to this installation, so removing the app or losing the device can remove them.',
  },
  {
    question: 'Does HeadGarden use Health data?',
    answer:
      'Only if you choose. Read context and mindful-write permission are separate controls, and completion never depends on a Health write.',
  },
  {
    question: 'What is Orb?',
    answer:
      'Orb is an AI reflection companion for everyday general-wellness prompts. Its responses can be wrong and are not professional advice.',
  },
  {
    question: 'How do subscriptions work?',
    answer:
      'Apple handles billing, eligibility, cancellation, restoration, and refunds. Monthly has no trial; yearly has a 3-day trial only for eligible new subscribers.',
  },
  {
    question: 'When can I download HeadGarden?',
    answer:
      'HeadGarden is preparing for the App Store. This page will link to the verified public listing after launch.',
  },
];

export const company = {
  name: 'OBSCURACODE LTD',
  number: '16120395',
  registration: 'Registered in England and Wales',
  office:
    '3rd Floor, 86-90 Paul Street, London, England, United Kingdom, EC2A 4NE',
  email: 'legal@codeobscura.com',
} as const;
