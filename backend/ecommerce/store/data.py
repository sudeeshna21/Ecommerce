CARTS = {}  # {user_id: {item_id: qty}}
ORDERS = []
DISCOUNTS = {}  # {code: {"used": False}}

DISCOUNT_NTH_ORDER = 5
DISCOUNT_PERCENT = 0.10
ORDER_COUNTER = 0

PRODUCTS = {
    1: {"name": "Item A", "price": 100},
    2: {"name": "Item B", "price": 200},
    3: {"name": "Item C", "price": 50},
}
