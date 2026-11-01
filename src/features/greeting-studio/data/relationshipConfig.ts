import type { GreetingTemplate } from '../types/template';

export interface SuggestedMessage {
  titleEn: string;
  titleHi: string;
  textEn: string;
  textHi: string;
}

export interface SuggestedTitle {
  en: string;
  hi: string;
}

export interface RelationshipOption {
  id: string;
  labelEn: string;
  labelHi: string;
  icon: string;
  matchingCategories: string[];
  matchingTemplateIds?: string[];
  suggestedTitles: SuggestedTitle[];
  suggestedMessages: SuggestedMessage[];
}

export const RELATIONSHIPS: RelationshipOption[] = [
  {
    id: 'mother',
    labelEn: 'Mother',
    labelHi: 'Mummy',
    icon: '🌸',
    matchingCategories: ['family-friends', 'floral-rangoli', 'traditional-indian', 'photo-studio'],
    matchingTemplateIds: ['photo-royal-portrait', 'family-hearth-glow', 'rangoli-mandala-blessing', 'heritage-deep-lakshmi'],
    suggestedTitles: [
      { en: 'Happy Diwali, Mummy!', hi: 'Happy Diwali, Mummy!' },
      { en: 'Pyari Maa', hi: 'Pyari Maa' },
      { en: 'Ghar ki Lakshmi', hi: 'Ghar ki Lakshmi' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Mummy!',
        titleHi: 'Mummy, Happy Diwali!',
        textEn: 'Mummy, you are the most special person in my life. Your smile makes our home a thousand times more beautiful.',
        textHi: 'Mummy, aap meri life ki sabse special person hain. Aapki smile se ghar aur bhi khoobsurat lagta hai.',
      },
      {
        titleEn: 'To the True Lakshmi of Our Home',
        titleHi: 'Ghar ki Pyari Lakshmi',
        textEn: 'May Goddess Lakshmi bless the real Lakshmi of our home with glowing health, endless peace, and happiness.',
        textHi: 'Maa, aapki mamta aur dulaar se hi hamara ghar mandir banta hai. Aapko dher saara pyaar aur pranam!',
      },
    ],
  },
  {
    id: 'father',
    labelEn: 'Father',
    labelHi: 'Papa',
    icon: '🌟',
    matchingCategories: ['family-friends', 'traditional-indian', 'premium-purple-gold', 'photo-studio'],
    matchingTemplateIds: ['photo-gilded-heritage', 'family-legacy-roots', 'shree-ganesha-auspicious', 'royal-diwali-splendor'],
    suggestedTitles: [
      { en: 'Happy Diwali, Papa!', hi: 'Happy Diwali, Papa!' },
      { en: 'Mere Margdarshak', hi: 'Mere Margdarshak' },
      { en: 'Pillar of Our Family', hi: 'Hamari Sabse Badi Taakat' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Papa!',
        titleHi: 'Papa, Happy Diwali!',
        textEn: 'Papa, your support and quiet strength mean everything to me. Thank you for always being there for our family.',
        textHi: 'Papa, aapka support mere liye sab kuch hai. Thank you for always being there for us. Shubh Deepavali!',
      },
      {
        titleEn: 'To the Pillar of Our Family',
        titleHi: 'Hamari Sabse Badi Taakat',
        textEn: 'Thank you for every unspoken sacrifice and for teaching us how to walk with honesty and courage. Happy Diwali!',
        textHi: 'Papa, aapki mehnat aur vishwas hi hamari sabse badi taakat hai. Sadar charan sparsh aur Happy Diwali!',
      },
    ],
  },
  {
    id: 'brother',
    labelEn: 'Brother',
    labelHi: 'Bhai',
    icon: '💪',
    matchingCategories: ['cute-creative', 'family-friends', 'story-special', 'photo-studio'],
    matchingTemplateIds: ['photo-yaari-sparklers', 'creative-sky-lantern-wishes', 'family-cousin-mischief-squad'],
    suggestedTitles: [
      { en: 'Happy Diwali, Bhai!', hi: 'Happy Diwali, Bhai!' },
      { en: 'To My Bro', hi: 'Mere Pyare Bhai' },
      { en: 'Partner in Crime', hi: 'Bachpan ke Yaar' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Bhai!',
        titleHi: 'Happy Diwali, Mere Bhai!',
        textEn: 'Festivals are never complete without our silly arguments and shared sparklers. Wishing you grand success and joy, bro!',
        textHi: 'Bhai, tumhare bina Diwali ki mithai aur masti dono adhoori hain! Khoob tarakki karo aur khush raho!',
      },
      {
        titleEn: 'To My Partner in Crime',
        titleHi: 'Bachpan ke Partner',
        textEn: 'From fighting over the remote to backing each other up through everything—happy Diwali to the best brother!',
        textHi: 'Bachpan ki har shararat ke partner, yeh Diwali tumhare liye dher saari kamyabi aur party laye!',
      },
    ],
  },
  {
    id: 'sister',
    labelEn: 'Sister',
    labelHi: 'Behen',
    icon: '✨',
    matchingCategories: ['cute-creative', 'floral-rangoli', 'family-friends', 'photo-studio'],
    matchingTemplateIds: ['photo-yaari-sparklers', 'floral-lotus-cascade', 'family-sister-sparkler-laughter'],
    suggestedTitles: [
      { en: 'Happy Diwali, Sis!', hi: 'Happy Diwali, Behen!' },
      { en: 'Pyari Behen', hi: 'Pyari Behen' },
      { en: 'Sparkling Sister', hi: 'Meri Pyari Behna' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Dearest Sister!',
        titleHi: 'Pyari Behen, Happy Diwali!',
        textEn: 'Thank you for lighting up our home with your laughter and endless chatter. Wishing you a sparkling and joyful Diwali, sis!',
        textHi: 'Meri pyari behen, tumhari muskaan se hamara ghar sada roshan rehta hai! Dher saara pyaar aur Diwali wishes!',
      },
      {
        titleEn: 'To My Sweetest Sister',
        titleHi: 'Sabse Pyari Behen',
        textEn: 'From sharing sweets to sharing all our secrets, having you as my sister is life’s greatest blessing. Shine bright!',
        textHi: 'Mithai se lekar secrets tak, tumhare jaisi behen milna sabse bada gift hai. Sada chamakti raho!',
      },
    ],
  },
  {
    id: 'husband',
    labelEn: 'Husband',
    labelHi: 'Husband',
    icon: '💍',
    matchingCategories: ['family-friends', 'premium-purple-gold', 'photo-studio'],
    matchingTemplateIds: ['photo-eternal-flame-couple', 'photo-starlight-romance', 'royal-velvet-gold-heritage'],
    suggestedTitles: [
      { en: 'Happy Diwali, My Love!', hi: 'Happy Diwali, My Love!' },
      { en: 'Mere Humsafar', hi: 'Mere Pyare Humsafar' },
      { en: 'To My Wonderful Husband', hi: 'Pati Dev ji' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, My Love!',
        titleHi: 'Happy Diwali, My Love!',
        textEn: 'With you, every festival feels like a sacred blessing. Thank you for filling our life with warmth, laughter, and safe love.',
        textHi: 'Aapke sath har celebration aur bhi khoobsurat lagta hai. Zindagi ko roshan karne ke liye thank you!',
      },
      {
        titleEn: 'To My Wonderful Husband',
        titleHi: 'Mere Pyare Humsafar',
        textEn: 'Lighting our festive lamps together is my favorite part of the year. Wishing my soulmate endless joy and prosperity!',
        textHi: 'Aapke sath har lamha khaas hai. Diwali ki dher saari shubhkaamnayein, mere pyare humsafar!',
      },
    ],
  },
  {
    id: 'wife',
    labelEn: 'Wife',
    labelHi: 'Wife',
    icon: '💖',
    matchingCategories: ['floral-rangoli', 'premium-purple-gold', 'photo-studio'],
    matchingTemplateIds: ['photo-eternal-flame-couple', 'photo-starlight-romance', 'floral-marigold-toran-festive'],
    suggestedTitles: [
      { en: 'Happy Diwali, My Wife!', hi: 'Happy Diwali, Meri Jaan!' },
      { en: 'Meri Pyari Wife', hi: 'Meri Pyari Wife' },
      { en: 'Ghar ki Rounak', hi: 'Ghar ki Rounak' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, My Beautiful Wife!',
        titleHi: 'Happy Diwali, Meri Jaan!',
        textEn: 'You are the heart and soul of our home. May this festival surround you with the same pure joy you give to everyone around you.',
        textHi: 'Tumhare aane se mera ghar aur zindagi dono roshan hain. Shubh Deepavali, meri pyari wife!',
      },
      {
        titleEn: 'To My Life Partner',
        titleHi: 'Mere Dil Ki Rani',
        textEn: 'You make every day feel like a festival of love and light. Thank you for being my anchor and my greatest joy.',
        textHi: 'Tum meri life ka sabse khoobsurat diya ho. You make every moment beautiful. Love you always!',
      },
    ],
  },
  {
    id: 'boyfriend',
    labelEn: 'Boyfriend',
    labelHi: 'Boyfriend',
    icon: '❤️',
    matchingCategories: ['cute-creative', 'story-special', 'photo-studio'],
    matchingTemplateIds: ['photo-starlight-romance', 'photo-festive-duet-collage', 'creative-kaleidoscope-sparkles'],
    suggestedTitles: [
      { en: 'Happy Diwali, Handsome!', hi: 'Happy Diwali, Handsome!' },
      { en: 'To My Favorite Person', hi: 'My Favorite Person' },
      { en: 'Festive Love', hi: 'Pyar Bhari Diwali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali to My Favorite Person!',
        titleHi: 'Happy Diwali, My Favorite!',
        textEn: 'You make every festival brighter just by being in my life. Can’t wait to celebrate together! Wishing you lots of love!',
        textHi: 'Tumhare sath har celebration aur bhi special lagta hai. You make every moment beautiful! Happy Diwali!',
      },
      {
        titleEn: 'To My Cutest Partner',
        titleHi: 'Pyari Si Diwali Tumhare Sang',
        textEn: 'May your Diwali be as bright and wonderful as your smile. Sending you the warmest festive hugs across the miles!',
        textHi: 'Yeh Diwali tumhare liye dher saari khushiyan aur success laye. Missing you lots today!',
      },
    ],
  },
  {
    id: 'girlfriend',
    labelEn: 'Girlfriend',
    labelHi: 'Girlfriend',
    icon: '🌸',
    matchingCategories: ['cute-creative', 'floral-rangoli', 'photo-studio'],
    matchingTemplateIds: ['photo-starlight-romance', 'floral-diwali-petal-mandala', 'creative-confetti-diwali-joy'],
    suggestedTitles: [
      { en: 'Happy Diwali, Gorgeous!', hi: 'Happy Diwali, Gorgeous!' },
      { en: 'Meri Pyari Diya', hi: 'Meri Pyari Diya' },
      { en: 'Sparkling Love', hi: 'Jagmagaati Diwali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Gorgeous!',
        titleHi: 'Happy Diwali, Gorgeous!',
        textEn: 'You outshine all the festive lights in the city! Wishing you a season full of smiles, sweet treats, and pure magic.',
        textHi: 'Tumhare samne saare diye bhi pheeke lagte hain! Wishing you the sweetest and most magical Diwali!',
      },
      {
        titleEn: 'To the Light of My Life',
        titleHi: 'Meri Pyari Diya',
        textEn: 'Celebrating with you is my happiest festive wish come true. Have a dazzling and delightful Diwali, my love!',
        textHi: 'Tumhari smile hi meri Diwali ka sabse bada celebration hai. Always stay happy and glowing!',
      },
    ],
  },
  {
    id: 'partner',
    labelEn: 'Partner',
    labelHi: 'Partner',
    icon: '💫',
    matchingCategories: ['modern-minimal', 'premium-purple-gold', 'photo-studio'],
    matchingTemplateIds: ['photo-eternal-flame-couple', 'minimal-diya-monoline', 'modern-geometric-mandala-gold'],
    suggestedTitles: [
      { en: 'Happy Diwali, My Partner!', hi: 'Happy Diwali, My Partner!' },
      { en: 'To My Soulmate', hi: 'Mere Humsafar' },
      { en: 'Together in Light', hi: 'Ek Saath Shubh Deepavali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, My Partner!',
        titleHi: 'Happy Diwali, My Partner!',
        textEn: 'Celebrating life and love with you is the sweetest blessing. Here’s to building our dreams and lighting up our world together.',
        textHi: 'Tumhare sath har celebration aur bhi special lagta hai. You make every moment beautiful. Shubh Deepavali!',
      },
    ],
  },
  {
    id: 'best-friend',
    labelEn: 'Best Friend',
    labelHi: 'Best Friend',
    icon: '🎉',
    matchingCategories: ['cute-creative', 'story-special', 'photo-studio'],
    matchingTemplateIds: ['photo-yaari-sparklers', 'photo-rooftop-gang', 'creative-sky-lantern-wishes'],
    suggestedTitles: [
      { en: 'Happy Diwali, Bestie!', hi: 'Happy Diwali, Yaar!' },
      { en: 'Mere Dost', hi: 'Mere Dost' },
      { en: 'Festive Vibes Partner', hi: 'Festive Vibes Partner' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Bestie!',
        titleHi: 'Happy Diwali, Yaar!',
        textEn: 'Life wouldn’t be half as funny or memorable without you! Every crazy memory is special because of you. Happy Diwali, buddy!',
        textHi: 'Life tumhare bina itni funny nahi hoti! Har crazy memory tumhare saath hi special hai. Happy Diwali, yaar!',
      },
      {
        titleEn: 'To My 3 AM Friend',
        titleHi: 'Pakkki Yaari Zindabad',
        textEn: 'No formal wishes between us—save the best kaju katli for me, and let’s make this festival unforgettable!',
        textHi: 'Kaju katli ka dabba bachakar rakhna, main aa raha hoon! Happy Diwali to my number one partner!',
      },
    ],
  },
  {
    id: 'friend',
    labelEn: 'Friend',
    labelHi: 'Dost',
    icon: '🤝',
    matchingCategories: ['cute-creative', 'story-special', 'family-friends', 'photo-studio'],
    matchingTemplateIds: ['photo-yaari-sparklers', 'creative-playful-diyas-party', 'story-diwali-sparkler-vibe'],
    suggestedTitles: [
      { en: 'Happy Diwali, My Friend!', hi: 'Happy Diwali, Dost!' },
      { en: 'To a Great Friend', hi: 'Mere Pyare Dost' },
      { en: 'Cheers to Friendship', hi: 'Dosti ki Diwali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, My Friend!',
        titleHi: 'Happy Diwali, Dost!',
        textEn: 'Wishing you delicious sweets, roaring laughter, and a glowing year ahead. Have a fantastic festive celebration with your loved ones!',
        textHi: 'Dher saari mithai, doston ki mehfil aur khoob saari masti! Happy Diwali mere dost!',
      },
    ],
  },
  {
    id: 'son',
    labelEn: 'Son',
    labelHi: 'Beta',
    icon: '🚀',
    matchingCategories: ['cute-creative', 'traditional-indian', 'family-friends', 'photo-studio'],
    matchingTemplateIds: ['family-childhood-nostalgia', 'traditional-royal-deep-stambh', 'photo-parivar-panoramic'],
    suggestedTitles: [
      { en: 'Blessings on Diwali, Beta!', hi: 'Shubh Deepavali, Beta!' },
      { en: 'Proud of You, Son', hi: 'Aashirwad Pyare Bete ko' },
      { en: 'Bright Future Ahead', hi: 'Ujjwal Bhavishya' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Blessings on Diwali, Beta!',
        titleHi: 'Shubh Deepavali, Beta!',
        textEn: 'May you always soar high with courage, kindness, and integrity. We are immensely proud of you. Happy Diwali, dear son!',
        textHi: 'Beta, tumhara aane wala kal ujjwal aur safal ho. Hamara dher saara aashirwad hamesha tumhare sath hai!',
      },
    ],
  },
  {
    id: 'daughter',
    labelEn: 'Daughter',
    labelHi: 'Beti',
    icon: '🌺',
    matchingCategories: ['floral-rangoli', 'cute-creative', 'family-friends', 'photo-studio'],
    matchingTemplateIds: ['floral-marigold-toran-festive', 'creative-sweet-jalebi-diwali', 'photo-parivar-panoramic'],
    suggestedTitles: [
      { en: 'Happy Diwali, Beta!', hi: 'Pyari Beti, Happy Diwali!' },
      { en: 'Ghar ki Khushi', hi: 'Ghar ki Rounak' },
      { en: 'Blessings Always', hi: 'Dher Saara Aashirwad' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Beta!',
        titleHi: 'Pyari Beti, Happy Diwali!',
        textEn: 'You bring endless warmth and joy to our home. May Goddess Lakshmi shower you with wisdom, happiness, and bright dreams!',
        textHi: 'Hamare ghar ki rounak aur hamari pyari beti ko Diwali ki dher saari shubhkaamnayein aur aashirwad!',
      },
    ],
  },
  {
    id: 'grandparents',
    labelEn: 'Grandparents',
    labelHi: 'Dada-Dadi / Nana-Nani',
    icon: '👵',
    matchingCategories: ['traditional-indian', 'family-friends', 'photo-studio'],
    matchingTemplateIds: ['traditional-ayodhya-deepotsav', 'family-hearth-glow', 'photo-parivar-panoramic'],
    suggestedTitles: [
      { en: 'Pranam on Deepavali', hi: 'Sadar Charan Sparsh' },
      { en: 'Festive Blessings', hi: 'Dada-Dadi ko Pranam' },
      { en: 'Shubh Deepavali', hi: 'Shubh Deepavali Pranam' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Pranam on Deepavali',
        titleHi: 'Sadar Pranam & Diwali Wishes',
        textEn: 'Seeking your sacred blessings at this festival of lights. Your traditional wisdom and gentle love are our family’s greatest wealth.',
        textHi: 'Aapke charan sparsh kar aashirwad maangte hain. Aapka dulaar aur sanskaar hi hamari sabse badi daulat hain.',
      },
    ],
  },
  {
    id: 'uncle',
    labelEn: 'Uncle',
    labelHi: 'Uncle',
    icon: '🏡',
    matchingCategories: ['family-friends', 'traditional-indian'],
    matchingTemplateIds: ['family-harvest-bounty-blessings', 'traditional-shubh-deepotsav-classic'],
    suggestedTitles: [
      { en: 'Warm Diwali Wishes, Uncle!', hi: 'Uncle, Shubh Deepavali!' },
      { en: 'Respectful Greetings', hi: 'Sadar Pranam, Uncle' },
      { en: 'Happy Diwali', hi: 'Happy Diwali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Warm Diwali Wishes, Uncle!',
        titleHi: 'Uncle, Shubh Deepavali!',
        textEn: 'Wishing you and your family vibrant health, great prosperity, and joyous celebrations this festive season!',
        textHi: 'Uncle, aapko aur pure parivar ko Diwali ki dher saari shubhkaamnayein. Hamesha swasth aur khush rahein!',
      },
    ],
  },
  {
    id: 'aunt',
    labelEn: 'Aunt',
    labelHi: 'Aunty',
    icon: '🌸',
    matchingCategories: ['family-friends', 'floral-rangoli'],
    matchingTemplateIds: ['family-hearth-glow', 'floral-lotus-cascade'],
    suggestedTitles: [
      { en: 'Happy Diwali, Aunty!', hi: 'Aunty, Happy Diwali!' },
      { en: 'Warm Pranam', hi: 'Sadar Pranam Aunty' },
      { en: 'Festive Blessings', hi: 'Shubh Deepavali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Aunty!',
        titleHi: 'Aunty, Happy Diwali!',
        textEn: 'May your home overflow with sweetness, peaceful laughter, and sweet blessings. Thank you for your warmth!',
        textHi: 'Aunty, aapko aur pure parivar ko Diwali ki dher saari shubhkaamnayein. Aapka aashirwad sada bana rahe!',
      },
    ],
  },
  {
    id: 'cousin',
    labelEn: 'Cousin',
    labelHi: 'Cousin',
    icon: '🎉',
    matchingCategories: ['cute-creative', 'story-special'],
    matchingTemplateIds: ['family-cousin-mischief-squad', 'creative-sky-lantern-wishes'],
    suggestedTitles: [
      { en: 'Happy Diwali, Cousin!', hi: 'Happy Diwali, Cousin!' },
      { en: 'Party Time, Yaar!', hi: 'Diwali Party Time' },
      { en: 'Cheers Cousin', hi: 'Masti Bhari Diwali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali, Cousin!',
        titleHi: 'Happy Diwali, Cousin!',
        textEn: 'Missing our festive family get-togethers and endless laughing sessions. Have a sparkling celebration, cousin!',
        textHi: 'Diwali ki dher saari masti aur mithai mubarak! Jaldi milte hain aur party karte hain!',
      },
    ],
  },
  {
    id: 'teacher',
    labelEn: 'Teacher / Guru',
    labelHi: 'Teacher',
    icon: '📖',
    matchingCategories: ['traditional-indian', 'corporate-professional'],
    matchingTemplateIds: ['traditional-vedic-mantra-illumination', 'corporate-burgundy-charter'],
    suggestedTitles: [
      { en: 'Respectful Diwali Greetings', hi: 'Sadar Pranam, Teacher' },
      { en: 'To My Respected Guru', hi: 'Guruvar ko Naman' },
      { en: 'Warm Festive Regards', hi: 'Shubh Deepavali Pranam' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Respectful Diwali Greetings',
        titleHi: 'Sadar Pranam, Teacher',
        textEn: 'Thank you for always guiding, inspiring, and believing in me. May this festival of wisdom bless your life with boundless peace.',
        textHi: 'Thank you for always guiding and supporting me. Aapki guidance mere liye bahut important hai. Shubh Deepavali!',
      },
    ],
  },
  {
    id: 'colleague',
    labelEn: 'Colleague',
    labelHi: 'Office Colleague',
    icon: '💼',
    matchingCategories: ['corporate-professional', 'modern-minimal'],
    matchingTemplateIds: ['corporate-navy-executive-diwali', 'minimal-champagne-stationery'],
    suggestedTitles: [
      { en: 'Warm Festive Greetings', hi: 'Happy Diwali, Colleague!' },
      { en: 'Wishing You Prosperity and Success', hi: 'Wishing You Prosperity and Success' },
      { en: 'Happy Diwali', hi: 'Shubh Deepavali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Warm Festive Wishes!',
        titleHi: 'Happy Diwali, Colleague!',
        textEn: 'Wishing you a rejuvenating festive break with family and continued success in the upcoming year. Happy Diwali!',
        textHi: 'Festive break enjoy karein aur family ke sath achha time bitayein. Shubh Deepavali!',
      },
    ],
  },
  {
    id: 'boss',
    labelEn: 'Boss / Leader',
    labelHi: 'Boss',
    icon: '👔',
    matchingCategories: ['corporate-professional', 'premium-purple-gold'],
    matchingTemplateIds: ['corporate-obsidian-gold-executive', 'royal-velvet-gold-heritage'],
    suggestedTitles: [
      { en: 'Warm Festive Greetings', hi: 'Diwali Shubhkaamnayein' },
      { en: 'Wishing You Prosperity and Success', hi: 'Safalta aur Unnati ki Shubhkaamnayein' },
      { en: 'Happy Diwali, Sir/Ma’am', hi: 'Happy Diwali, Sir/Ma’am' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Warm Diwali Greetings',
        titleHi: 'Diwali Shubhkaamnayein, Sir/Ma’am',
        textEn: 'Thank you for your visionary leadership and encouragement. Wishing you and your family abundant joy and shared triumphs!',
        textHi: 'Aapke shandaar guidance aur leadership ke liye dhanyavad. Wishing you and your family a very Happy Diwali!',
      },
    ],
  },
  {
    id: 'customer',
    labelEn: 'Customer / Client',
    labelHi: 'Customer',
    icon: '📈',
    matchingCategories: ['corporate-professional', 'modern-minimal', 'photo-studio'],
    matchingTemplateIds: ['corporate-burgundy-charter', 'minimal-gold-filigree-card', 'photo-modern-split-duo'],
    suggestedTitles: [
      { en: 'Warm Festive Greetings', hi: 'Shubh Deepavali Shubhkaamnayein' },
      { en: 'Wishing You Prosperity and Success', hi: 'Aapke Saath aur Vishwas ke liye Dhanyavad' },
      { en: 'Happy Diwali', hi: 'Happy Diwali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Warm Festive Greetings',
        titleHi: 'Shubh Deepavali Shubhkaamnayein',
        textEn: 'Thank you for your valued partnership and trust. We wish your organization continued success and prosperous milestones this Diwali!',
        textHi: 'Aapke vishwas aur sath ke liye dil se aabhar. Yeh tyohar aapke business mein dher saari unnati aur safalta laye!',
      },
    ],
  },
  {
    id: 'family',
    labelEn: 'Family',
    labelHi: 'Family',
    icon: '🏡',
    matchingCategories: ['family-friends', 'traditional-indian', 'photo-studio'],
    matchingTemplateIds: ['photo-parivar-panoramic', 'photo-hearth-and-home', 'family-hearth-glow'],
    suggestedTitles: [
      { en: 'Happy Diwali to Our Family!', hi: 'Pure Parivar ko Shubh Deepavali!' },
      { en: 'Together in Light', hi: 'Apno Ka Sath' },
      { en: 'Festive Blessings', hi: 'Khushiyon Bhari Diwali' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Happy Diwali to Our Beloved Family!',
        titleHi: 'Pure Parivar ko Shubh Deepavali!',
        textEn: 'Togetherness is the greatest gift of every festival. May our home be blessed with unbroken health, peace, and laughter!',
        textHi: 'Apno ka sath hi sabse bada tyohar hai. Pure parivar ko prem aur khushiyon bhari Deepavali!',
      },
    ],
  },
  {
    id: 'everyone',
    labelEn: 'Everyone',
    labelHi: 'Sabhi ke liye',
    icon: '✨',
    matchingCategories: ['premium-purple-gold', 'traditional-indian', 'floral-rangoli'],
    matchingTemplateIds: ['royal-diwali-splendor', 'heritage-deep-lakshmi'],
    suggestedTitles: [
      { en: 'Shubh Deepavali to All!', hi: 'Aap Sabhi ko Shubh Deepavali!' },
      { en: 'Warm Festive Greetings', hi: 'Diwali ki Hardik Shubhkaamnayein' },
      { en: 'Festival of Lights', hi: 'Pavitra Deepotsav' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Shubh Deepavali to All!',
        titleHi: 'Aap Sabhi ko Shubh Deepavali!',
        textEn: 'May the sacred diyas dispel every darkness and bless your journey with health, peace, and abundance. Happy Diwali to all!',
        textHi: 'Deepavali ka yeh paavan prakaash aap sabhi ke jeevan ko sukh, shaanti aur samriddhi se aalokit kare!',
      },
    ],
  },
  {
    id: 'other',
    labelEn: 'Other (Custom)',
    labelHi: 'Other (Apna Relation Likhein)',
    icon: '✏️',
    matchingCategories: ['premium-purple-gold', 'family-friends', 'modern-minimal'],
    suggestedTitles: [
      { en: 'Warm Festive Greetings', hi: 'Shubh Deepavali' },
      { en: 'Happy Diwali', hi: 'Diwali ki Shubhkaamnayein' },
      { en: 'Heartfelt Wishes', hi: 'Dil Se Shubhkaamnayein' },
    ],
    suggestedMessages: [
      {
        titleEn: 'Heartfelt Festive Greetings',
        titleHi: 'Dil Se Shubhkaamnayein',
        textEn: 'Wishing you and your dear ones a luminous festival filled with happiness, good health, and joyful moments!',
        textHi: 'Aapko aur aapke apno ko Diwali ki dher saari hardik shubhkaamnayein aur khushiyan!',
      },
      {
        titleEn: 'Warm Festive Greetings',
        titleHi: 'Shubh Deepavali',
        textEn: 'Sending you heartfelt prayers of prosperity, joy, and peace on this auspicious celebration of lights!',
        textHi: 'Aapko aur aapke pure parivar ko Deepavali ki dher saari shubhkaamnayein aur badhai!',
      },
    ],
  },
  {
    id: 'none',
    labelEn: 'No specific relation (Skip)',
    labelHi: 'Koi specific relation nahi (Skip)',
    icon: '🚫',
    matchingCategories: [],
    suggestedTitles: [],
    suggestedMessages: [],
  },
];

/**
 * Re-orders templates so recommended ones matching the selected relationship appear first,
 * without hiding any other templates.
 */
export function prioritizeTemplatesByRelationship(
  templates: GreetingTemplate[],
  relationshipId?: string
): { recommended: GreetingTemplate[]; others: GreetingTemplate[] } {
  if (!relationshipId || relationshipId === 'none' || relationshipId === 'everyone') {
    return { recommended: [], others: templates };
  }

  const rel = RELATIONSHIPS.find((r) => r.id === relationshipId);
  if (!rel || rel.matchingCategories.length === 0) {
    return { recommended: [], others: templates };
  }

  const recommended: GreetingTemplate[] = [];
  const others: GreetingTemplate[] = [];

  for (const t of templates) {
    const isIdMatch = rel.matchingTemplateIds?.includes(t.id);
    const isCategoryMatch = rel.matchingCategories.includes(t.category);

    if (isIdMatch || isCategoryMatch) {
      recommended.push(t);
    } else {
      others.push(t);
    }
  }

  return { recommended, others };
}
