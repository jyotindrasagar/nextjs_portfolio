import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Account Recovery | DieabloFX",
  description: "Request an authentication passcode or account recovery for DieabloFX.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
