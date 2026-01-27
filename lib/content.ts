import fs from 'fs';
import path from 'path';

export interface SiteContent {
  site: {
    name: string;
    domain: string;
    themeColor: string;
    description: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    sections: Array<{
      id: string;
      title: string;
      content: string;
      buttonText?: string;
      buttonLink?: string;
    }>;
  };
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  rules: {
    title: string;
    sections: Array<{
      heading: string;
      content: string[];
    }>;
  };
  contact: {
    title: string;
    description: string;
    info: Array<{
      type: string;
      value: string;
    }>;
  };
}

export function getContent(): SiteContent {
  const contentPath = path.join(process.cwd(), 'data', 'content.json');
  
  // Check if content file exists
  if (!fs.existsSync(contentPath)) {
    // Return default content if file doesn't exist
    return {
      site: {
        name: 'Tilo Agency',
        domain: 'tiloagency.com',
        themeColor: 'sky-blue',
        description: 'Modern digital agency specializing in strategic partnerships and digital growth solutions.'
      },
      home: {
        heroTitle: 'Transform Your Digital Presence',
        heroSubtitle: 'We help businesses grow through innovative digital solutions and strategic partnerships.',
        sections: [
          {
            id: 'about',
            title: 'Why Choose Us',
            content: 'We combine expertise, innovation, and dedication to deliver exceptional results for our clients.'
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
      services: [
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
      ],
      rules: {
        title: 'Terms & Policies',
        sections: [
          {
            heading: 'General Terms',
            content: ['Please refer to our terms and conditions for detailed information.']
          }
        ]
      },
      contact: {
        title: 'Get In Touch',
        description: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
        info: [
          { type: 'email', value: 'contact@tiloagency.com' },
          { type: 'location', value: 'Remote First' }
        ]
      }
    };
  }

  const content = fs.readFileSync(contentPath, 'utf-8');
  return JSON.parse(content);
}
