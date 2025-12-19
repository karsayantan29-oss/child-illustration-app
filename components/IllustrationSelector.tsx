'use client'

interface IllustrationSelectorProps {
  selectedIllustration: string
  onSelect: (illustration: string) => void
}

// Sample illustration templates with base64 placeholders
// In production, these would be actual illustration images
const illustrations = [
  {
    id: 'cartoon-adventure',
    name: 'Cartoon Adventure',
    description: 'Fun cartoon style with vibrant colors',
    prompt: 'cartoon illustration style, vibrant colors, cheerful adventure scene, children book illustration',
    thumbnail: '/illustrations/cartoon.jpg', // You'll add these
  },
  {
    id: 'storybook-magic',
    name: 'Storybook Magic',
    description: 'Magical storybook illustration',
    prompt: 'storybook illustration, magical fantasy scene, soft watercolor style, whimsical',
    thumbnail: '/illustrations/storybook.jpg',
  },
  {
    id: 'superhero',
    name: 'Superhero',
    description: 'Epic superhero illustration',
    prompt: 'superhero illustration, comic book style, dynamic pose, heroic scene',
    thumbnail: '/illustrations/superhero.jpg',
  },
  {
    id: 'princess-fantasy',
    name: 'Princess Fantasy',
    description: 'Enchanted princess illustration',
    prompt: 'princess illustration, fairy tale castle, magical dress, enchanted forest',
    thumbnail: '/illustrations/princess.jpg',
  },
  {
    id: 'space-explorer',
    name: 'Space Explorer',
    description: 'Cosmic space adventure',
    prompt: 'space explorer illustration, astronaut suit, planets and stars, sci-fi adventure',
    thumbnail: '/illustrations/space.jpg',
  },
  {
    id: 'animal-friend',
    name: 'Animal Friend',
    description: 'Cute animal companion scene',
    prompt: 'cute illustration with adorable animals, friendly pets, playful scene',
    thumbnail: '/illustrations/animals.jpg',
  },
]

export default function IllustrationSelector({
  selectedIllustration,
  onSelect,
}: IllustrationSelectorProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
        {illustrations.map((illust) => (
          <div
            key={illust.id}
            onClick={() => onSelect(illust.id)}
            className={`relative cursor-pointer rounded-xl overflow-hidden transition-all transform hover:scale-105 ${
              selectedIllustration === illust.id
                ? 'ring-4 ring-purple-500 shadow-xl'
                : 'ring-2 ring-gray-200 hover:ring-purple-300'
            }`}
          >
            {/* Placeholder gradient for demo - replace with actual images */}
            <div
              className={`h-40 bg-gradient-to-br ${
                illust.id === 'cartoon-adventure'
                  ? 'from-yellow-400 to-orange-500'
                  : illust.id === 'storybook-magic'
                  ? 'from-purple-400 to-pink-500'
                  : illust.id === 'superhero'
                  ? 'from-red-500 to-blue-600'
                  : illust.id === 'princess-fantasy'
                  ? 'from-pink-400 to-purple-500'
                  : illust.id === 'space-explorer'
                  ? 'from-blue-600 to-indigo-900'
                  : 'from-green-400 to-teal-500'
              } flex items-center justify-center text-white text-4xl font-bold`}
            >
              {illust.name.split(' ')[0][0]}
            </div>

            {/* Selection indicator */}
            {selectedIllustration === illust.id && (
              <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {/* Info */}
            <div className="p-3 bg-white">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">
                {illust.name}
              </h3>
              <p className="text-xs text-gray-600">{illust.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Custom illustration option */}
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-purple-300">
        <p className="text-sm text-gray-700 text-center">
          💡 <span className="font-semibold">Pro Tip:</span> You can also upload your own
          illustration template!
        </p>
      </div>
    </div>
  )
}
