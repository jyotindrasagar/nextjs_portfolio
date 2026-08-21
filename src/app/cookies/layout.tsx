import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cookie Policy & Preferences | DieabloFX",
  description: "Manage cookie preferences, privacy tokens, and telemetry settings for DieabloFX.",
  alternates: {
    canonical: "https://dieablo.com/cookies",
  },
  openGraph: {
    title: "Cookie Policy & Preferences | DieabloFX",
    description: "Manage cookie preferences, privacy tokens, and telemetry settings for DieabloFX.",
    url: "https://dieablo.com/cookies",
    siteName: "DieabloFX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy & Preferences | DieabloFX",
    description: "Manage cookie preferences, privacy tokens, and telemetry settings for DieabloFX.",
    creator: "@dieablofx",
    site: "@dieablofx",
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
