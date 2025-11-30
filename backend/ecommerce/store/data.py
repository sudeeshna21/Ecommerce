CARTS = {}  # {user_id: {item_id: qty}}
ORDERS = []
DISCOUNT_CODES = {}   # {code: {"used": False}}

N = 3  # Every 3rd order gets a discount code
DISCOUNT_PERCENT = 10
ORDER_COUNTER = 0
