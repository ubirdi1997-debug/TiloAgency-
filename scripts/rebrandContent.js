const fs = require('fs');
const path = require('path');

/**
 * Transform brand references to Tilo Agency
 */
function rebrandText(text) {
  if (!text) return text;
  
  // Replace common brand references
  return text
    .replace(/viko\s*official/gi, 'Tilo Agency')
    .replace(/viko/gi, 'Tilo')
    .replace(/streamer/gi, 'partner')
    .replace(/streaming/gi, 'digital services')
    .replace(/stream/gi, 'service')
    .replace(/twitch/gi, 'platform')
    .replace(/viewer/gi, 'client')
    .replace(/subscribers?/gi, 'members')
    .replace(/donations?/gi, 'contributions');
}

/**
 * Convert streaming language to agency terminology
 */
function convertToAgencyLanguage(text) {
  if (!text) return text;
  
  const conversions = {
    'streaming platform': 'digital platform',
    'content creator': 'digital creator',
    'live stream': 'live service',
    'broadcast': 'deliver',
    'channel': 'service',
    'followers': 'clients',
    'audience': 'client base'
  };
  
  let converted = text;
  Object.entries(conversions).forEach(([old, newTerm]) => {
    const regex = new RegExp(old, 'gi');
    converted = converted.replace(regex, newTerm);
  });
  
  return converted;
}

/**
 * Shorten long paragraphs for better readability
 */
function shortenParagraph(text, maxLength = 200) {
  if (!text || text.length <= maxLength) return text;
  
  // Try to cut at a sentence boundary
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let result = '';
  
  for (const sentence of sentences) {
    if ((result + sentence).length <= maxLength) {
      result += sentence;
    } else {
      break;
    }
  }
  
  if (!result) {
    result = text.substring(0, maxLength) + '...';
  }
  
  return result.trim();
}

/**
 * Create hero content from page data
 */
function createHeroContent(homeData) {
  const heroTitle = homeData.h1?.[0] 
    ? rebrandText(homeData.h1[0])
    : 'Transform Your Digital Presence with Tilo Agency';
    
  const heroSubtitle = homeData.paragraphs?.[0]
    ? shortenParagraph(convertToAgencyLanguage(rebrandText(homeData.paragraphs[0])), 150)
    : 'We help businesses grow through innovative digital solutions and strategic partnerships.';
    
  return {
    heroTitle,
    heroSubtitle
  };
}

/**
 * Process services from content
 */
function processServices(rawPages) {
  const services = [];
  
  // Extract services from home and salary pages
  const serviceSources = [rawPages.home, rawPages.salary].filter(Boolean);
  
  serviceSources.forEach(page => {
    if (page.h2) {
      page.h2.forEach((heading, index) => {
        const description = page.paragraphs?.[index] 
          ? shortenParagraph(convertToAgencyLanguage(rebrandText(page.paragraphs[index])), 180)
          : '';
          
        if (description) {
          services.push({
            title: rebrandText(heading),
            description: description,
            icon: 'service' // Placeholder for icon reference
          });
        }
      });
    }
  });
  
  // If no services found, create default ones
  if (services.length === 0) {
    services.push(
      {
        title: 'Digital Strategy',
        description: 'Comprehensive digital solutions tailored to your business needs.',
        icon: 'strategy'
      },
      {
        title: 'Partnership Development',
        description: 'Build lasting relationships with key stakeholders and partners.',
        icon: 'partnership'
      },
      {
        title: 'Growth Solutions',
        description: 'Data-driven strategies to accelerate your digital growth.',
        icon: 'growth'
      }
    );
  }
  
  return services;
}

/**
 * Process rules/policies content
 */
function processRules(rulesData) {
  if (!rulesData || rulesData.error) {
    return {
      title: 'Terms & Policies',
      sections: [
        {
          heading: 'General Terms',
          content: 'Please refer to our terms and conditions for detailed information.'
        }
      ]
    };
  }
  
  const sections = [];
  
  // Process each h2 as a section
  if (rulesData.h2) {
    rulesData.h2.forEach((heading, index) => {
      const content = [];
      
      // Get related paragraphs
      if (rulesData.paragraphs && rulesData.paragraphs[index]) {
        content.push(convertToAgencyLanguage(rebrandText(rulesData.paragraphs[index])));
      }
      
      // Get related list items
      const relatedLists = rulesData.listItems?.slice(index * 3, (index + 1) * 3) || [];
      if (relatedLists.length > 0) {
        content.push(...relatedLists.map(item => convertToAgencyLanguage(rebrandText(item))));
      }
      
      sections.push({
        heading: rebrandText(heading),
        content: content
      });
    });
  }
  
  return {
    title: rebrandText(rulesData.h1?.[0] || 'Terms & Policies'),
    sections: sections
  };
}

