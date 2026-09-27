import { Product, ShowcaseLook, OccasionItem, LookbookImage, Testimonial } from '@/types';

export const SHOWCASE_LOOKS: ShowcaseLook[] = [
  {
    id: 'look-01',
    index: '01/04',
    name: 'The Celeste Velvet Column Gown',
    subtitle: 'Midnight Noir Atelier Edition',
    category: 'Evening Gown',
    price: 890,
    mrp: 1250,
    fabric: 'Silk-Infused Micro-Velvet & French Chantilly Lace',
    description: 'Sculpted corsetry meets an ethereal trailing hemline. Hand-draped in our Paris atelier with internal boning and liquid drape velvet.',
    accentColor: '#1A1412',
    accentBg: '#F3ECE7',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Noir', hex: '#161413' },
      { name: 'Bordeaux Plum', hex: '#4A1525' },
      { name: 'Champagne Gold', hex: '#D4AF37' }
    ],
    productRefId: 'prod-01'
  },
  {
    id: 'look-02',
    index: '02/04',
    name: 'Sovereign Banarasi Zari Lehenga',
    subtitle: 'Royal Heirloom Bridal Series',
    category: 'Bridal Lehenga',
    price: 1850,
    mrp: 2400,
    fabric: 'Kadhwa Handloom Silk & Real Metallic Zari',
    description: 'Woven across 160 artisan hours in Varanasi. Features hand-cut floral jaal, heavy kalis, and a diaphanous organza dupatta bordered in beaten gold thread.',
    accentColor: '#362117',
    accentBg: '#F5EBE6',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Rose Quartz Gold', hex: '#C28D75' },
      { name: 'Crimson Scarlet', hex: '#80182A' },
      { name: 'Emerald Forest', hex: '#1C3E2D' }
    ],
    productRefId: 'prod-02'
  },
  {
    id: 'look-03',
    index: '03/04',
    name: 'The Aurelia Draped Silk Cocktail Midi',
    subtitle: 'Sunset Riviera Capsule',
    category: 'Cocktail Dress',
    price: 620,
    mrp: 790,
    fabric: '100% Organic Mulberry Silk Satin',
    description: 'An asymmetrical cowl neckline with an open back and delicate mother-of-pearl hardware. Floats effortlessly with every movement.',
    accentColor: '#30261E',
    accentBg: '#EFEAE2',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F7F3EE' },
      { name: 'Warm Terracotta', hex: '#B85D43' },
      { name: 'Pistachio Mist', hex: '#A8B79F' }
    ],
    productRefId: 'prod-03'
  },
  {
    id: 'look-04',
    index: '04/04',
    name: 'Seraphina Pleated Chiffon Sun-Midi',
    subtitle: 'Monaco Spring Garden Gala',
    category: 'Summer Midi',
    price: 540,
    mrp: 680,
    fabric: 'Featherweight Japanese Silk Chiffon',
    description: 'Precision accordion sunburst pleating that blossoms into a fluid A-line silhouette. Finished with a gold-tipped silk cordon belt.',
    accentColor: '#28231C',
    accentBg: '#EAE6E8',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blush Primrose', hex: '#E6BCB5' },
      { name: 'Buttercup Champagne', hex: '#EED9A7' },
      { name: 'Lavender Haze', hex: '#BFB5C9' }
    ],
    productRefId: 'prod-04'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'The Celeste Velvet Column Gown',
    subtitle: 'Midnight Noir Atelier Edition',
    tag: 'ICONIC',
    overline: 'COUTURE EVENING',
    price: 890,
    mrp: 1250,
    category: 'Gowns',
    occasion: 'Evening Soirée',
    fabric: 'Silk-Infused Micro-Velvet & Chantilly Lace',
    description: 'A masterpiece in dramatic silhouette. Fitted corset with interior boning, off-shoulder lace trim, and a cascading split drape that commands every ballroom.',
    details: [
      'Internal structured corset with 12 French spiral bones',
      'Concealed back zip with hand-covered silk buttons',
      'Floor-sweeping train with discreet bustle hook',
      'Dry clean only by luxury garment specialists'
    ],
    care: 'Professional dry clean only. Store in breathable garment bag.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Noir', hex: '#161413' },
      { name: 'Bordeaux Plum', hex: '#4A1525' },
      { name: 'Champagne Gold', hex: '#D4AF37' }
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 4.95,
    reviewsCount: 38,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'prod-02',
    name: 'Sovereign Banarasi Zari Lehenga',
    subtitle: 'Royal Heirloom Bridal Series',
    tag: 'BRIDAL HEIRLOOM',
    overline: 'ROYAL ETHNIC',
    price: 1850,
    mrp: 2400,
    category: 'Bridal',
    occasion: 'Wedding & Bridal',
    fabric: 'Kadhwa Handloom Silk & Real Gold Zari',
    description: 'Woven over 160 artisan hours in Varanasi. Heavy 16-kali skirt structure paired with an intricately hand-embroidered blouse and sheer scalloped veil.',
    details: [
      '16 flared kalis with built-in double can-can layer',
      'Hand-beaten zardozi and dabka embroidery on neckline',
      'Includes 2 dupattas: Heavy velvet shoulder veil + Light organza head veil',
      'Custom sizing tailored in 14 business days'
    ],
    care: 'Specialized heritage dry clean. Store wrapped in pure mulmul cotton.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Rose Quartz Gold', hex: '#C28D75' },
      { name: 'Crimson Scarlet', hex: '#80182A' },
      { name: 'Emerald Forest', hex: '#1C3E2D' }
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 5.0,
    reviewsCount: 42,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'prod-03',
    name: 'The Aurelia Draped Silk Cocktail Midi',
    subtitle: 'Sunset Riviera Capsule',
    tag: 'LIMITED RUN',
    overline: 'CAPSULE RESORT',
    price: 620,
    mrp: 790,
    category: 'Dresses',
    occasion: 'Evening Soirée',
    fabric: '100% Mulberry Silk Satin (22 Momme)',
    description: 'Fluid elegance defined. Cut on the true bias to drape like liquid mercury along the curves, finished with delicate custom hardware.',
    details: [
      'Bias cut for natural ergonomic stretch and body-contouring drape',
      'Adjustable criss-cross spaghetti tie back',
      'Double-faced silk chest facing to eliminate transparency',
      'High side slit with hand-rolled hems'
    ],
    care: 'Dry clean or gentle cold hand wash with silk detergent.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F7F3EE' },
      { name: 'Warm Terracotta', hex: '#B85D43' },
      { name: 'Pistachio Mist', hex: '#A8B79F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 4.88,
    reviewsCount: 29,
    isNew: true
  },
  {
    id: 'prod-04',
    name: 'Seraphina Pleated Chiffon Sun-Midi',
    subtitle: 'Monaco Spring Garden Gala',
    tag: 'NEW ARRIVAL',
    overline: 'DAY TO DUSK',
    price: 540,
    mrp: 680,
    category: 'Dresses',
    occasion: 'Casual Resort',
    fabric: 'Japanese Silk Chiffon with Micro-Pleats',
    description: 'Airy, joyful, and radiant. Hand-pressed permanent sunburst micro pleating with an empire silhouette and removable gold chain belt.',
    details: [
      'Permanent accordion micro-pleating that resists creasing',
      'Lined with breathable habotai silk lining',
      'Detachable 18K gold-finish metal link sash belt',
      'Keyhole button back closure'
    ],
    care: 'Dry clean only. Hang on padded hanger to preserve pleating.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blush Primrose', hex: '#E6BCB5' },
      { name: 'Buttercup Champagne', hex: '#EED9A7' },
      { name: 'Lavender Haze', hex: '#BFB5C9' }
    ],
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 4.92,
    reviewsCount: 19,
    isNew: true
  },
  {
    id: 'prod-05',
    name: 'Kashmiri Tilla Embroidered Saree',
    subtitle: 'Valley of Roses Heritage Collection',
    tag: 'HANDCRAFTED',
    overline: 'ROYAL ETHNIC',
    price: 1120,
    mrp: 1450,
    category: 'Ethnic',
    occasion: 'Festive Ethnic',
    fabric: 'Handspun Chanderi Silk with Silver & Gold Tilla',
    description: 'A tribute to centuries of Kashmiri needlework. Intricate paisley and flora motifs stitched with micro tilla metallic threads over crisp Chanderi gauze.',
    details: [
      '6.5 meters drape including unstitched designer blouse piece',
      'Hand-twisted tassel pallu finishing',
      'Artisan signature woven on inner border',
      'Silk Mark Certified 100% authentic handloom'
    ],
    care: 'Heritage dry clean only. Avoid spraying perfumes directly on tilla work.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Ivory Frost', hex: '#F0ECE1' },
      { name: 'Dusty Sage', hex: '#9CA695' },
      { name: 'Rosewood', hex: '#875151' }
    ],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 4.97,
    reviewsCount: 31,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'prod-06',
    name: 'Ophelia French Corset Ballgown',
    subtitle: 'Château Du Marais Editorial',
    tag: 'ATELIER EXCLUSIVE',
    overline: 'OCCASION COUTURE',
    price: 1420,
    mrp: 1950,
    category: 'Gowns',
    occasion: 'Evening Soirée',
    fabric: 'Tiered English Tulle & Hand-Embroidered Organza',
    description: 'Dramatic volumes balanced with architectural delicacy. 60 yards of featherlight tulle layers floating over a transparent exposed-corset bodice.',
    details: [
      'Semi-sheer mesh corset with hand-placed micro pearls',
      'Voluminous tiered ballgown skirt with horsehair hem',
      'Built-in inner waist stay belt for weightless support',
      'Detachable tulle shoulder wings'
    ],
    care: 'Professional dry clean only. Steam with low temperature.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Nude', hex: '#E2D1C3' },
      { name: 'Onyx Black', hex: '#1C1B1A' },
      { name: 'Soft Ice Blue', hex: '#C5D0D9' }
    ],
    images: [
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 4.94,
    reviewsCount: 22,
    isNew: true
  },
  {
    id: 'prod-07',
    name: 'The Delphine Cut-Out Maxi Slip',
    subtitle: 'Capri Twilight Soirée',
    tag: 'BESTSELLER',
    overline: 'SUMMER OCCASION',
    price: 490,
    mrp: 650,
    category: 'Dresses',
    occasion: 'Casual Resort',
    fabric: 'Heavy Weight Silk Crepe de Chine',
    description: 'Clean architectural lines meet effortless sensual drapery. Features an understated side waist cut-out accented with a hammered gold ring.',
    details: [
      'Single handcrafted 24K gold-plated brass ring accent',
      'High side vent slit for fluid walking stride',
      'Invisible side zip and adjustable halter ties',
      'Fully lined in pure self-silk'
    ],
    care: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Bronze', hex: '#4B372F' },
      { name: 'Pure Pearl', hex: '#FAF7F2' },
      { name: 'Olive Grove', hex: '#585C42' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 4.91,
    reviewsCount: 54,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'prod-08',
    name: 'Noor Hand-Beaded Festive Anarkali',
    subtitle: 'Mughal Garden Radiance',
    tag: 'FESTIVE EDIT',
    overline: 'ROYAL ETHNIC',
    price: 980,
    mrp: 1300,
    category: 'Ethnic',
    occasion: 'Festive Ethnic',
    fabric: 'Raw Silk, Silk Georgette & Gota Patti',
    description: 'A 28-kali floor-grazing Anarkali gown enriched with intricate gota patti geometry and dabka embroidery across the yoke, hem, and sleeve cuffs.',
    details: [
      '28-kali flared silhouette with weighted hemline border',
      'Comes with matching Churidar pants and sheer net dupatta',
      'Hand-crafted latkan tassels on back tie',
      'Padded bustier with customizable seam margins'
    ],
    care: 'Dry clean only. Iron on reverse side with damp pressing cloth.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Mustard Turmeric', hex: '#D29729' },
      { name: 'Royal Peacock', hex: '#1B475D' },
      { name: 'Blush Rose', hex: '#DFAFB4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    rating: 4.96,
    reviewsCount: 27,
    isNew: true
  }
];

