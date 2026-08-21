import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "System Maintenance | DieabloFX",
  description: "DieabloFX is currently undergoing scheduled infrastructure maintenance and render engine calibrations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
