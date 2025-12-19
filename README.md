# 🎨 Child Illustration Personalizer

A Next.js application that transforms children's photos into personalized illustrations using AI. Upload a child's photo, select an illustration style, and watch as AI creates a magical personalized artwork!

## ✨ Features

- **📸 Easy Upload**: Drag-and-drop or click to upload child photos
- **🎭 Multiple Styles**: Choose from 6 pre-designed illustration styles
- **🤖 AI-Powered**: Uses InstantID or Face Swap technology for accurate personalization
- **⚡ Fast Processing**: Results in 30-60 seconds
- **💾 Download**: Save your personalized illustrations
- **📱 Responsive**: Works on desktop, tablet, and mobile

## 🏗️ Architecture

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern, responsive styling
- **React Hooks**: State management

### Backend
- **Next.js API Routes**: Serverless functions
- **Formidable**: Multipart form data handling
- **Sharp**: Image processing (optional)

# Force Vercel to rebuild at 2025-12-19


### AI Pipeline
Multiple AI service options:

1. **Replicate InstantID** (Recommended)
   - Best face consistency
   - High-quality illustration generation
   - Maintains facial features accurately

2. **fal.ai Face Swap**
   - Fast processing
   - Alternative implementation
   - Good for style transfer

3. **Custom Pipeline** (Advanced)
   - Face detection with face-api.js
   - Custom style transfer
   - Full control over processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- An AI service API key (Replicate or fal.ai)

### Installation

1. **Clone and install dependencies:**
```bash
cd child-illustration-app
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your API key:
```env
# Option 1: Replicate (Recommended)
REPLICATE_API_TOKEN=your_replicate_token_here

# Option 2: fal.ai
FAL_KEY=your_fal_key_here
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting API Keys

### Replicate (Recommended)
1. Sign up at [replicate.com](https://replicate.com)
2. Go to your [account settings](https://replicate.com/account/api-tokens)
3. Create a new API token
4. Copy and add to `.env`

### fal.ai (Alternative)
1. Sign up at [fal.ai](https://fal.ai)
2. Navigate to API keys section
3. Generate a new key
4. Copy and add to `.env`

## 📦 Deployment to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/child-illustration-app)

### Manual Deployment

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Add environment variables in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add your API keys:
     - `REPLICATE_API_TOKEN`
     - `FAL_KEY`

5. **Redeploy** to apply environment variables

## 🎨 How It Works

### User Flow
1. **Upload Photo**: User uploads a child's photo
2. **Select Style**: Choose from illustration styles (cartoon, storybook, superhero, etc.)
3. **AI Processing**: 
   - Face detection identifies facial features
   - AI generates illustration in selected style
   - Face features are preserved while applying artistic style
4. **Download**: User receives personalized illustration

### Technical Flow
```
User Upload → API Route → AI Pipeline → Processing → Result URL → Display
```

### AI Pipeline Options

#### Option 1: InstantID (Best Quality)
```typescript
Input Photo → InstantID Model → Illustrated Version
```
- Preserves facial identity
- Applies illustration style
- High consistency

#### Option 2: Face Swap
```typescript
Input Photo → Generate Base → Face Swap → Final Image
```
- Generates base illustration
- Swaps face into template
- Fast processing

#### Option 3: Custom Pipeline
```typescript
Input Photo → Face Detection → Feature Extraction → Style Transfer → Composite
```
- Maximum control
- Custom processing steps
- Requires additional setup

## 🛠️ Customization

### Add New Illustration Styles

Edit `components/IllustrationSelector.tsx`:
```typescript
const illustrations = [
  {
    id: 'your-style',
    name: 'Your Style Name',
    description: 'Description',
    prompt: 'AI prompt for this style',
    thumbnail: '/path/to/thumbnail.jpg',
  },
  // ... more styles
]
```

Update prompts in `lib/ai-pipeline.ts`:
```typescript
const illustrationStyles: Record<string, string> = {
  'your-style': 'detailed prompt for AI generation',
}
```

### Modify AI Models

Edit `lib/ai-pipeline.ts` to change model versions or parameters:
```typescript
const output = await replicate.run('model-name:version', {
  input: {
    // Adjust these parameters
    guidance_scale: 7.5,
    num_inference_steps: 30,
    // ... more options
  },
})
```

## 📁 Project Structure

```
child-illustration-app/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── ImageUploader.tsx     # Photo upload component
│   ├── IllustrationSelector.tsx  # Style selector
│   ├── ResultDisplay.tsx     # Result viewer
│   └── ProcessingStatus.tsx  # Loading indicator
├── lib/
│   ├── ai-pipeline.ts        # Main AI processing
│   └── ai-pipeline-alternative.ts  # Alternative implementations
├── pages/
│   └── api/
│       └── personalize.ts    # API endpoint
├── public/
│   └── illustrations/        # Illustration thumbnails
├── .env.example              # Environment template
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
└── vercel.json               # Vercel deployment config
```

## 🔧 Troubleshooting

### Common Issues

**1. "No AI service configured" error**
- Make sure you've set `REPLICATE_API_TOKEN` or `FAL_KEY` in `.env`
- Restart the development server after adding environment variables

**2. Image upload fails**
- Check file size (max 10MB)
- Ensure file is a valid image format (JPG, PNG, JPEG)
- Check browser console for errors

**3. Processing takes too long**
- First run may take longer as AI models initialize
- Check your internet connection
- Verify API key has sufficient credits

**4. Deployment issues on Vercel**
- Ensure environment variables are set in Vercel dashboard
- Check function timeout settings (increase if needed)
- Review build logs for errors

## 🔒 Security Considerations

- API keys are stored securely in environment variables
- File uploads are validated for type and size
- Temporary files are cleaned up after processing
- CORS is configured for security

## 📊 Performance Optimization

- Image compression before upload
- Lazy loading for components
- API route caching (optional)
- CDN for static assets via Vercel

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional illustration styles
- More AI model integrations
- Batch processing
- User galleries
- Social sharing features

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Acknowledgments

- Built with Next.js and React
- AI powered by Replicate and fal.ai
- UI components styled with Tailwind CSS
- Icons and design inspiration from modern UI/UX patterns

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review Replicate/fal.ai documentation
- Open an issue on GitHub

---

**Made with ❤️ for creating magical memories**
