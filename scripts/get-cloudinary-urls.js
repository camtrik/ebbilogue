require('dotenv').config({ path: '.env.local' })

const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function getImagesFromFolder() {
  try {
    console.log('Fetching from Cloudinary...')
    const result = await cloudinary.search
      .expression('folder:BannerImages/*')
      .max_results(500)
      .execute()

    // console.log('API Response:', result)

    const urls = result.resources.map((resource) => ({
      name: resource.public_id.split('/').pop(),
      url: resource.secure_url,
    }))

    fs.writeFileSync(
      path.join(__dirname, '../public/bannerUrls.json'),
      JSON.stringify(urls, null, 2)
    )
    console.log('URLs saved, total images:', urls.length)
  } catch (error) {
    console.error('Error:', error)
  }
}

getImagesFromFolder()
