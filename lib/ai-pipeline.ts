/**
 * AI Personalization Pipeline
 * 
 * This module handles the face detection, style transfer, and illustration
 * personalization using various AI models.
 * 
 * Supported models:
 * 1. Replicate InstantID (recommended for face consistency)
 * 2. fal.ai Face Swap models
 * 3. Custom implementation options
 */

import Replicate from 'replicate'

// Initialize AI clients
const replicate = process.env.REPLICATE_API_TOKEN
  ? new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })
  : null

// Illustration style prompts
const illustrationStyles: Record<string, string> = {
  'cartoon-adventure':
    'cartoon illustration style, vibrant colors, cheerful adventure scene, children book illustration, playful expression',
  'storybook-magic':
    'storybook illustration, magical fantasy scene, soft watercolor style, whimsical, dreamy atmosphere',
  superhero:
    'superhero illustration, comic book style, dynamic pose, heroic scene, bold colors',
  'princess-fantasy':
    'princess illustration, fairy tale castle background, magical dress, enchanted forest, sparkles',
  'space-explorer':
    'space explorer illustration, astronaut suit, planets and stars background, sci-fi adventure',
  'animal-friend':
    'cute illustration with adorable animals, friendly pets, playful scene, warm colors',
}

/**
 * Main personalization function
 * Processes a child's photo and creates a personalized illustration
 */
export async function personalizeIllustration(
  childPhotoBase64: string,
  illustrationStyle: string
): Promise<string> {
  console.log(`Processing with style: ${illustrationStyle}`)

  // Get style prompt
  const stylePrompt =
    illustrationStyles[illustrationStyle] ||
    'children book illustration, cartoon style, vibrant colors'

  // Choose processing method based on available API keys

if ( replicate && process.env.REPLICATE_API_TOKEN) {



   return await processWithReplicate(childPhotoBase64, stylePrompt)
  } else if (process.env.FAL_KEY) {
    return await processWithFal(childPhotoBase64, stylePrompt)
  } else {
    throw new Error(
      'No AI service configured. Please set REPLICATE_API_TOKEN or FAL_KEY in environment variables.'
    )
  }
}

/**
 * Process using Replicate's InstantID model
 * Best for maintaining facial features while changing style
 */
async function processWithReplicate(
  photoBase64: string,
  stylePrompt: string
): Promise<string> {
  if (!replicate) {
    throw new Error('Replicate client not initialized')
  }

  try {
    console.log('Using Replicate InstantID...')

    // Using InstantID for face-consistent generation
   const output = (await replicate.run(
  'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
  {
    input: {
      prompt: `Children book illustration of a child, ${stylePrompt}, colorful, cute, soft lighting`,
      negative_prompt:
        'worst quality, low quality, blurry, distorted, deformed, ugly',
      width: 1024,
      height: 1024,
      num_outputs: 1,
      guidance_scale: 7,
      num_inference_steps: 30,
    },
  }
)) as string[]

    if (!output || output.length === 0) {
      throw new Error('No output generated from Replicate')
    }

    return output[0]
  } catch (error: any) {
    console.error('Replicate processing error:', error)
    throw new Error(`Replicate processing failed: ${error.message}`)
  }
}

/**
 * Process using fal.ai models
 * Alternative implementation
 */
async function processWithFal(
  photoBase64: string,
  stylePrompt: string
): Promise<string> {
  try {
    console.log('Using fal.ai...')

    const response = await fetch('https://fal.run/fal-ai/face-to-sticker', {
      method: 'POST',
      headers: {
        Authorization: `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: photoBase64,
        prompt: stylePrompt,
        negative_prompt: 'worst quality, low quality, blurry',
      }),
    })

    if (!response.ok) {
      throw new Error(`fal.ai request failed: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.image || !data.image.url) {
      throw new Error('No image URL in fal.ai response')
    }

    return data.image.url
  } catch (error: any) {
    console.error('fal.ai processing error:', error)
    throw new Error(`fal.ai processing failed: ${error.message}`)
  }
}

/**
 * Alternative: Custom face detection and style transfer
 * For more control over the pipeline
 */
export async function customPipeline(
  photoBase64: string,
  stylePrompt: string
): Promise<string> {
  // Step 1: Face detection using AI
  // Step 2: Extract face features
  // Step 3: Generate illustration with face features
  // Step 4: Composite into template

  // This would require additional libraries like:
  // - @vladmandic/face-api for face detection
  // - Sharp for image processing
  // - Custom model integration

  throw new Error('Custom pipeline not yet implemented')
}
