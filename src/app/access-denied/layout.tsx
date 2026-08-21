import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Access Denied | DieabloFX",
  description: "HTTP 403 Forbidden - Clearance level insufficient for this sector.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccessDeniedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
