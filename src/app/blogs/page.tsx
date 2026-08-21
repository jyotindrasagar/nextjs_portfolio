import type { Metadata } from 'next';
import { BlogsClient } from './BlogsClient';

export const metadata: Metadata = {
  title: "Articles, Case Studies & VFX Breakdowns | DieabloFX",
  description: "Explore in-depth case studies, VFX breakdowns, 3D motion design workflows, and video editing insights by Dieablo (DieabloFX).",
  alternates: {
    canonical: "https://dieablo.com/blogs",
  },
  openGraph: {
    title: "Articles, Case Studies & VFX Breakdowns | DieabloFX",
    description: "Explore in-depth case studies, VFX breakdowns, 3D motion design workflows, and video editing insights by Dieablo (DieabloFX).",
    url: "https://dieablo.com/blogs",
    siteName: "DieabloFX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles, Case Studies & VFX Breakdowns | DieabloFX",
    description: "Explore in-depth case studies, VFX breakdowns, 3D motion design workflows, and video editing insights by Dieablo (DieabloFX).",
    creator: "@dieablofx",
    site: "@dieablofx",
  },
};

const blogsPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://dieablo.com/blogs#webpage",
  "name": "Articles, Case Studies & VFX Breakdowns | DieabloFX",
  "description": "Explore in-depth case studies, VFX breakdowns, 3D motion design workflows, and video editing insights by Dieablo (DieabloFX).",
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
