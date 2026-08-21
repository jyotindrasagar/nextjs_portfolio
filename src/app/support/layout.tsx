import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Support & Help Center | DieabloFX",
  description: "Official Support & Help Center for DieabloFX — submit project commission inquiries, licensing requests, and technical tickets directly to hello@dieablo.com.",
  alternates: {
    canonical: "https://dieablo.com/support",
  },
  openGraph: {
    title: "Support & Help Center | DieabloFX",
    description: "Official Support & Help Center for DieabloFX — submit project commission inquiries, licensing requests, and technical tickets directly to hello@dieablo.com.",
    url: "https://dieablo.com/support",
    siteName: "DieabloFX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Support & Help Center | DieabloFX",
    description: "Official Support & Help Center for DieabloFX — submit project commission inquiries, licensing requests, and technical tickets directly to hello@dieablo.com.",
    creator: "@dieablofx",
    site: "@dieablofx",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
