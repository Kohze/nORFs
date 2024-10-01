import '../globals.css'
import { Header, Footer } from '@/components/Layout'

export const metadata = {
  title: 'nORFs.org Platform | Novel Open Reading Frames Database',
  description: 'Explore curated products from novel open reading frames (nORFs). A comprehensive database for researchers and scientists studying protein-coding sequences.',
  keywords: 'nORFs, novel open reading frames, protein-coding sequences, genomics, bioinformatics, database',
  author: 'nORFs.org Team',
  openGraph: {
    title: 'nORFs.org Platform | Novel Open Reading Frames Database',
    description: 'Explore curated products from novel open reading frames (nORFs). A comprehensive database for researchers and scientists.',
    type: 'website',
    url: 'https://nORFs.org',
    image: '/og-image.jpg', // Ensure this image exists in your public folder
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nORFs.org Platform | Novel Open Reading Frames Database',
    description: 'Explore curated products from novel open reading frames (nORFs). A comprehensive database for researchers and scientists.',
    image: '/twitter-image.jpg', // Ensure this image exists in your public folder
  },
}

export default function DashboardRootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
