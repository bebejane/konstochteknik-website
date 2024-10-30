import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Konst & Teknik',
    short_name: 'Konst & Teknik',
    description: 'Konst & Teknik is a digital design studio based in Stockholm, founded in 2006 by Mattias Jakobsson and Peter Ström.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}