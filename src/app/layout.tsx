import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0E1014",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://dieablo.com'),
  title: "DieabloFX | Creative Director, Motion Designer & VFX Artist",
  description: "Portfolio of DieabloFX — Creative Director, Video Editor, Motion Designer, VFX Artist, and 3D Animator specializing in complex animations and visual storytelling.",
  keywords: ["dieablofx", "dieablo fx", "dieablo", "creative director", "motion designer", "video editor", "vfx artist", "3d motion designer", "animation", "visual storytelling"],
  authors: [{ name: "DieabloFX" }],
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
    title: "DieabloFX | Creative Director & Motion Designer",
    description: "Portfolio of DieabloFX — Creative Director, Video Editor, Motion Designer, and VFX Artist.",
    url: "https://dieablo.com/",
    siteName: "DieabloFX",
    images: [
      {
        url: "/og-image.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DieabloFX | Creative Director & Motion Designer",
    description: "Portfolio of DieabloFX — Creative Director, Video Editor, Motion Designer, and VFX Artist.",
    creator: "@dieablofx",
    site: "@dieablofx",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://dieablo.com/#person",
      "name": "Jyotindra Narayankalyani",
      "alternateName": ["Dieablo", "DieabloFX"],
      "url": "https://dieablo.com",
      "sameAs": [
        "https://instagram.com/dieablofx",
        "https://x.com/dieablofx",
        "https://youtube.com/@dieablofx",
        "https://www.linkedin.com/in/dieablofx",
        "https://behance.net/dieablofx",
        "https://pinterest.com/dieablofx"
      ],
      "jobTitle": ["Creative Director", "Motion Designer", "Video Editor", "VFX Artist", "3D Motion Designer"],
      "description": "DieabloFX is a Creative Director, Video Editor, and Motion Designer specializing in VFX and 3D Motion Design.",
      "knowsAbout": ["Video Editing", "Motion Design", "Visual Effects (VFX)", "3D Animation", "Creative Direction", "Visual Storytelling"]
    },
    {
      "@type": "Organization",
      "@id": "https://dieablo.com/#organization",
      "name": "DieabloFX",
      "url": "https://dieablo.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dieablo.com/dieablofx.svg"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://dieablo.com/#website",
      "url": "https://dieablo.com",
      "name": "DieabloFX Portfolio",
      "description": "Portfolio of DieabloFX — Creative Director and Motion Designer",
      "publisher": {
        "@id": "https://dieablo.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://dieablo.com/#webpage",
      "url": "https://dieablo.com",
      "name": "DieabloFX | Creative Director & Motion Designer",
      "about": {
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
    <html lang="en" className="dark scrollbar-hide">
      <head>
        <link rel="icon" type="image/svg+xml" href="/dieablofx.svg" />
        <link rel="apple-touch-icon" href="/dieablofx.svg" />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async defer></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
