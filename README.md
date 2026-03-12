# Angine de Poitrine - Website

Modern, mobile-first redesign of the Angine de Poitrine band website featuring prominent artist imagery, bilingual support (French/English), and e-commerce integration.

## 🎨 Features

- **Mobile-First Responsive Design** - Optimized for all devices
- **Bilingual Support** - French and English language switcher with localStorage persistence
- **Hamburger Menu** - Collapsible mobile navigation, static horizontal menu on desktop
- **Custom Audio Player** - HTML5 audio player with custom controls
- **Subtle Dotted Background** - Hand-crafted CSS pattern with imperfect circles
- **Shopify Integration** - E-commerce ready (configuration required)
- **BandsInTown Widget** - Tour dates integration (configuration required)
- **Londrina Outline Font** - Hand-drawn, artistic typography matching brand aesthetic

## 📁 Project Structure

```
AnginePoitrine/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles with mobile-first approach
├── js/
│   ├── script.js           # Main JavaScript functionality
│   └── translations.js     # French/English translations
├── images/                 # Image assets (to be added)
├── data/                   # Data files (to be added)
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Basic Setup

The website is ready to run as-is, but you'll need to add:

1. **Band Photos** - Add hero image and other band photos to `/images/` folder
2. **Audio Files** - Add music tracks to an `/audio/` folder (MP3 format recommended)
3. **Update Video IDs** - Replace YouTube video placeholder IDs in `index.html`

### 2. Required Assets

#### Images Needed:
- `images/band-hero.jpg` - Hero section image (recommended: 1200x800px or larger)
- Additional band member photos (optional)
- Favicon (optional)

#### Audio Files Needed:
Create an `/audio/` folder and add:
- `audio/ababa-hotel.mp3`
- `audio/tamebsz.mp3`
- `audio/sherpa.mp3`
- `audio/laberek.mp3`

### 3. Update Content

#### YouTube Video IDs
In `index.html`, replace the placeholder video IDs:
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID_1" ...>
```

Look for `VIDEO_ID_1`, `VIDEO_ID_2`, `VIDEO_ID_3` and replace with actual YouTube video IDs.

#### Press Kit Link
Update the press kit download link in the Press Kit section.

## 🛒 Shopify Integration

### Prerequisites
1. Create a Shopify store at [shopify.com](https://www.shopify.com)
2. Add your products (vinyls, t-shirts, puzzle, patch, etc.)
3. Get your Storefront API access token

### Setup Steps

1. **Add Shopify Buy Button SDK**

Add this script before the closing `</body>` tag in `index.html`:
```html
<script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"></script>
```

2. **Configure Credentials**

In `js/script.js`, uncomment and fill in the Shopify integration section:
```javascript
var client = ShopifyBuy.buildClient({
    domain: 'your-store.myshopify.com',
    storefrontAccessToken: 'your-storefront-access-token'
});
```

3. **Get Collection ID**

Find your collection ID in Shopify admin and add it to the configuration.

For detailed instructions, see: [Shopify Buy Button Documentation](https://shopify.dev/custom-storefronts/tools/buy-button-js)

## 🎪 BandsInTown Integration

### Setup Steps

1. **Add BandsInTown Script**

Add this script before closing `</body>` tag in `index.html`:
```html
<script charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script>
```

2. **Add Widget Code**

Replace the concerts widget placeholder in `index.html` with:
```html
<a class="bit-widget-initializer" 
   data-artist-name="ANGINE DE POITRINE" 
   data-display-local-dates="false" 
   data-display-past-dates="false" 
   data-auto-style="true" 
   data-text-color="#000000" 
   data-link-color="#000000" 
   data-popup-background-color="#ffffff" 
   data-background-color="rgba(0,0,0,0)" 
   data-display-limit="15" 
   data-link-text-color="#FFFFFF">
</a>
```

For more info: [BandsInTown Widget](https://artists.bandsintown.com/support/widget)

## 🌐 Deployment

### Hosting on https://anginedepoitrine.10-4.app

The site is designed as a static website and can be hosted on:
- **Netlify** (Recommended) - Free tier available, drag-and-drop deployment
- **Vercel** - Free tier with automatic deployments
- **GitHub Pages** - Free, good for static sites
- **Any web server** - Just upload the files

### Deployment Steps (Netlify Example)

1. Create account at [netlify.com](https://www.netlify.com)
2. Drag and drop your project folder
3. Configure custom domain: `anginedepoitrine.10-4.app`
4. Done! Your site is live.

## 🎨 Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --color-black: #000000;
    --color-white: #ffffff;
    /* Add more color variables */
}
```

### Fonts
The site uses:
- **Londrina Outline** - Title/Logo font (Google Fonts)
- **Roboto Mono** - Body text and headings (Google Fonts)

To change fonts, edit the Google Fonts import in `index.html` and update CSS variables.

### Background Pattern
Adjust the dotted background pattern intensity in `css/styles.css`:
```css
body::before {
    opacity: 0.4; /* Adjust this value (0.0 to 1.0) */
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Content Updates

### Changing Translations

Edit `js/translations.js` to update any French or English text:
```javascript
const translations = {
    fr: {
        'nav-home': 'Accueil',
        // Edit any text here
    },
    en: {
        'nav-home': 'Home',
        // Edit any text here
    }
};
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add styles in `css/styles.css`
3. Add translations in `js/translations.js`
4. Add `data-translate` attributes to translatable elements

## 🔧 Development

### Testing Locally

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use VS Code Live Server extension
   ```
3. Navigate to `http://localhost:8000`

### Mobile Testing

Use browser DevTools:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select various device sizes
4. Test hamburger menu, touch interactions

## 📦 What's Included

✅ Responsive HTML5 structure  
✅ Mobile-first CSS with custom dotted background  
✅ Hamburger menu (mobile) / Static header (desktop)  
✅ French/English language switcher  
✅ Custom HTML5 audio player  
✅ Video embeds (YouTube)  
✅ Contact/booking footer with regional organization  
✅ Shopify integration placeholder  
✅ BandsInTown integration placeholder  
✅ Smooth scroll navigation  
✅ SEO-friendly structure  

## 📋 TODO / Next Steps

- [ ] Add band photos to `/images/` folder
- [ ] Add audio files to `/audio/` folder  
- [ ] Update YouTube video IDs in HTML
- [ ] Set up Shopify store and add credentials
- [ ] Configure BandsInTown widget
- [ ] Add press kit PDF and update download link
- [ ] Test on actual mobile devices
- [ ] Run Lighthouse audit for performance
- [ ] Deploy to https://anginedepoitrine.10-4.app

## 🎵 About Angine de Poitrine

Angine de Poitrine is an instrumental duo of microtonal pythago-cubist dada mantra-rock. Formed in 2023, the group presents anti-arena-rock music with a cardboard texture.

**Members:**
- **Khn de Poitrine** - Microtonal guitar and bass
- **Klek de Poitrine** - Drums

## 📞 Support

For questions or issues with the website:
- Review this README
- Check browser console for errors
- Ensure all required assets are in place
- Verify Shopify/BandsInTown credentials if configured

---

**Built with ♥ for Angine de Poitrine**  
© 2026 Angine de Poitrine. All rights reserved.
