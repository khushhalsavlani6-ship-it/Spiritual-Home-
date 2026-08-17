import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. LORD RAM IDOLS
  {
    id: 'prod-ram-1',
    name: 'Ayodhya Ram Lalla Solid Brass Consecrated Murti (Prana Pratishtha Edition)',
    slug: 'ayodhya-ram-lalla-solid-brass-murti',
    description: 'Consecrated handcrafted solid brass idol of Bhagwan Ram Lalla in child form holding the golden bow and arrow with ornate Mukut and intricate floral halo.',
    longDescription: 'Cast with deep devotion by generational sthapathis, this Ram Lalla murti captures the enchanting divine innocence and majesty of Lord Ram as celebrated in Ayodhya. Crafted from pure virgin brass using lost-wax casting, it undergoes sacred chanting and Vedic rituals before dispatch. Ideal for home temple sanctums, Griha Pravesh, and daily worship.',
    price: 2499,
    discountPrice: 3499,
    sku: 'SH-RAM-LALLA-01',
    category: 'Lord Ram Idols',
    stockQuantity: 15,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: '100% Solid Virgin Brass',
      dimensions: '7.5 inches (H) x 4.5 inches (W) x 3.2 inches (D)',
      weight: '1.45 kg',
      deityOrigin: 'Bhagwan Shri Ram (Ayodhya)',
      color: 'Gleaming Antique Brass with Gold Accents',
      careInstructions: 'Wipe with a soft dry cloth. Clean with Pitambari powder or lemon juice periodically.',
      inTheBox: '1 Consecrated Ram Lalla Brass Murti, Energization Certificate, Sacred Velvet Pad',
      energizedBy: 'Vedic Brahmins at Ayodhya Saryu Kshetra'
    },
    tags: ['Lord Ram', 'Ram Lalla', 'Ayodhya', 'Brass Idol', 'Mandir Murti', 'Shri Ram'],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 64,
    benefits: [
      'Invokes peace, righteous fortune (Dharma), and divine protection in the household',
      'Heavy solid brass casting ensures enduring heirloom durability',
      'Ritually energized with Ram Raksha Stotra and Vedic Suktams'
    ]
  },
  {
    id: 'prod-ram-2',
    name: 'Maryada Purushottam Shri Ram with Kodanda Bow Brass Idol',
    slug: 'shri-ram-kodanda-bow-brass-idol',
    description: 'Majestic antique-finish solid brass murti of Shri Ram in standing posture bearing the celestial Kodanda bow and quiver of divine arrows on a lotus pedestal.',
    longDescription: 'Representing supreme dignity, righteousness, and unshakeable courage, this handcrafted idol portrays Lord Ram with the Kodanda bow in left hand and right hand in benediction. The intricate etchings on the pitambara robes and crown reflect ancient temple carving traditions of Varanasi.',
    price: 1999,
    discountPrice: 2799,
    sku: 'SH-RAM-KOD-02',
    category: 'Lord Ram Idols',
    stockQuantity: 20,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Solid Brass with Antique Patina',
      dimensions: '9.0 inches (H) x 4.8 inches (W) x 3.5 inches (D)',
      weight: '1.65 kg',
      deityOrigin: 'Maryada Purushottam Shri Ram',
      color: 'Rich Antique Golden Bronze',
      careInstructions: 'Clean gently with dry microfiber cloth. Avoid acidic chemicals.',
      inTheBox: '1 Shri Ram Murti with Detachable Brass Bow, Consecration Card',
      energizedBy: 'Chitrakoot Tirth Purohits'
    },
    tags: ['Shri Ram', 'Kodanda Ram', 'Brass Murti', 'Lord Ram', 'Vastu'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 48,
    benefits: [
      'Cultivates truthfulness, moral clarity, and mental serenity in the home',
      'Harmonizes Vastu doshas and dispels negative energies',
      'Exquisite museum-grade carving detail on Mukut and attire'
    ]
  },
  {
    id: 'prod-ram-3',
    name: 'Traditional Shri Ram Chandra in Abhaya Blessing Mudra (Solid Brass)',
    slug: 'shri-ram-abhaya-blessing-brass-murti',
    description: 'Pure brass standing Lord Ram idol with right hand raised in reassuring Abhaya Mudra (fearlessness) and left hand holding the sacred bow on stepped pedestal.',
    longDescription: 'This classic idol is sculpted according to Shilpa Shastra proportions, symbolizing grace, protection, and unconditional refuge for devotees. Perfect for compact home altars, office desks, or living room sacred showcases.',
    price: 1499,
    discountPrice: 2099,
    sku: 'SH-RAM-ABH-03',
    category: 'Lord Ram Idols',
    stockQuantity: 25,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Pure Cast Brass',
      dimensions: '6.2 inches (H) x 3.4 inches (W) x 2.6 inches (D)',
      weight: '920 grams',
      deityOrigin: 'Lord Ramchandra',
      color: 'Polished Brass Golden Luster',
      careInstructions: 'Polish with Pitambari powder for bright golden shine.',
      inTheBox: '1 Shri Ram Brass Idol',
      energizedBy: 'Vedic Rama Taraka Mantra Chanting'
    },
    tags: ['Lord Ram', 'Abhaya Mudra', 'Brass Idol', 'Home Altar'],
    isFeatured: false,
    rating: 4.8,
    reviewCount: 32,
    benefits: [
      'Bestows fearlessness, confidence, and inner balance',
      'Compact size fits perfectly in all home mandir spaces',
      'Mirror-polished golden finish resists tarnishing'
    ]
  },

  // 2. LORD HANUMAN IDOLS
  {
    id: 'prod-han-1',
    name: 'Panchmukhi Hanuman Solid Brass Idol (5-Faced Raksha Kavach)',
    slug: 'panchmukhi-hanuman-brass-idol',
    description: 'Supreme protective 5-faced Lord Hanuman idol featuring Anjaneya, Narasimha, Garuda, Varaha, and Hayagriva with 10 arms holding divine celestial weapons.',
    longDescription: 'The Panchamukhi form of Lord Hanuman is revered as the ultimate protective talisman against evil eyes, negative astral energies, and distress. Cast in heavy solid brass with intricate 360-degree carvings of all 5 faces and weaponry. Energized with Hanuman Chalisa and Bajrang Baan recitations.',
    price: 2899,
    discountPrice: 3999,
    sku: 'SH-HAN-PAN-04',
    category: 'Lord Hanuman Idols',
    stockQuantity: 12,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Heavy Cast Virgin Brass',
      dimensions: '8.5 inches (H) x 6.5 inches (W) x 3.8 inches (D)',
      weight: '2.15 kg',
      deityOrigin: 'Panchamukhi Veer Hanuman',
      color: 'Lustrous Antiquated Brass',
      careInstructions: 'Clean with dry cloth. Do not soak in saline or acidic water.',
      inTheBox: '1 Panchamukhi Hanuman Brass Murti, Kavach Blessing Scroll',
      energizedBy: 'Sankat Mochan Kshetra, Kashi'
    },
    tags: ['Hanuman', 'Panchmukhi Hanuman', 'Bajrangbali', 'Brass Idol', 'Raksha Kavach'],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 78,
    benefits: [
      'Ultimate protection against fear, negative entities, and spiritual obstructions',
      'Shields south-facing entryways and harmonizes planetary doshas',
      'Substantial 2.15 kg brass weight with razor-sharp facial details'
    ]
  },
  {
    id: 'prod-han-2',
    name: 'Sankat Mochan Bajrangbali in Dhyan Mudra (Meditative Brass Idol)',
    slug: 'sankat-mochan-bajrangbali-dhyan-mudra',
    description: 'Serene meditative Hanuman ji seated in Padmasana posture in deep contemplation of Shri Ram, with his divine Gada resting peacefully beside him.',
    longDescription: 'Capturing the tranquil meditative aspect of Maruti, this idol inspires focus, humility, devotion, and profound mental peace. Perfect for students, seekers, and yogic practitioners who seek unwavering willpower and mental stillness.',
    price: 1799,
    discountPrice: 2499,
    sku: 'SH-HAN-DHY-05',
    category: 'Lord Hanuman Idols',
    stockQuantity: 18,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: '100% Solid Brass',
      dimensions: '6.5 inches (H) x 5.0 inches (W) x 3.5 inches (D)',
      weight: '1.35 kg',
      deityOrigin: 'Dhyana Hanuman',
      color: 'Warm Golden Brass Finish',
      careInstructions: 'Wipe with soft cloth. Occasional brass polish keeps brilliance.',
      inTheBox: '1 Meditative Hanuman Brass Murti',
      energizedBy: 'Ayodhya Hanumangarhi Consecration'
    },
    tags: ['Hanuman', 'Dhyan Hanuman', 'Bajrangbali', 'Meditation', 'Brass Murti'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 52,
    benefits: [
      'Deepens concentration, willpower, and meditation focus',
      'Eliminates anxiety, restless thoughts, and insomnia',
      'Stable wide base for secure placement on puja shelves'
    ]
  },
  {
    id: 'prod-han-3',
    name: 'Veer Hanuman with Golden Gada Brass Murti (Standing Posture)',
    slug: 'veer-hanuman-golden-gada-brass-murti',
    description: 'Imposing standing Veer Hanuman idol holding the heavy mace (Gada) in his left hand with right hand raised in blessing, embodying immense strength and courage.',
    longDescription: 'A symbol of indestructible strength, loyalty, and victory over all odds. This idol depicts Bajrangbali ready to defend righteousness and bless devotees with health, vitality, and resilience.',
    price: 1899,
    discountPrice: 2599,
    sku: 'SH-HAN-VEER-06',
    category: 'Lord Hanuman Idols',
    stockQuantity: 22,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Solid Heavy Brass',
      dimensions: '8.0 inches (H) x 4.2 inches (W) x 3.0 inches (D)',
      weight: '1.50 kg',
      deityOrigin: 'Veer Hanuman (Mahabali)',
      color: 'Gleaming Golden Brass',
      careInstructions: 'Clean with lemon or brass cleaner for lasting sheen.',
      inTheBox: '1 Veer Hanuman Murti with Attached Mace (Gada)',
      energizedBy: 'Hanuman Chalisa 108 Samput Paath'
    },
    tags: ['Veer Hanuman', 'Gada', 'Bajrangbali', 'Strength', 'Brass Idol'],
    isFeatured: false,
    rating: 4.9,
    reviewCount: 41,
    benefits: [
      'Bestows physical vigor, confidence, and victory over challenges',
      'Protects property and family from negative influences',
      'Traditional casting with sturdy base and lifelike expression'
    ]
  },
  {
    id: 'prod-han-4',
    name: 'Bhakti Bhav Hanuman Ji Kneeling Brass Idol (Anjali Mudra)',
    slug: 'bhakti-bhav-hanuman-kneeling-brass-idol',
    description: 'Devotional kneeling Hanuman ji with hands folded in reverent Anjali Mudra, ideal companion for Ram Darbar or standalone worship.',
    longDescription: 'Symbol of pure selfless devotion (Seva Bhava). Hanuman ji sits on one knee with folded palms, ready to serve Lord Ram. Perfect for placing at the feet of Lord Ram in your home temple.',
    price: 1299,
    discountPrice: 1799,
    sku: 'SH-HAN-BHK-07',
    category: 'Lord Hanuman Idols',
    stockQuantity: 30,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Pure Solid Brass',
      dimensions: '5.2 inches (H) x 3.5 inches (W) x 3.0 inches (D)',
      weight: '820 grams',
      deityOrigin: 'Bhakta Hanuman',
      color: 'Polished Brass Golden Finish',
      careInstructions: 'Wipe with soft cotton cloth.',
      inTheBox: '1 Kneeling Hanuman Ji Brass Idol',
      energizedBy: 'Vedic Pooja & Archana'
    },
    tags: ['Bhakti Hanuman', 'Kneeling Hanuman', 'Ram Bhakt', 'Brass Murti'],
    isFeatured: false,
    rating: 4.8,
    reviewCount: 36,
    benefits: [
      'Cultivates devotion, humility, and selfless service in the home',
      'Perfect proportional companion for Ram Darbar setups',
      'Solid heavy brass with meticulous feather and garland work'
    ]
  },

  // 3. RAM DARBAR
  {
    id: 'prod-darbar-1',
    name: 'Grand Brass Ram Darbar Murti on Ornate Royal Throne (Ram, Sita, Lakshman & Hanuman)',
    slug: 'grand-brass-ram-darbar-royal-throne',
    description: 'Magnificent one-piece handcrafted solid brass Ram Darbar ensemble featuring Lord Ram, Devi Sita, Lakshman ji under the royal Chhatra with Hanuman ji at divine lotus feet.',
    longDescription: 'The ultimate pinnacle of home mandir sacred art. This grand one-piece solid brass Ram Darbar portrays Maryada Purushottam Shri Ram seated majestically with Mata Sita on the royal Sinhasan, attended by Lakshman ji bearing the Chhatra/bow, and Bhakt Hanuman kneeling in supreme adoration. Cast from heavy-gauge virgin brass with intricate filigree on the archway.',
    price: 4999,
    discountPrice: 6999,
    sku: 'SH-DAR-GRD-08',
    category: 'Ram Darbar',
    stockQuantity: 8,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: '100% Solid Heavy-Gauge Brass',
      dimensions: '11.5 inches (H) x 9.2 inches (W) x 4.5 inches (D)',
      weight: '3.85 kg',
      deityOrigin: 'Shri Ram Darbar (Ayodhya Sinhasan)',
      color: 'Royal Antiquated Gold Brass',
      careInstructions: 'Clean with dry soft cloth or brass polish. Keep on elevated clean altar.',
      inTheBox: '1 Grand Solid Brass Ram Darbar, Consecration Certificate, Sacred Red Asan',
      energizedBy: 'Maha Consecration at Ayodhya Kshetra'
    },
    tags: ['Ram Darbar', 'Shri Ram', 'Sita Ram', 'Lakshman', 'Hanuman', 'Brass Darbar'],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 94,
    benefits: [
      'Brings complete family harmony, unity, prosperity, and peace to household',
      'One-piece casting with grand 3.85 kg weight for lifelong altar centerpiece',
      'Complete ensemble including Lord Ram, Mata Sita, Lakshman, and Hanuman'
    ]
  },
  {
    id: 'prod-darbar-2',
    name: 'Ayodhya Sanctum 4-Piece Individual Brass Ram Darbar Set',
    slug: 'ayodhya-4-piece-individual-brass-ram-darbar-set',
    description: 'Set of 4 individually cast solid brass consecrated deities: Shri Ram, Mata Sita, Lakshman ji, and folded-hands Hanuman ji for customizable altar placement.',
    longDescription: 'This 4-piece set allows devotees to perform individual daily Abhishek, Chandan tilak, and vastra-shringar on each deity. Expertly proportioned so Shri Ram and Mata Sita take center place flanked by Lakshman and Bhakt Hanuman.',
    price: 3799,
    discountPrice: 5299,
    sku: 'SH-DAR-4PC-09',
    category: 'Ram Darbar',
    stockQuantity: 14,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Pure Solid Cast Brass (4 Separate Idols)',
      dimensions: 'Ram/Lakshman: 7.5 in, Sita: 7.0 in, Hanuman: 4.5 in (H)',
      weight: '2.95 kg (combined set)',
      deityOrigin: 'Shri Ram Darbar Parivar',
      color: 'Gleaming Hand-Polished Golden Brass',
      careInstructions: 'Individual idols can be washed with clean water and wiped dry before tilak.',
      inTheBox: '4 Brass Murtis (Shri Ram, Mata Sita, Lakshman Ji, Hanuman Ji)',
      energizedBy: 'Vedic Panchamrit Consecration'
    },
    tags: ['Ram Darbar Set', '4 Piece Set', 'Shri Ram', 'Mata Sita', 'Lakshman', 'Hanuman'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 61,
    benefits: [
      'Individual murtis allow sacred Snanam and Vastra Shringar for each deity',
      'Proportionally balanced heights for breathtaking mandir presentation',
      'Heavy solid brass casting with hand-chiseled facial features'
    ]
  },
  {
    id: 'prod-darbar-3',
    name: 'Antique Gold Ram Darbar in Ornate Prabhavali Arch Frame',
    slug: 'antique-gold-ram-darbar-prabhavali-arch',
    description: 'Heavy cast brass Ram Darbar framed by an intricately engraved temple Prabhavali arch with Peacock and Kirtimukha crest motifs.',
    longDescription: 'Designed to recreate the sanctum sanctorum of ancient temple shrines. The intricate Prabhavali arch surrounding Lord Ram, Sita, Lakshman, and Hanuman acts as a spiritual aura shield.',
    price: 3499,
    discountPrice: 4799,
    sku: 'SH-DAR-ARC-10',
    category: 'Ram Darbar',
    stockQuantity: 16,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Solid Brass with Antique Patina Finish',
      dimensions: '9.5 inches (H) x 7.5 inches (W) x 3.8 inches (D)',
      weight: '2.60 kg',
      deityOrigin: 'Temple Prabhavali Ram Darbar',
      color: 'Antique Bronze & Gold Patina',
      careInstructions: 'Dust with soft dry brush. Do not use abrasive scrubbers.',
      inTheBox: '1 Prabhavali Arch Ram Darbar Brass Idol',
      energizedBy: 'Rama Taraka Mantra Archana'
    },
    tags: ['Ram Darbar', 'Prabhavali', 'Antique Brass', 'Temple Idol', 'Shri Ram'],
    isFeatured: false,
    rating: 4.9,
    reviewCount: 43,
    benefits: [
      'Creates instant temple sanctum presence in any living space or altar',
      'Intricate Prabhavali arch with auspicious peacock engravings',
      'Stable heavy base with anti-scratch felt bottom'
    ]
  },
  {
    id: 'prod-darbar-4',
    name: 'Compact Dashboard / Travel Shrine Brass Ram Darbar Plaque',
    slug: 'compact-dashboard-travel-shrine-brass-ram-darbar',
    description: 'Intricately cast solid brass miniature Ram Darbar plaque with sturdy stand, ideal for car dashboards, travel altars, and work desks.',
    longDescription: 'Carry the divine protection of Shri Ram Darbar wherever you go. This solid brass miniature plaque features sharp high-definition relief carving of Ram, Sita, Lakshman, and Hanuman with an integrated stand.',
    price: 899,
    discountPrice: 1299,
    sku: 'SH-DAR-MIN-11',
    category: 'Ram Darbar',
    stockQuantity: 40,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      material: 'Pure Solid Brass Plaque with Foldable Stand',
      dimensions: '3.8 inches (H) x 3.2 inches (W) x 1.5 inches (D with stand)',
      weight: '340 grams',
      deityOrigin: 'Pocket Shrine Ram Darbar',
      color: 'Polished Brass Gold',
      careInstructions: 'Wipe with soft cloth.',
      inTheBox: '1 Brass Ram Darbar Plaque, Adhesive Pad for Dashboard',
      energizedBy: 'Ayodhya Saryu Consecration'
    },
    tags: ['Ram Darbar', 'Car Dashboard', 'Pocket Temple', 'Mini Idol', 'Travel Shrine'],
    isFeatured: false,
    rating: 4.8,
    reviewCount: 56,
    benefits: [
      'Continuous divine journey protection for vehicles and travel',
      'Solid brass construction with high durability',
      'Includes double-sided secure adhesive base'
    ]
  }
];

export const PRODUCT_CATEGORIES = [
  'All Categories',
  'Lord Ram Idols',
  'Lord Hanuman Idols',
  'Ram Darbar'
];

