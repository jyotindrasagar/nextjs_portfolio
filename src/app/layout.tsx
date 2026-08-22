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
  description: "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, a Video Editor and Motion Designer specializing in commercial editing, motion graphics, 3D animation, VFX and visual storytelling under the creative brand DieabloFX.",
  authors: [{ name: "Jyotindra Narayan Kalyani (Dieablo)", url: "https://dieablo.com" }],
  creator: "DieabloFX",
  publisher: "DieabloFX",
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
    canonical: "https://dieablo.com"
  },
  openGraph: {
    title: "DieabloFX | Video Editor, Motion Designer & VFX Artist",
    description: "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, showcasing video editing, motion design, 3D animation, VFX and visual storytelling under the personal creative brand DieabloFX.",
    url: "https://dieablo.com",
    siteName: "DieabloFX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://dieablo.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "DieabloFX | Video Editor, Motion Designer & VFX Artist",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DieabloFX | Video Editor, Motion Designer & VFX Artist",
    description: "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, showcasing video editing, motion design, 3D animation, VFX and visual storytelling under the personal creative brand DieabloFX.",
    creator: "@dieablofx",
    site: "@dieablofx",
    images: ["https://dieablo.com/twitter-image.jpg"]
  },
};

const socialProfiles = [
  "https://instagram.com/dieablofx",
  "https://x.com/dieablofx",
  "https://youtube.com/@dieablofx",
  "https://www.linkedin.com/in/dieablofx",
  "https://www.behance.net/dieablofx",
  "https://www.pinterest.com/dieablofx"
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
      "image": "https://dieablo.com/opengraph-image.jpg",
      "description": "DieabloFX is the personal creative brand of Jyotindra Narayan Kalyani, professionally known as Dieablo, specializing in video editing, motion design, 3D animation, VFX, compositing and visual storytelling.",
      "sameAs": socialProfiles
    },

    {
      "@type": "Person",
      "@id": "https://dieablo.com/#person",
      "name": "Jyotindra Narayan Kalyani",
      "alternateName": [
        "Dieablo",
        "DieabloFX"
      ],
      "url": "https://dieablo.com/",
      "image": "https://dieablo.com/opengraph-image.jpg",
      "sameAs": socialProfiles,
      "jobTitle": [
        "Video Editor",
        "Motion Designer",
        "3D Motion Designer",
        "VFX Artist",
        "Creative Director"
      ],
      "description": "Jyotindra Narayan Kalyani, professionally known as Dieablo, is a Video Editor and Motion Designer working under the personal creative brand DieabloFX, specializing in video editing, motion design, 3D animation, VFX, compositing and visual storytelling.",
      "knowsAbout": [
        "Video Editing",
        "Motion Design",
        "Motion Graphics",
        "3D Animation",
        "Visual Effects",
        "VFX",
        "Compositing",
        "CGI",
        "Creative Direction",
        "Visual Storytelling"
      ],
      "brand": {
        "@id": "https://dieablo.com/#brand"
      }
    },

    {
      "@type": "WebSite",
      "@id": "https://dieablo.com/#website",
      "url": "https://dieablo.com/",
      "name": "DieabloFX",
      "alternateName": "DieabloFX Portfolio",
      "description": "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, showcasing video editing, motion design, 3D animation, VFX and visual storytelling under the personal creative brand DieabloFX.",
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
      "description": "Official portfolio of Jyotindra Narayan Kalyani, professionally known as Dieablo, featuring video editing, motion design, 3D animation, VFX, and visual storytelling under the personal creative brand DieabloFX.",
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
    <html lang="en" className="scrollbar-hide" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (supportDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
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
