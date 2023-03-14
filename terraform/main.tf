provider "google" {
  project = "the-cocktail-collective"
  region = "europe-west4"
}

resource "google_storage_bucket" "images" {
  location = "europe-west4"
  name     = "the-cocktail-collective-images"
  storage_class = "STANDARD"
}

resource "google_storage_bucket_iam_member" "member" {
  bucket   = google_storage_bucket.images.name
  role     = "roles/storage.objectViewer"
  member   = "allUsers"
}
