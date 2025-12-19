/**
 * API Testing Script
 * Test your AI service configuration before deploying
 */

require('dotenv').config()

async function testReplicateAPI() {
  console.log('🧪 Testing Replicate API...')
  
  if (!process.env.REPLICATE_API_TOKEN) {
    console.log('⚠️  REPLICATE_API_TOKEN not found in .env')
    return false
  }

  try {
    const response = await fetch('https://api.replicate.com/v1/models', {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    })

    if (response.ok) {
      console.log('✅ Replicate API connection successful')
      const data = await response.json()
      console.log(`   Found ${data.results?.length || 0} models`)
      return true
    } else {
      console.log('❌ Replicate API connection failed')
      console.log(`   Status: ${response.status} ${response.statusText}`)
      return false
    }
  } catch (error) {
    console.log('❌ Replicate API error:', error.message)
    return false
  }
}

async function testFalAPI() {
  console.log('🧪 Testing fal.ai API...')
  
  if (!process.env.FAL_KEY) {
    console.log('⚠️  FAL_KEY not found in .env')
    return false
  }

  try {
    const response = await fetch('https://fal.run/fal-ai/fast-sdxl', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'test',
        image_size: 'square_hd',
        num_images: 1,
      }),
    })

    if (response.ok || response.status === 202) {
      console.log('✅ fal.ai API connection successful')
      return true
    } else {
      console.log('❌ fal.ai API connection failed')
      console.log(`   Status: ${response.status} ${response.statusText}`)
      const data = await response.json().catch(() => null)
      if (data) console.log('   Response:', data)
      return false
    }
  } catch (error) {
    console.log('❌ fal.ai API error:', error.message)
    return false
  }
}

async function main() {
  console.log('🎨 Child Illustration Personalizer - API Test')
  console.log('=============================================\n')

  let hasWorkingAPI = false

  // Test Replicate
  const replicateWorks = await testReplicateAPI()
  hasWorkingAPI = hasWorkingAPI || replicateWorks
  console.log('')

  // Test fal.ai
  const falWorks = await testFalAPI()
  hasWorkingAPI = hasWorkingAPI || falWorks
  console.log('')

  console.log('=============================================')
  if (hasWorkingAPI) {
    console.log('✨ Success! At least one AI service is configured correctly')
    console.log('   You can now run: npm run dev')
  } else {
    console.log('⚠️  No working AI service found')
    console.log('   Please check your API keys in .env file')
    console.log('')
    console.log('   Get API keys from:')
    console.log('   - Replicate: https://replicate.com/account/api-tokens')
    console.log('   - fal.ai: https://fal.ai/dashboard/keys')
  }
  console.log('=============================================')
}

main().catch(console.error)
