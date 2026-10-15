/*
  ALL VIDEOS LIVE HERE.
  To add a new video: copy one block, paste it at the top of the list, and change the values.
  - drive:    the ID from the Google Drive link  (drive.google.com/file/d/THIS_PART/view)
  - category: one of the CATEGORIES names below
  - format:   "9:16" (vertical) or "16:9" (landscape)
  - poster:   optional image in the img folder. Leave it out and the Drive thumbnail is used.
  - video:    optional mp4 in the media folder. Leave it out and the video plays from Google Drive.
  - id:       a short name used in links, e.g. videos.html#esl opens that video directly
  - featured: true shows it on the home page too (keep it to 6 for a neat grid).
  Remember: the Drive file must be shared as "Anyone with the link".
*/
/* AUTOMATIC MODE is on: any video added to the Google Drive "Portfolio" folder shows up on the
   website by itself within about 3 hours (or instantly via Actions → "Run workflow" on GitHub).
   The blocks below only add nicer titles, categories and descriptions for chosen videos. */
window.DRIVE_FOLDER_ID = "1f59ZPGWwmH0gVUBg6hEENthW0sld02fu";

window.CATEGORIES = ["Brand & Corporate", "Product Ads", "AI Explainers", "Motion & Logo", "More Work", "Viral AI Reels"];

window.VIDEOS = [
  {
    id: "esl",
    title: "Energy Solutions — Company Profile",
    client: "Energy Solutions (Pvt.) Limited · Freelance",
    category: "Brand & Corporate", format: "16:9", duration: "1:00",
    about: "Animated brand film with logo reveal, animated stats, client highlights and ISO certifications.",
    drive: "1xMh6vojGRcUl8zK8JrqNjojgqwFF2VsQ", poster: "img/esl_poster.jpg", video: "media/esl.mp4",
    featured: true
  },
  {
    id: "vc",
    title: "VC — 3D Logo Reveal",
    category: "Motion & Logo", format: "16:9", duration: "0:15",
    about: "Chrome whale-tail logo animation with water, light rays and a glowing logo lock-up.",
    drive: "1QeDIitJkY4f1pSUrfMnUoVp9Kv4pDMZC", poster: "img/vc.jpg",
    featured: true
  },
  {
    id: "mkt",
    title: "Marketing vs Sales",
    category: "AI Explainers", format: "9:16", duration: "0:52",
    about: "Cinematic 4K AI explainer with visual metaphors and timed captions.",
    drive: "1plK13oJv_d4NjqiVssXnOXHPW3y5eGAo", poster: "img/mkt_11.jpg", video: "media/mkt.mp4",
    featured: true
  },
  {
    id: "glow",
    title: "Glowish by Bia — Body Wash",
    category: "Product Ads", format: "9:16", duration: "0:30",
    about: "AI UGC-style ad with a presenter speaking Roman Urdu, captions and product shots.",
    drive: "1iAzmRMgolecZ9vj0KJs_6I2g8ZU83EXp", poster: "img/glow.jpg", posterPos: "center 20%", video: "media/glow.mp4",
    featured: true
  },
  {
    id: "alif",
    title: "Alif Elegance — Calligraphy Scarves",
    category: "Product Ads", format: "9:16", duration: "0:40",
    about: "Luxury-style product reel with collection reveal, customer reviews and an order call to action.",
    drive: "1tnH3BrYbHEGMdZcf39fsWHnEi2Y1c1-P", poster: "img/alif.jpg", posterPos: "center 70%", video: "media/alif.mp4",
    featured: true
  },
  {
    id: "bibo",
    title: "BIBO Cleanser",
    category: "Product Ads", format: "9:16", duration: "0:15",
    about: "AI product ad with packaging, foam close-ups and a clean hero shot of the cleanser.",
    drive: "1XkauPYvfZXH7lCOqgIk3vuxLwVP9nFAi", poster: "img/bibo.jpg",
    featured: true
  },
  {
    id: "wow",
    title: "Words of Wisdom — Book Trailer",
    client: "Energy Solutions (Pvt.) Limited · Freelance",
    category: "Brand & Corporate", format: "9:16", duration: "0:47",
    about: "Typographic launch trailer with 3D book mockups and AI artwork.",
    drive: "101XzIDOCcwyPDFuZOuPMRZXsJ1vEMJch", poster: "img/wow_book.jpg", video: "media/wow.mp4"
  },
  {
    id: "hajar",
    title: "HAJAR 2-in-1 Racket Lamp",
    category: "Product Ads", format: "16:9", duration: "0:06",
    about: "Short AI product ad showing the mosquito racket that doubles as a bedside lamp.",
    drive: "1b4NH4_12zYigTK9EmDXtwPHcu3Kgs5ie", poster: "img/hajar.jpg"
  },
  {
    id: "biz",
    title: "Business Growth",
    category: "AI Explainers", format: "9:16", duration: "0:22",
    about: "Fast-paced AI office scenes with word-by-word animated captions.",
    drive: "1nTckw8H8jQU6JlLSsn5RIJcABKst7DLX", poster: "img/biz3.jpg", video: "media/biz.mp4"
  },

  /* Viral reels from @khizarcatai — these open on Instagram */
  { title: "Jealousy and a mother's strength", category: "Viral AI Reels", format: "9:16", views: "2.3M", poster: "img/ig1.jpg", link: "https://www.instagram.com/reel/DScv_tRjc5a/" },
  { title: "He fixed his broken leg", category: "Viral AI Reels", format: "9:16", views: "1.3M", poster: "img/ig2.jpg", link: "https://www.instagram.com/reel/DUa5aHajTq-/" },
  { title: "A loving mom turned into a bee", category: "Viral AI Reels", format: "9:16", views: "1.1M", poster: "img/ig3.jpg", link: "https://www.instagram.com/reel/DRuakhHDSaA/" },
  { title: "Greed meets karma", category: "Viral AI Reels", format: "9:16", views: "1.1M", poster: "img/ig4.jpg", link: "https://www.instagram.com/reel/DSssZGLjfH6/" },
  { title: "A warning ignored", category: "Viral AI Reels", format: "9:16", views: "728K", poster: "img/ig5.jpg", link: "https://www.instagram.com/reel/DR2IHG8jQYv/" },
  { title: "The burning plane", category: "Viral AI Reels", format: "9:16", views: "593K", poster: "img/ig6.jpg", link: "https://www.instagram.com/reel/DSXmzWPDTwT/" }
];
