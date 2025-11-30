import requests
import uuid
from .data import DISCOUNT_CODES

FAKESTORE_API = "https://fakestoreapi.com/products"

def fetch_products():
    response = requests.get(FAKESTORE_API)
    return response.json()

def generate_discount_code():
    code = "SAVE10-" + uuid.uuid4().hex[:6].upper()
    DISCOUNT_CODES[code] = {"used": False}
    return code