export const OCCASIONS: OccasionItem[] = [
  {
    id: 'occ-1',
    title: 'Wedding & Bridal',
    subtitle: 'Majestic lehengas, bridal gowns & heirloom ceremonial sets',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    count: '24 Curated Ensembles',
    category: 'Bridal',
    span: 'tall'
  },
  {
    id: 'occ-2',
    title: 'Evening Soirée',
    subtitle: 'Dramatic floor-length column gowns and sculpted velvet corsets',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
    count: '18 Couture Pieces',
    category: 'Gowns'
  },
  {
    id: 'occ-3',
    title: 'Casual Resort & Day',
    subtitle: 'Airy silk midis, sunburst pleats & bias-cut slip dresses',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    count: '16 Fluid Silhouettes',
    category: 'Dresses'
  },
  {
    id: 'occ-4',
    title: 'Festive Ethnic',
    subtitle: 'Hand-woven Banarasi sarees, tilla dupattas & 28-kali anarkalis',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    count: '32 Artisan Designs',
    category: 'Ethnic'
  }
];

export const LOOKBOOK_IMAGES: LookbookImage[] = [
  {
    id: 'lb-1',
    title: 'Act I : The Dawn Reverie',
    caption: 'Pure Mulberry silk chiffon in Ivory Mist against morning marble',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85',
    aspect: 'aspect-[3/4]',
    season: 'SS · 26'
  },
  {
    id: 'lb-2',
    title: 'Act II : Golden Hour Seduction',
    caption: 'Hand-draped column silhouette catching the Mediterranean breeze',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85',
    aspect: 'aspect-[3/4]',
    season: 'SS · 26'
  },
  {
    id: 'lb-3',
    title: 'Act III : The Royal Heirloom',
    caption: '160-hour Banarasi gold zari weave moving like liquid majesty',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85',
    aspect: 'aspect-[3/4]',
    season: 'SS · 26'
  },
  {
    id: 'lb-4',
    title: 'Act IV : The Twilight Corsetry',
    caption: 'Sculpted internal boning draped in silk-infused midnight micro-velvet',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85',
    aspect: 'aspect-[3/4]',
    season: 'SS · 26'
  },
  {
    id: 'lb-5',
    title: 'Act V : Sunburst Harmony',
    caption: 'Permanent accordion pleating floating along Riviera coastlines',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=85',
    aspect: 'aspect-[3/4]',
    season: 'SS · 26'
  },
  {
    id: 'lb-6',
    title: 'Act VI : Whispers of Tulle',
    caption: '60 yards of English tulle layered with micro-pearl constellation',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=900&q=85',
    aspect: 'aspect-[3/4]',
    season: 'SS · 26'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Lady Eleanor Vance',
    location: 'London & Monaco',
    quote: 'The Celeste gown was nothing short of poetry. The internal boning fit like a bespoke glove, and the silk micro-velvet felt weightless under the opera chandeliers.',
    rating: 5,
    dressPurchased: 'The Celeste Velvet Gown',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    silhouette: 'Hourglass / UK 8'
  },
  {
    id: 'test-2',
    name: 'Miraal Kapoor-Singhania',
    location: 'Mumbai & Dubai',
    quote: 'Wearing the Sovereign Banarasi Lehenga for my wedding sangeet brought tears to my mother’s eyes. The gold zari has that timeless heirloom sheen you simply cannot find today.',
    rating: 5,
    dressPurchased: 'Sovereign Banarasi Lehenga',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    silhouette: 'Custom Atelier Sizing'
  },
  {
    id: 'test-3',
    name: 'Camille De Roche',
    location: 'Paris & Côte d’Azur',
    quote: 'Aurelle understands silk like no other boutique. The bias cut of the Aurelia cocktail dress moves with effortless grace. It is already my signature gala piece.',
    rating: 5,
    dressPurchased: 'Aurelia Draped Silk Midi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    silhouette: 'Petite / FR 36'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    likes: '4.2k',
    tag: '#AurelleEditorial'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
    likes: '6.8k',
    tag: '#MidnightAtelier'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    likes: '9.1k',
    tag: '#HeirloomZari'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    likes: '3.9k',
    tag: '#SpringSummer26'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80',
    likes: '5.4k',
    tag: '#MonacoGala'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    likes: '8.3k',
    tag: '#FestiveElegance'
  },
  {
    id: 'ig-7',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    likes: '4.7k',
    tag: '#RivieraDusk'
  },
  {
    id: 'ig-8',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=600&q=80',
    likes: '7.6k',
    tag: '#OpheliaBallgown'
  }
];
