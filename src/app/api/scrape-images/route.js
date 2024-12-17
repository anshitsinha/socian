// src/app/api/scrape-images/route.js
import axios from 'axios';
import { load } from 'cheerio';
import url from 'url';

export async function GET() {
  try {
    const response = await axios.get('https://jnu.ac.in/index.php/iha-gallery');
    const $ = load(response.data);

    // Log the HTML content to debug
    console.log(response.data); // You can inspect the raw HTML structure

    // Extract image URLs
    const imageUrls = [];
    $('img').each((index, element) => {
      let src = $(element).attr('src');
      if (src) {
        // Handle relative URLs by converting them to absolute URLs
        if (!src.startsWith('http')) {
          const baseUrl = 'https://jnu.ac.in'; // The base URL for relative paths
          src = url.resolve(baseUrl, src);  // Resolve the full URL
        }
        imageUrls.push(src);
      }
    });

    console.log('Extracted Images:', imageUrls); // Log the extracted image URLs

    return new Response(JSON.stringify({ images: imageUrls }), { status: 200 });
  } catch (error) {
    console.error('Error scraping images:', error);
    return new Response('Error fetching images', { status: 500 });
  }
}
