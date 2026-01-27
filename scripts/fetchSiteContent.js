const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Pages to fetch content from
const pages = [
  { name: "home", url: "https://vikoofficial.com/" },
  { name: "rules", url: "https://vikoofficial.com/rules" },
  { name: "salary", url: "https://vikoofficial.com/salary" },
  { name: "contact", url: "https://vikoofficial.com/contact" }
];

/**
 * Clean text by removing extra whitespace and special characters
 */
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
}

/**
 * Extract content from a single page
 */
async function fetchPageContent(page) {
  console.log(`Fetching content from: ${page.url}`);
  
  try {
    const response = await axios.get(page.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Remove script and style tags
    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    
    // Extract headings
    const h1Elements = [];
    $('h1').each((i, el) => {
      const text = cleanText($(el).text());
      if (text) h1Elements.push(text);
    });

    const h2Elements = [];
    $('h2').each((i, el) => {
      const text = cleanText($(el).text());
      if (text) h2Elements.push(text);
    });

    const h3Elements = [];
    $('h3').each((i, el) => {
      const text = cleanText($(el).text());
      if (text) h3Elements.push(text);
    });

    // Extract paragraphs
    const paragraphs = [];
    $('p').each((i, el) => {
      const text = cleanText($(el).text());
      if (text && text.length > 10) { // Filter out very short paragraphs
        paragraphs.push(text);
      }
    });

    // Extract list items
    const listItems = [];
    $('li').each((i, el) => {
      const text = cleanText($(el).text());
      if (text && text.length > 3) {
        listItems.push(text);
      }
    });

    // Extract image URLs
    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      const alt = $(el).attr('alt') || '';
      if (src) {
        // Convert relative URLs to absolute
        let imageUrl = src;
        if (src.startsWith('/')) {
          const baseUrl = new URL(page.url);
          imageUrl = `${baseUrl.protocol}//${baseUrl.host}${src}`;
        } else if (!src.startsWith('http')) {
          const baseUrl = new URL(page.url);
          imageUrl = `${baseUrl.protocol}//${baseUrl.host}/${src}`;
        }
        images.push({
          url: imageUrl,
          alt: cleanText(alt)
        });
      }
    });

    // Extract links
    const links = [];
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = cleanText($(el).text());
      if (href && text) {
        links.push({
          url: href,
          text: text
        });
      }
    });

    console.log(`✓ Successfully fetched content from ${page.name}`);
    
    return {
      name: page.name,
      url: page.url,
      h1: h1Elements,
      h2: h2Elements,
      h3: h3Elements,
      paragraphs: paragraphs,
      listItems: listItems,
      images: images,
      links: links,
      fetchedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error(`✗ Error fetching ${page.name}:`, error.message);
    return {
      name: page.name,
      url: page.url,
      error: error.message,
      fetchedAt: new Date().toISOString()
    };
  }
}

/**
 * Main function to fetch all pages
 */
async function fetchAllContent() {
  console.log('🚀 Starting content fetch process...\n');
  
  const results = {
    metadata: {
      fetchedAt: new Date().toISOString(),
      totalPages: pages.length
    },
    pages: {}
  };

  // Fetch content from all pages
  for (const page of pages) {
    const content = await fetchPageContent(page);
    results.pages[page.name] = content;
    
    // Add delay between requests to be respectful
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Ensure data directory exists
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write results to file
  const outputPath = path.join(dataDir, 'rawContent.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  
  console.log(`\n✅ Content fetch complete!`);
  console.log(`📁 Output saved to: ${outputPath}`);
  console.log(`📊 Total pages fetched: ${Object.keys(results.pages).length}`);
  
  // Summary
  console.log('\n📋 Summary:');
  Object.entries(results.pages).forEach(([name, data]) => {
    if (data.error) {
      console.log(`  ✗ ${name}: ERROR - ${data.error}`);
    } else {
      console.log(`  ✓ ${name}: ${data.h1?.length || 0} h1, ${data.h2?.length || 0} h2, ${data.paragraphs?.length || 0} paragraphs`);
    }
  });
}

// Run the script
if (require.main === module) {
  fetchAllContent()
    .then(() => {
      console.log('\n✨ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllContent, fetchPageContent };
