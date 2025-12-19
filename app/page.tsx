'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import IllustrationSelector from '@/components/IllustrationSelector'
import ResultDisplay from '@/components/ResultDisplay'
import { ProcessingStatus } from '@/components/ProcessingStatus'

export default function Home() {
  const [childPhoto, setChildPhoto] = useState<File | null>(null)
  const [childPhotoPreview, setChildPhotoPreview] = useState<string>('')
  const [selectedIllustration, setSelectedIllustration] = useState<string>('')
  const [processing, setProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [progress, setProgress] = useState<string>('Initializing...')

  const handlePhotoUpload = (file: File, preview: string) => {
    setChildPhoto(file)
    setChildPhotoPreview(preview)
    setError('')
    setResultImage('')
  }

  const handleIllustrationSelect = (illustration: string) => {
    setSelectedIllustration(illustration)
    setError('')
  }

  const handlePersonalize = async () => {
    if (!childPhoto || !selectedIllustration) {
      setError('Please upload a photo and select an illustration')
      return
    }

    setProcessing(true)
    setError('')
    setProgress('Uploading images...')

    try {
      const formData = new FormData()
      formData.append('childPhoto', childPhoto)
      formData.append('illustration', selectedIllustration)

      setProgress('Processing with AI...')
      
      const response = await fetch('/api/personalize', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to personalize illustration')
      }

      setProgress('Finalizing...')
      setResultImage(data.resultUrl)
      setProgress('Complete!')
    } catch (err: any) {
      setError(err.message || 'An error occurred during processing')
      console.error('Personalization error:', err)
    } finally {
      setProcessing(false)
    }
  }

  const handleReset = () => {
    setChildPhoto(null)
    setChildPhotoPreview('')
    setSelectedIllustration('')
    setResultImage('')
    setError('')
    setProgress('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ✨ Child Illustration Personalizer
          </h1>
          <p className="text-xl text-gray-600">
            Transform your child's photo into a magical personalized illustration
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {!resultImage ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Step 1: Upload Photo */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    1
                  </span>
                  Upload Child's Photo
                </h2>
                <ImageUploader
                  onUpload={handlePhotoUpload}
                  preview={childPhotoPreview}
                />
              </div>

              {/* Step 2: Select Illustration */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    2
                  </span>
                  Choose Illustration Style
                </h2>
                <IllustrationSelector
                  selectedIllustration={selectedIllustration}
                  onSelect={handleIllustrationSelect}
                />
              </div>
            </div>
          ) : (
            <ResultDisplay
              resultImage={resultImage}
              onReset={handleReset}
            />
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}

          {/* Processing Status */}
          {processing && <ProcessingStatus progress={progress} />}

          {/* Action Button */}
          {!resultImage && (
            <div className="mt-8 text-center">
              <button
                onClick={handlePersonalize}
                disabled={!childPhoto || !selectedIllustration || processing}
                className={`px-12 py-4 rounded-full text-xl font-semibold transition-all transform hover:scale-105 ${
                  childPhoto && selectedIllustration && !processing
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {processing ? 'Creating Magic...' : '🎨 Personalize Illustration'}
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6">
            <div className="text-4xl mb-3">🎭</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              AI Face Detection
            </h3>
            <p className="text-gray-600 text-sm">
              Advanced AI detects and extracts facial features accurately
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Style Transfer
            </h3>
            <p className="text-gray-600 text-sm">
              Converts photos into beautiful illustrated versions
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Fast Processing
            </h3>
            <p className="text-gray-600 text-sm">
              Get your personalized illustration in seconds
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
