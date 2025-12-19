import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs/promises'
import path from 'path'
import { personalizeIllustration } from '@/lib/ai-pipeline'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Parse form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    })

    const [fields, files] = await form.parse(req)

    const childPhotoFile = files.childPhoto?.[0]
    const illustration = fields.illustration?.[0]

    if (!childPhotoFile || !illustration) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Read uploaded file
    const childPhotoBuffer = await fs.readFile(childPhotoFile.filepath)
    const childPhotoBase64 = `data:${childPhotoFile.mimetype};base64,${childPhotoBuffer.toString('base64')}`

    // Process with AI
    console.log('Starting AI personalization...')
    const resultUrl = await personalizeIllustration(
      childPhotoBase64,
      illustration
    )

    // Clean up temporary file
    await fs.unlink(childPhotoFile.filepath).catch(() => {})

    res.status(200).json({ resultUrl })
  } catch (error: any) {
    console.error('Personalization error:', error)
    res.status(500).json({
      error: error.message || 'Failed to personalize illustration',
    })
  }
}
