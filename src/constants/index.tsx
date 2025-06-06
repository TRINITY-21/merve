export const GHANA_LOCATIONS = {
  'Greater Accra': [
    'Accra', 'Tema', 'Kasoa', 'Madina', 'Adenta', 'Ashaiman', 'Teshie', 'Nungua',
    'Dansoman', 'Ablekuma', 'Ga East', 'Weija', 'Gbawe', 'Dome', 'Oyarifa'
  ],
  'Ashanti': [
    'Kumasi', 'Obuasi', 'Ejisu', 'Mampong', 'Konongo', 'Bekwai', 'Offinso',
    'Asante Mampong', 'Kuntanase', 'Juaso', 'Feyiase', 'Atwima Nwabiagya'
  ],
  'Western': [
    'Sekondi-Takoradi', 'Tarkwa', 'Prestea', 'Axim', 'Half Assini', 'Elubo',
    'Bogoso', 'Wassa Akropong', 'Dunkwa-on-Offin', 'Asankrangwa'
  ],
  'Central': [
    'Cape Coast', 'Winneba', 'Kasoa', 'Swedru', 'Elmina', 'Saltpond', 'Dunkwa',
    'Assin Fosu', 'Agona Swedru', 'Mankessim', 'Anomabo'
  ],
  'Volta': [
    'Ho', 'Keta', 'Aflao', 'Dzodze', 'Sogakope', 'Akatsi', 'Kpando', 'Hohoe',
    'Jasikan', 'Nkwanta', 'Kadjebi', 'Have'
  ],
  'Eastern': [
    'Koforidua', 'Akosombo', 'New Tafo', 'Akim Oda', 'Mpraeso', 'Begoro',
    'Somanya', 'Akropong', 'Asamankese', 'Kyebi', 'Abetifi'
  ],
  'Northern': [
    'Tamale', 'Yendi', 'Savelugu', 'Gushegu', 'Karaga', 'Tolon', 'Kumbungu',
    'Sagnarigu', 'Zabzugu', 'Tatale'
  ],
  'Upper East': [
    'Bolgatanga', 'Navrongo', 'Bawku', 'Paga', 'Zebilla', 'Sandema', 'Tongo',
    'Zuarungu', 'Garu', 'Tempane'
  ],
  'Upper West': [
    'Wa', 'Lawra', 'Jirapa', 'Tumu', 'Nadowli', 'Hamile', 'Kaleo', 'Funsi',
    'Sissala', 'Gwollu'
  ],
  'Brong-Ahafo': [
    'Sunyani', 'Techiman', 'Berekum', 'Dormaa Ahenkro', 'Nkoranza', 'Wenchi',
    'Kintampo', 'Atebubu', 'Sampa', 'Drobo'
  ],
  'Bono': [
    'Sunyani', 'Dormaa Ahenkro', 'Berekum', 'Wenchi', 'Drobo', 'Sampa',
    'Odumase', 'Nsawkaw', 'Yamfo', 'Suma Ahenkro'
  ],
  'Bono East': [
    'Techiman', 'Nkoranza', 'Kintampo', 'Atebubu', 'Yeji', 'Prang', 'Kwame Danso',
    'Kajaji', 'Jema', 'Tuobodom'
  ],
  'Ahafo': [
    'Goaso', 'Bechem', 'Kenyasi', 'Hwidiem', 'Kukuom', 'Mim', 'Acherensua',
    'Noberkaw', 'Sankore', 'Bomaa'
  ],
  'Oti': [
    'Dambai', 'Nkwanta', 'Kadjebi', 'Jasikan', 'Kete Krachi', 'Chinderi',
    'Worawora', 'Brewaniase', 'Papase', 'Santrokofi'
  ],
  'Savannah': [
    'Damongo', 'Bole', 'Sawla', 'Buipe', 'Yapei', 'Salaga', 'Bamboi',
    'Tuna', 'Larabanga', 'Banda Nkwanta'
  ],
  'North East': [
    'Nalerigu', 'Gambaga', 'Walewale', 'Chereponi', 'Yunyoo', 'Bunkpurugu',
    'Gushegu', 'Saboba', 'Wulensi', 'Karaga'
  ],
  'Western North': [
    'Wiawso', 'Sefwi Bekwai', 'Bibiani', 'Aowin', 'Juaboso', 'Bodi', 'Anhwiaso',
    'Akontombra', 'Enchi', 'Dadieso'
  ]
};



