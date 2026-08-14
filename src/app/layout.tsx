import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const display = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ['400', '500', '600', '700', '800', '900']
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#0F0F10",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://dieablo.com'),
  title: "DieabloFX | Video Editor, Motion Designer & VFX Artist",
  description: "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, featuring motion design, VFX, 3D animation, video editing, creative direction and visual storytelling under the personal creative brand DieabloFX.",
  keywords: ["dieablofx", "dieablo fx", "dieablo", "creative director", "motion designer", "video editor", "vfx artist", "3d motion designer", "animation", "visual storytelling"],
  authors: [{ name: "Jyotindra Narayan Kalyani", url: "https://dieablo.com" }],
  verification: {
    other: {
      "p:domain_verify": "31497cf6913db2b4c2df998f0c0c1faa"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    }
  },
  alternates: {
    canonical: "https://dieablo.com/"
  },
  openGraph: {
    title: "DieabloFX | Video Editor & Motion Designer",
    description: "Official Portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, featuring motion design, VFX, 3D animation & video editing under the personal creative brand DieabloFX.",
    url: "https://dieablo.com/",
    siteName: "DieabloFX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DieabloFX | Video Editor & Motion Designer",
    description: "Portfolio of DieabloFX — Video Editor, Motion Designer, Creative Director, and VFX Artist.",
    creator: "@dieablofx",
    site: "@dieablofx",
  },
};

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "Person",
      "@id": "https://dieablo.com/#person",

      "name": "Jyotindra Narayan Kalyani",

      "alternateName": [
        "Dieablo",
        "DieabloFX"
      ],

      "url": "https://dieablo.com/",

      "sameAs": [
        "https://instagram.com/dieablofx",
        "https://x.com/dieablofx",
        "https://youtube.com/@dieablofx",
        "https://www.linkedin.com/in/dieablofx",
        "https://www.behance.net/dieablofx",
        "https://www.pinterest.com/dieablofx"
      ],

      "jobTitle": [
        "Motion Designer",
        "Video Editor",
        "VFX Artist",
        "3D Motion Designer",
        "Creative Director",
      ],

      "description": "Jyotindra Narayan Kalyani, professionally known as Dieablo, is a  Video Editor, Motion Designer, Creative Director and VFX Artist working under the personal creative brand DieabloFX.",

      "knowsAbout": [
        "Video Editing",
        "Motion Design",
        "Visual Effects (VFX)",
        "3D Animation",
        "Creative Direction",
        "Visual Storytelling",
        "Motion Graphics",
        "Compositing",
        "CGI"
      ],

      "brand": {
        "@id": "https://dieablo.com/#brand"
      }
    },

    {
      "@type": "Brand",
      "@id": "https://dieablo.com/#brand",

      "name": "DieabloFX",

      "alternateName": "Dieablo",

      "url": "https://dieablo.com/",

      "logo": {
        "@type": "ImageObject",
        "url": "https://dieablo.com/dieablofx.svg"
      },

      "description": "DieabloFX is the personal creative brand of Jyotindra Narayan Kalyani, professionally known as Dieablo, specializing in Video Editing, motion design, VFX, 3D animation, Creative Direction and visual storytelling.",

      "founder": {
        "@id": "https://dieablo.com/#person"
      }
    },

    {
      "@type": "WebSite",
      "@id": "https://dieablo.com/#website",

      "url": "https://dieablo.com/",

      "name": "DieabloFX",

      "alternateName": "DieabloFX Portfolio",

      "description": "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, showcasing creative direction, motion design, video editing, VFX, 3D animation and visual storytelling under the personal creative brand DieabloFX.",

      "publisher": {
        "@id": "https://dieablo.com/#person"
      },

      "creator": {
        "@id": "https://dieablo.com/#person"
      },

      "about": {
        "@id": "https://dieablo.com/#brand"
      }
    },

    {
      "@type": "WebPage",
      "@id": "https://dieablo.com/#webpage",

      "url": "https://dieablo.com/",

      "name": "DieabloFX | Video Editor, Motion Designer & VFX Artist",

      "description": "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, featuring motion design, VFX, 3D animation, video editing, creative direction and visual storytelling.",

      "isPartOf": {
        "@id": "https://dieablo.com/#website"
      },

      "about": {
        "@id": "https://dieablo.com/#person"
      },

      "creator": {
        "@id": "https://dieablo.com/#person"
      },

      "publisher": {
        "@id": "https://dieablo.com/#person"
      }
    }

  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scrollbar-hide" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
