'use client'

import Image from 'next/image'

interface ResultDisplayProps {
  resultImage: string
  onReset: () => void
}

export default function ResultDisplay({ resultImage, onReset }: ResultDisplayProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(resultImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `personalized-illustration-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download image. Please try right-clicking and saving manually.')
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        <span className="mr-3">🎉</span>
        Your Personalized Illustration is Ready!
      </h2>

      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={resultImage}
            alt="Personalized illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={handleDownload}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Image
        </button>

        <button
          onClick={onReset}
          className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Create Another
        </button>
      </div>

      {/* Social sharing hint */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
        <p className="text-gray-700 mb-3">
          <span className="text-2xl mr-2">💝</span>
          <span className="font-semibold">Love your illustration?</span>
        </p>
        <p className="text-sm text-gray-600">
          Share it with friends and family, or create more personalized illustrations!
        </p>
      </div>
    </div>
  )
}
