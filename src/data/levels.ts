import { ColoringLevel, ColorItem } from '../types';

export const STANDARD_PALETTE: ColorItem[] = [
  // Group 1: Classic Colors (1 - 10)
  { id: 1, name: 'White', hex: '#FFFFFF', textColor: '#263238' },
  { id: 2, name: 'Black', hex: '#1E1E24', textColor: '#FFFFFF' },
  { id: 3, name: 'Yellow', hex: '#FFC107', textColor: '#263238' },
  { id: 4, name: 'Orange', hex: '#FF6D00', textColor: '#FFFFFF' },
  { id: 5, name: 'Red', hex: '#E53935', textColor: '#FFFFFF' },
  { id: 6, name: 'Blue', hex: '#1E88E5', textColor: '#FFFFFF' },
  { id: 7, name: 'Green', hex: '#00C853', textColor: '#FFFFFF' },
  { id: 8, name: 'Purple', hex: '#8E24AA', textColor: '#FFFFFF' },
  { id: 9, name: 'Brown', hex: '#6D4C41', textColor: '#FFFFFF' },
  { id: 10, name: 'Sky Blue', hex: '#90CAF9', textColor: '#263238' },

  // Group 2: Vibrant Neons & Jewel Tones (11 - 20)
  { id: 11, name: 'Hot Pink', hex: '#FF4081', textColor: '#FFFFFF' },
  { id: 12, name: 'Lime Green', hex: '#76FF03', textColor: '#263238' },
  { id: 13, name: 'Cyan Teal', hex: '#00E5FF', textColor: '#263238' },
  { id: 14, name: 'Lavender', hex: '#B388FF', textColor: '#263238' },
  { id: 15, name: 'Coral Peach', hex: '#FF7043', textColor: '#FFFFFF' },
  { id: 16, name: 'Golden Amber', hex: '#FFD700', textColor: '#263238' },
  { id: 17, name: 'Mint Green', hex: '#69F0AE', textColor: '#263238' },
  { id: 18, name: 'Fuchsia Magenta', hex: '#E040FB', textColor: '#FFFFFF' },
  { id: 19, name: 'Crimson Wine', hex: '#B71C1C', textColor: '#FFFFFF' },
  { id: 20, name: 'Deep Indigo', hex: '#3D5AFE', textColor: '#FFFFFF' },

  // Group 3: Soft Pastels & Deep Tones (21 - 30)
  { id: 21, name: 'Soft Cream', hex: '#FFF9C4', textColor: '#263238' },
  { id: 22, name: 'Baby Pink', hex: '#F8BBD0', textColor: '#263238' },
  { id: 23, name: 'Aqua Ice', hex: '#E0F7FA', textColor: '#263238' },
  { id: 24, name: 'Lilac', hex: '#E1BEE7', textColor: '#263238' },
  { id: 25, name: 'Sunset Bronze', hex: '#D84315', textColor: '#FFFFFF' },
  { id: 26, name: 'Forest Green', hex: '#1B5E20', textColor: '#FFFFFF' },
  { id: 27, name: 'Midnight Navy', hex: '#0D47A1', textColor: '#FFFFFF' },
  { id: 28, name: 'Warm Chocolate', hex: '#4E342E', textColor: '#FFFFFF' },
  { id: 29, name: 'Silver Gray', hex: '#B0BEC5', textColor: '#263238' },
  { id: 30, name: 'Sunshine Gold', hex: '#FFEA00', textColor: '#263238' },
];