// constants/chatConstants.ts

export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  TYPING_DELAY: 1000,
  AGENT_RESPONSE_DELAY: 2000,
  VIBRATION_DURATION: 50,
  SWIPE_THRESHOLD: 50,
  SCROLL_THRESHOLD: 100,
} as const;

export const QUICK_REPLIES = [
  'Thanks! 👍',
  'Sure, I\'ll check',
  'Give me a moment',
  'Perfect!',
  'On my way',
] as const;

export const EMOJI_REACTIONS = [
  '❤️', 
  '👍', 
  '😂', 
  '😮', 
  '😢', 
  '🙏'
] as const;

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  VOICE: 'voice',
  FILE: 'file',
} as const;

export const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
} as const;

export const CHAT_COLORS = {
  USER_MESSAGE: '#FFCC00',
  AGENT_MESSAGE: 'rgba(255, 255, 255, 0.95)',
  BACKGROUND: ['#f5f7fa', '#c3cfe2'],
  HEADER: ['#FFCC00', '#FFB300'],
  PRIMARY: '#FFCC00',
  SECONDARY: '#1E3A5F',
  ACCENT: '#00BFA5',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: {
    LIGHT: '#E0E0E0',
    MEDIUM: '#9E9E9E',
    DARK: '#616161',
  },
  SUCCESS: '#4CAF50',
  ERROR: '#F44336',
  WARNING: '#FF9800',
} as const;

export const ANIMATION_CONFIG = {
  SPRING: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  TIMING: {
    duration: 300,
  },
  FADE: {
    duration: 200,
  },
} as const;

export const KEYBOARD_CONFIG = {
  IOS_OFFSET: 90,
  ANDROID_OFFSET: 0,
} as const;



// constants/favoritesConstants.ts

export const FAVORITES_CONFIG = {
  GRID_COLUMNS: 2,
  CARD_MARGIN: 16,
  REFRESH_DELAY: 2000,
  ANIMATION_DURATION: 300,
  FILTER_SLIDE_DURATION: 300,
} as const;

export const SORT_OPTIONS = [
  { key: 'date_added', label: 'Recently Added', icon: 'schedule' },
  { key: 'price_low', label: 'Price: Low to High', icon: 'trending-up' },
  { key: 'price_high', label: 'Price: High to Low', icon: 'trending-down' },
  { key: 'rating', label: 'Highest Rated', icon: 'grade' },
  { key: 'distance', label: 'Nearest First', icon: 'location-on' },
  { key: 'name', label: 'Name A-Z', icon: 'sort-by-alpha' },
] as const;

export const CATEGORY_ICONS = {
  all: 'apps',
  phones: 'smartphone',
  accessories: 'headphones',
  laptops: 'laptop',
  furniture: 'chair',
  electronics: 'devices',
  clothing: 'checkroom',
  books: 'menu-book',
  sports: 'sports-soccer',
  beauty: 'spa',
} as const;

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

export const FILTER_RATINGS = [4, 3, 2, 1] as const;

export const DEFAULT_FILTERS = {
  inStock: false,
  verified: false,
  ratings: 0,
} as const;

export const FAV_ANIMATION_CONFIG = {
  FADE: {
    duration: 800,
    useNativeDriver: true,
  },
  SLIDE: {
    tension: 20,
    friction: 7,
    useNativeDriver: true,
  },
  SCALE: {
    tension: 25,
    friction: 8,
    useNativeDriver: true,
  },
  FILTER_SLIDE: {
    duration: 300,
    useNativeDriver: true,
  },
} as const;

export const FAVORITES_COLORS = {
  PRIMARY: '#FFCC00',
  SECONDARY: '#1E3A5F',
  ACCENT: '#00BFA5',
  SUCCESS: '#4CAF50',
  ERROR: '#F44336',
  WARNING: '#FF9800',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: {
    LIGHT: '#E0E0E0',
    MEDIUM: '#9E9E9E',
    DARK: '#616161',
  },
  BACKGROUND: '#F5F5F5',
  CARD: '#FFFFFF',
  SHADOW: {
    LIGHT: 'rgba(0, 0, 0, 0.1)',
    MEDIUM: 'rgba(0, 0, 0, 0.2)',
    DARK: 'rgba(0, 0, 0, 0.3)',
  },
} as const;