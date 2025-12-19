'use client'

interface ProcessingStatusProps {
  progress: string
}

export function ProcessingStatus({ progress }: ProcessingStatusProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          {/* Animated spinner */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-8 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
              ✨
            </div>
          </div>

          {/* Progress text */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Creating Magic...
          </h3>
          <p className="text-gray-600 mb-6">{progress}</p>

          {/* Progress steps */}
          <div className="space-y-3 text-left">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
              <span className="text-gray-700">Analyzing photo</span>
            </div>
            <div className="flex items-center text-sm">
              <div
                className={`w-2 h-2 rounded-full mr-3 ${
                  progress.includes('Processing') ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
              <span className="text-gray-700">AI personalization</span>
            </div>
            <div className="flex items-center text-sm">
              <div
                className={`w-2 h-2 rounded-full mr-3 ${
                  progress.includes('Finalizing') ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
              <span className="text-gray-700">Generating illustration</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            This may take 30-60 seconds...
          </p>
        </div>
      </div>
    </div>
  )
}