export const LEVELS: ColoringLevel[] = [
  {
    id: 'tropical-island',
    title: 'Tropical Island',
    subtitle: 'Sun, palm tree and ocean breeze',
    width: 400,
    height: 420,
    palette: STANDARD_PALETTE,
    regions: [
      // 1. The Sky (10) - bounds the top down to the horizon (y=220) excluding sun and palm
      {
        id: 'sky',
        name: 'Sky',
        number: 10,
        path: 'M 0 0 L 400 0 L 400 220 L 0 220 Z',
        labelX: 350,
        labelY: 70,
        fontSize: 22,
      },
      // 2. The Ocean / Sea (6) - horizon (y=220) down to bottom (y=420)
      {
        id: 'ocean',
        name: 'Ocean',
        number: 6,
        path: 'M 0 220 L 400 220 L 400 420 L 0 420 Z',
        labelX: 55,
        labelY: 260,
        fontSize: 22,
      },
      // 3. The Sun (3) - round sun in upper left
      {
        id: 'sun',
        name: 'Sun',
        number: 3,
        path: 'M 85 45 A 46 46 0 1 1 84.9 45 Z',
        labelX: 85,
        labelY: 96,
        fontSize: 24,
      },
      // 4. The Island Shore (7) - gentle curved sandy mound at the bottom
      {
        id: 'island',
        name: 'Island Shore',
        number: 7,
        path: 'M 50 340 C 90 285, 310 280, 365 340 C 375 350, 330 365, 230 365 C 130 365, 40 355, 50 340 Z',
        labelX: 275,
        labelY: 335,
        fontSize: 22,
      },
      // 5. Palm Tree Trunk - Base segment (9)
      {
        id: 'trunk-1',
        name: 'Trunk Base',
        number: 9,
        path: 'M 188 340 L 195 285 L 218 288 L 221 342 Z',
        labelX: 205,
        labelY: 318,
        fontSize: 18,
      },
      // 6. Palm Tree Trunk - Middle segment (9)
      {
        id: 'trunk-2',
        name: 'Trunk Middle',
        number: 9,
        path: 'M 195 285 L 203 230 L 225 233 L 218 288 Z',
        labelX: 211,
        labelY: 262,
        fontSize: 19,
      },
      // 7. Palm Tree Trunk - Upper segment (9)
      {
        id: 'trunk-3',
        name: 'Trunk Top',
        number: 9,
        path: 'M 203 230 L 214 185 L 232 187 L 225 233 Z',
        labelX: 218,
        labelY: 210,
        fontSize: 18,
      },
      // 8. Palm Leaf - Left low frond (7)
      {
        id: 'leaf-1',
        name: 'Palm Leaf Left Low',
        number: 7,
        path: 'M 220 185 C 180 185, 140 180, 115 185 C 130 178, 142 165, 150 160 C 175 160, 205 170, 220 185 Z',
        labelX: 168,
        labelY: 176,
        fontSize: 19,
      },
      // 9. Palm Leaf - Upper left frond (7)
      {
        id: 'leaf-2',
        name: 'Palm Leaf Upper Left',
        number: 7,
        path: 'M 220 185 C 200 160, 180 135, 172 108 C 182 120, 187 136, 198 140 C 205 130, 208 120, 212 122 C 220 145, 222 168, 220 185 Z',
        labelX: 198,
        labelY: 160,
        fontSize: 19,
      },
      // 10. Palm Leaf - Top upright frond (7)
      {
        id: 'leaf-3',
        name: 'Palm Leaf Top',
        number: 7,
        path: 'M 220 185 C 220 150, 224 125, 238 108 C 248 115, 260 140, 275 142 C 265 152, 248 168, 220 185 Z',
        labelX: 242,
        labelY: 154,
        fontSize: 19,
      },
      // 11. Palm Leaf - Upper right frond (7)
      {
        id: 'leaf-4',
        name: 'Palm Leaf Upper Right',
        number: 7,
        path: 'M 220 185 C 245 170, 280 160, 318 168 C 295 175, 280 165, 272 172 C 285 182, 270 190, 255 190 C 240 188, 228 186, 220 185 Z',
        labelX: 268,
        labelY: 179,
        fontSize: 19,
      },
      // 12. Palm Leaf - Lower right curving frond (7)
      {
        id: 'leaf-5',
        name: 'Palm Leaf Lower Right',
        number: 7,
        path: 'M 220 185 C 240 195, 265 208, 285 235 C 295 248, 302 265, 302 268 C 292 260, 280 250, 278 245 C 275 255, 268 250, 260 238 C 245 218, 232 200, 220 185 Z',
        labelX: 262,
        labelY: 222,
        fontSize: 19,
      },
    ],
  },
  {
    id: 'hot-air-balloon',
    title: 'Hot Air Balloon',
    subtitle: 'Float among the clouds and sun',
    width: 400,
    height: 420,
    palette: STANDARD_PALETTE,
    regions: [
      // Sky background
      {
        id: 'sky-hab',
        name: 'Sky',
        number: 10,
        path: 'M 0 0 L 400 0 L 400 340 L 0 340 Z',
        labelX: 50,
        labelY: 60,
        fontSize: 22,
      },
      // Distant Green Mountains
      {
        id: 'mountains',
        name: 'Green Hills',
        number: 7,
        path: 'M 0 340 Q 90 290 180 340 T 360 330 L 400 340 L 400 420 L 0 420 Z',
        labelX: 200,
        labelY: 380,
        fontSize: 22,
      },
      // Sun
      {
        id: 'sun-hab',
        name: 'Sun',
        number: 3,
        path: 'M 340 30 A 42 42 0 1 1 339.9 30 Z',
        labelX: 340,
        labelY: 76,
        fontSize: 22,
      },
      // Fluffy Cloud Left
      {
        id: 'cloud-left',
        name: 'White Cloud Left',
        number: 1,
        path: 'M 40 150 C 40 135 60 120 85 125 C 95 105 130 105 145 125 C 165 125 175 145 165 165 C 170 180 150 190 130 185 C 115 195 85 195 70 185 C 50 185 40 170 40 150 Z',
        labelX: 105,
        labelY: 155,
        fontSize: 20,
      },
      // Fluffy Cloud Right
      {
        id: 'cloud-right',
        name: 'White Cloud Right',
        number: 1,
        path: 'M 280 130 C 280 115 295 105 315 110 C 325 90 355 90 368 110 C 385 110 395 130 385 145 C 390 160 375 170 355 165 C 340 175 315 175 305 165 C 290 165 280 150 280 130 Z',
        labelX: 335,
        labelY: 138,
        fontSize: 20,
      },
      // Balloon Stripe 1 (Left Outer - Red)
      {
        id: 'balloon-stripe-1',
        name: 'Balloon Stripe Red Left',
        number: 5,
        path: 'M 195 80 C 170 80 140 100 135 140 C 130 180 160 220 185 240 L 195 240 C 175 215 160 180 165 140 C 170 105 185 85 195 80 Z',
        labelX: 152,
        labelY: 160,
        fontSize: 20,
      },
      // Balloon Stripe 2 (Mid Left - Orange)
      {
        id: 'balloon-stripe-2',
        name: 'Balloon Stripe Orange',
        number: 4,
        path: 'M 195 80 C 185 85 170 105 165 140 C 160 180 175 215 195 240 L 205 240 C 190 215 185 180 188 140 C 190 105 200 85 205 80 Z',
        labelX: 182,
        labelY: 160,
        fontSize: 20,
      },
      // Balloon Stripe 3 (Center - Yellow)
      {
        id: 'balloon-stripe-3',
        name: 'Balloon Stripe Yellow Center',
        number: 3,
        path: 'M 205 80 C 200 85 190 105 188 140 C 185 180 190 215 205 240 L 215 240 C 230 215 235 180 232 140 C 230 105 220 85 215 80 Z',
        labelX: 210,
        labelY: 160,
        fontSize: 20,
      },
      // Balloon Stripe 4 (Mid Right - Blue)
      {
        id: 'balloon-stripe-4',
        name: 'Balloon Stripe Blue',
        number: 6,
        path: 'M 215 80 C 220 85 230 105 232 140 C 235 180 230 215 215 240 L 225 240 C 245 215 260 180 255 140 C 250 105 235 85 225 80 Z',
        labelX: 238,
        labelY: 160,
        fontSize: 20,
      },
      // Balloon Stripe 5 (Right Outer - Purple)
      {
        id: 'balloon-stripe-5',
        name: 'Balloon Stripe Purple Right',
        number: 8,
        path: 'M 225 80 C 235 85 250 105 255 140 C 260 180 245 215 225 240 L 235 240 C 260 220 290 180 285 140 C 280 100 250 80 225 80 Z',
        labelX: 268,
        labelY: 160,
        fontSize: 20,
      },
      // Basket (Brown)
      {
        id: 'balloon-basket',
        name: 'Basket',
        number: 9,
        path: 'M 195 265 L 225 265 L 222 288 L 198 288 Z',
        labelX: 210,
        labelY: 280,
        fontSize: 16,
      },
    ],
  },
  {
    id: 'cosmic-rocket',
    title: 'Cosmic Voyage',
    subtitle: 'Blast off through the starry galaxy',
    width: 400,
    height: 420,
    palette: STANDARD_PALETTE,
    regions: [
      // Deep Space (Black)
      {
        id: 'deep-space',
        name: 'Deep Space',
        number: 2,
        path: 'M 0 0 L 400 0 L 400 420 L 0 420 Z',
        labelX: 50,
        labelY: 60,
        fontSize: 22,
      },
      // Smiling Moon (White)
      {
        id: 'moon',
        name: 'Moon',
        number: 1,
        path: 'M 320 40 C 370 60 380 120 340 150 C 330 110 290 80 320 40 Z',
        labelX: 338,
        labelY: 95,
        fontSize: 20,
      },
      // Saturn Planet Body (Orange)
      {
        id: 'planet-saturn',
        name: 'Saturn Planet',
        number: 4,
        path: 'M 80 110 A 35 35 0 1 1 79.9 110 Z',
        labelX: 80,
        labelY: 116,
        fontSize: 20,
      },
      // Saturn Ring (Yellow)
      {
        id: 'saturn-ring',
        name: 'Saturn Rings',
        number: 3,
        path: 'M 35 110 C 35 95 125 95 125 110 C 125 125 35 125 35 110 Z',
        labelX: 110,
        labelY: 104,
        fontSize: 16,
      },
      // Big Star Left (Yellow)
      {
        id: 'star-left',
        name: 'Yellow Star',
        number: 3,
        path: 'M 70 240 L 76 254 L 92 255 L 79 265 L 83 280 L 70 270 L 57 280 L 61 265 L 48 255 L 64 254 Z',
        labelX: 70,
        labelY: 264,
        fontSize: 15,
      },
      // Big Star Right (Yellow)
      {
        id: 'star-right',
        name: 'Yellow Star',
        number: 3,
        path: 'M 340 280 L 345 292 L 358 293 L 348 301 L 351 313 L 340 305 L 329 313 L 332 301 L 322 293 L 335 292 Z',
        labelX: 340,
        labelY: 304,
        fontSize: 15,
      },
      // Rocket Body (White)
      {
        id: 'rocket-body',
        name: 'Rocket Fuselage',
        number: 1,
        path: 'M 200 120 C 225 160 230 220 225 270 L 175 270 C 170 220 175 160 200 120 Z',
        labelX: 200,
        labelY: 215,
        fontSize: 22,
      },
      // Rocket Nose Cone (Red)
      {
        id: 'rocket-nose',
        name: 'Rocket Nose Cone',
        number: 5,
        path: 'M 200 90 L 220 140 L 180 140 Z',
        labelX: 200,
        labelY: 125,
        fontSize: 18,
      },
      // Rocket Window (Sky Blue)
      {
        id: 'rocket-window',
        name: 'Porthole Window',
        number: 10,
        path: 'M 200 175 A 18 18 0 1 1 199.9 175 Z',
        labelX: 200,
        labelY: 180,
        fontSize: 18,
      },
      // Rocket Fin Left (Blue)
      {
        id: 'fin-left',
        name: 'Wing Fin Left',
        number: 6,
        path: 'M 175 230 L 140 280 L 175 270 Z',
        labelX: 160,
        labelY: 265,
        fontSize: 17,
      },
      // Rocket Fin Right (Blue)
      {
        id: 'fin-right',
        name: 'Wing Fin Right',
        number: 6,
        path: 'M 225 230 L 260 280 L 225 270 Z',
        labelX: 240,
        labelY: 265,
        fontSize: 17,
      },
      // Rocket Booster Exhaust (Purple)
      {
        id: 'booster',
        name: 'Exhaust Engine',
        number: 8,
        path: 'M 185 270 L 215 270 L 220 285 L 180 285 Z',
        labelX: 200,
        labelY: 280,
        fontSize: 15,
      },
      // Rocket Flame (Red outer, Orange inner)
      {
        id: 'flame-outer',
        name: 'Rocket Flame Outer',
        number: 5,
        path: 'M 180 285 Q 200 375 200 380 Q 200 375 220 285 Z',
        labelX: 200,
        labelY: 345,
        fontSize: 20,
      },
      {
        id: 'flame-inner',
        name: 'Rocket Flame Inner',
        number: 4,
        path: 'M 188 285 Q 200 335 200 340 Q 200 335 212 285 Z',
        labelX: 200,
        labelY: 310,
        fontSize: 18,
      },
    ],
  },
  {
    id: 'ocean-life',
    title: 'Playful Clownfish',
    subtitle: 'Swimming through coral and bubbles',
    width: 400,
    height: 420,
    palette: STANDARD_PALETTE,
    regions: [
      // Deep Blue Water
      {
        id: 'water',
        name: 'Ocean Water',
        number: 6,
        path: 'M 0 0 L 400 0 L 400 350 L 0 350 Z',
        labelX: 50,
        labelY: 70,
        fontSize: 22,
      },
      // Sandy Seabed
      {
        id: 'seabed',
        name: 'Sandy Seabed',
        number: 3,
        path: 'M 0 350 Q 120 330 220 350 T 400 345 L 400 420 L 0 420 Z',
        labelX: 200,
        labelY: 385,
        fontSize: 22,
      },
      // Seaweed Left (Green)
      {
        id: 'seaweed-1',
        name: 'Seaweed Tall',
        number: 7,
        path: 'M 30 400 Q 15 300 40 220 Q 55 300 45 400 Z',
        labelX: 35,
        labelY: 280,
        fontSize: 18,
      },
      // Seaweed Right (Green)
      {
        id: 'seaweed-2',
        name: 'Seaweed Leaf',
        number: 7,
        path: 'M 55 410 Q 75 320 60 250 Q 85 330 70 410 Z',
        labelX: 70,
        labelY: 330,
        fontSize: 18,
      },
      // Coral Branch (Purple)
      {
        id: 'coral',
        name: 'Purple Coral',
        number: 8,
        path: 'M 320 400 L 325 320 C 310 300 330 280 345 300 C 360 280 380 300 365 330 L 375 400 Z',
        labelX: 345,
        labelY: 350,
        fontSize: 19,
      },
      // Starfish (Red)
      {
        id: 'starfish',
        name: 'Red Starfish',
        number: 5,
        path: 'M 280 370 L 285 382 L 298 383 L 288 391 L 291 403 L 280 395 L 269 403 L 272 391 L 262 383 L 275 382 Z',
        labelX: 280,
        labelY: 390,
        fontSize: 15,
      },
      // Air Bubble 1 (Sky Blue)
      {
        id: 'bubble-1',
        name: 'Water Bubble',
        number: 10,
        path: 'M 120 90 A 20 20 0 1 1 119.9 90 Z',
        labelX: 120,
        labelY: 116,
        fontSize: 18,
      },
      // Air Bubble 2 (Sky Blue)
      {
        id: 'bubble-2',
        name: 'Water Bubble Small',
        number: 10,
        path: 'M 145 50 A 14 14 0 1 1 144.9 50 Z',
        labelX: 145,
        labelY: 68,
        fontSize: 15,
      },
      // Clownfish Body Section 1 - Head (Orange)
      {
        id: 'fish-head',
        name: 'Fish Head',
        number: 4,
        path: 'M 130 200 C 130 160 170 145 190 145 L 190 255 C 170 255 130 240 130 200 Z',
        labelX: 160,
        labelY: 205,
        fontSize: 20,
      },
      // Clownfish White Stripe 1
      {
        id: 'fish-stripe-1',
        name: 'White Stripe 1',
        number: 1,
        path: 'M 190 145 L 210 148 L 210 252 L 190 255 Z',
        labelX: 200,
        labelY: 205,
        fontSize: 18,
      },
      // Clownfish Body Section 2 - Middle (Orange)
      {
        id: 'fish-body-mid',
        name: 'Fish Mid Body',
        number: 4,
        path: 'M 210 148 L 245 160 L 245 240 L 210 252 Z',
        labelX: 228,
        labelY: 205,
        fontSize: 19,
      },
      // Clownfish White Stripe 2
      {
        id: 'fish-stripe-2',
        name: 'White Stripe 2',
        number: 1,
        path: 'M 245 160 L 260 168 L 260 232 L 245 240 Z',
        labelX: 252,
        labelY: 205,
        fontSize: 17,
      },
      // Clownfish Tail Base (Orange)
      {
        id: 'fish-tail-base',
        name: 'Fish Tail Base',
        number: 4,
        path: 'M 260 168 L 280 185 L 280 215 L 260 232 Z',
        labelX: 270,
        labelY: 205,
        fontSize: 16,
      },
      // Clownfish Tail Fin (Orange)
      {
        id: 'fish-tail-fin',
        name: 'Fish Tail Fin',
        number: 4,
        path: 'M 280 185 C 310 160 330 150 330 170 L 320 200 L 330 230 C 330 250 310 240 280 215 Z',
        labelX: 305,
        labelY: 205,
        fontSize: 19,
      },
      // Fish Eye (Black)
      {
        id: 'fish-eye',
        name: 'Fish Eye Pupil',
        number: 2,
        path: 'M 155 180 A 6 6 0 1 1 154.9 180 Z',
        labelX: 155,
        labelY: 188,
        fontSize: 12,
      },
    ],
  },
];
