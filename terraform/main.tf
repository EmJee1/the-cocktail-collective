provider "google" {
  project = "the-cocktail-collective"
  credentials = file("service-account.json")
  region = "europe-west4"
}

resource "google_storage_bucket" "the-cocktail-collective-images" {
  location = "europe-west4"
  name     = "the-cocktail-collective-images"
  storage_class = "STANDARD"
}
