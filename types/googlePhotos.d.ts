export interface GooglePhotoItem {
  id: string
  baseUrl: string
  mediaMetadata: {
    width: string
    height: string
  }
  filename: string
}

export interface GooglePhotosData {
  mediaItems: GooglePhotoItem[]
}

export interface PhotoData {
  photoUrl: string
}
