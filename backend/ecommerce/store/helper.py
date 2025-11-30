import requests

FAKESTORE_API = "https://fakestoreapi.com/products"

def fetch_products():
    response = requests.get(FAKESTORE_API)
    return response.json()