/**
 * Process contact information
 */
function processContact(contactData) {
  if (!contactData || contactData.error) {
    return {
      title: 'Get In Touch',
      description: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      info: [
        { type: 'email', value: 'contact@tiloagency.com' },
        { type: 'location', value: 'Remote First' }
      ]
    };
  }
  
  const info = [];
  
  // Extract contact information from paragraphs
  if (contactData.paragraphs) {
    contactData.paragraphs.forEach(p => {
      if (p.includes('@') || p.toLowerCase().includes('email')) {
        const emailMatch = p.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
          info.push({ type: 'email', value: emailMatch[0] });
        }
      }
    });
  }
  
  // If no email found, use default
  if (info.length === 0) {
    info.push({ type: 'email', value: 'contact@tiloagency.com' });
  }
  
  return {
    title: rebrandText(contactData.h1?.[0] || 'Get In Touch'),
    description: contactData.paragraphs?.[0] 
      ? shortenParagraph(convertToAgencyLanguage(rebrandText(contactData.paragraphs[0])), 150)
      : 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    info: info
  };
}

/**
 * Main rebrand function
 */
function rebrandContent() {
  console.log('🎨 Starting content rebrand process...\n');
  
  // Read raw content
  const rawPath = path.join(__dirname, '..', 'data', 'rawContent.json');
  
  if (!fs.existsSync(rawPath)) {
    console.error('❌ Error: rawContent.json not found!');
    console.error('   Please run "npm run fetch-content" first.');
    process.exit(1);
  }
  
  const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  const rawPages = rawData.pages;
  
  console.log('📄 Processing content...');
  
  // Create rebranded content structure
  const rebrandedContent = {
    site: {
      name: 'Tilo Agency',
      domain: 'tiloagency.com',
      themeColor: 'sky-blue',
      description: 'Modern digital agency specializing in strategic partnerships and digital growth solutions.'
    },
    home: {
      ...createHeroContent(rawPages.home || {}),
      sections: [
        {
          id: 'about',
          title: 'Why Choose Us',
          content: rawPages.home?.paragraphs?.[1] 
            ? convertToAgencyLanguage(rebrandText(rawPages.home.paragraphs[1]))
            : 'We combine expertise, innovation, and dedication to deliver exceptional results for our clients.'
        },
        {
          id: 'cta',
          title: 'Ready to Get Started?',
          content: 'Let\'s discuss how we can help transform your digital presence.',
          buttonText: 'Contact Us',
          buttonLink: '/contact'
        }
      ]
    },
    services: processServices(rawPages),
    rules: processRules(rawPages.rules),
    contact: processContact(rawPages.contact),
    metadata: {
      rebrandedAt: new Date().toISOString(),
      sourcePages: Object.keys(rawPages)
    }
  };
  
  // Write rebranded content
  const outputPath = path.join(__dirname, '..', 'data', 'content.json');
  fs.writeFileSync(outputPath, JSON.stringify(rebrandedContent, null, 2), 'utf-8');
  
  console.log('\n✅ Content rebrand complete!');
  console.log(`📁 Output saved to: ${outputPath}`);
  console.log('\n📋 Summary:');
  console.log(`  • Site: ${rebrandedContent.site.name}`);
  console.log(`  • Hero Title: ${rebrandedContent.home.heroTitle.substring(0, 50)}...`);
  console.log(`  • Services: ${rebrandedContent.services.length}`);
  console.log(`  • Rules Sections: ${rebrandedContent.rules.sections.length}`);
  console.log(`  • Contact Info: ${rebrandedContent.contact.info.length} items`);
}

// Run the script
if (require.main === module) {
  try {
    rebrandContent();
    console.log('\n✨ Script completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  }
}

module.exports = { rebrandContent };
