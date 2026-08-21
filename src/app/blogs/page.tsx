import type { Metadata } from 'next';
import { BlogsClient } from './BlogsClient';

export const metadata: Metadata = {
  title: "DieabloFX Blog | VFX, Motion Design, 3D & Video Editing",
  description: "Explore the DieabloFX blog featuring project breakdowns, VFX workflows, motion design, 3D animation, video editing, CGI and creative insights.",
  alternates: {
    canonical: "https://dieablo.com/blogs",
  },
  openGraph: {
    title: "DieabloFX Blog | VFX, Motion Design, 3D & Video Editing",
    description: "Explore the DieabloFX blog featuring project breakdowns, VFX workflows, motion design, 3D animation, video editing, CGI and creative insights.",
    url: "https://dieablo.com/blogs",
    siteName: "DieabloFX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://dieablo.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "DieabloFX Blog | VFX, Motion Design, 3D & Video Editing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DieabloFX Blog | VFX, Motion Design, 3D & Video Editing",
    description: "Explore the DieabloFX blog featuring project breakdowns, VFX workflows, motion design, 3D animation, video editing, CGI and creative insights.",
    creator: "@dieablofx",
    site: "@dieablofx",
    images: ["https://dieablo.com/twitter-image.jpg"],
  },
};

const blogsPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://dieablo.com/blogs#webpage",
  "name": "DieabloFX Blog | VFX, Motion Design, 3D & Video Editing",
  "description": "Explore the DieabloFX blog featuring project breakdowns, VFX workflows, motion design, 3D animation, video editing, CGI and creative insights.",
  "url": "https://dieablo.com/blogs",
  "isPartOf": {
    "@id": "https://dieablo.com/#website"
  },
  "about": {
    "@id": "https://dieablo.com/#brand"
  },
  "author": {
    "@id": "https://dieablo.com/#person"
  },
  "publisher": {
    "@id": "https://dieablo.com/#brand"
  }
};

export default function BlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsPageJsonLd) }}
      />
      <BlogsClient />
    </>
  );
}
