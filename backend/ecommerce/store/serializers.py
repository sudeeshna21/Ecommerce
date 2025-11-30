from rest_framework import serializers

from .helper import generate_discount_code
from .data import (
    CARTS, DISCOUNT_CODES, N, ORDERS, DISCOUNT_PERCENT,ORDER_COUNTER
)
# from ecommerce.settings import DISCOUNT_PERCENT, DISCOUNT_NTH_ORDER
import uuid
import requests

class AddToCartSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    item_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

    def save(self):
        user_id = self.validated_data["user_id"]
        item_id = self.validated_data["item_id"]
        qty = self.validated_data["quantity"]

        # Fetch product from FakeStore API
        product_url = f"https://fakestoreapi.com/products/{item_id}"
        product = requests.get(product_url).json()

        user_cart = CARTS.setdefault(user_id, {})

        if item_id in user_cart:
            user_cart[item_id]["qty"] += qty
        else:
            user_cart[item_id] = {
                "id": product["id"],
                "name": product["title"],
                "price": product["price"],
                "image": product["image"],
                "qty": qty,
            }

        return list(user_cart.values())


class UpdateCartSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    item_id = serializers.IntegerField()
    quantity = serializers.IntegerField()  # allow negative too

    def save(self):
        user_id = self.validated_data["user_id"]
        item_id = self.validated_data["item_id"]
        qty_change = self.validated_data["quantity"]

        user_cart = CARTS.setdefault(user_id, {})

        if item_id not in user_cart:
            raise serializers.ValidationError("Item not in cart")

        user_cart[item_id]["qty"] += qty_change

        if user_cart[item_id]["qty"] <= 0:
            del user_cart[item_id]  # REMOVE item instead of erroring

        return list(user_cart.values())


class CheckoutSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    discount_code = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        user_id = data["user_id"]
        discount_code = data.get("discount_code", "")

        cart = CARTS.get(user_id)
        if not cart or len(cart) == 0:
            raise serializers.ValidationError("Cart is empty")

        subtotal = sum(item["price"] * item["qty"] for item in cart.values())
        discount_amount = 0

        if discount_code:
            if discount_code not in DISCOUNT_CODES:
                raise serializers.ValidationError("Invalid discount code")

            if DISCOUNT_CODES[discount_code]["used"]:
                raise serializers.ValidationError("Discount code already used")

            discount_amount = round((subtotal * DISCOUNT_PERCENT) / 100, 2)

        total = round(subtotal - discount_amount, 2)

        data.update({
            "cart": cart,
            "subtotal": subtotal,
            "discount_applied": discount_amount,
            "total": total
        })

        return data

    def save(self):
        global ORDER_COUNTER

        user_id = self.validated_data["user_id"]
        cart = self.validated_data["cart"]
        subtotal = self.validated_data["subtotal"]
        discount_amount = self.validated_data["discount_applied"]
        total = self.validated_data["total"]
        discount_code = self.validated_data.get("discount_code")

        if discount_code:
            DISCOUNT_CODES[discount_code]["used"] = True

        ORDER_COUNTER += 1

        order = {
            "order_id": ORDER_COUNTER,
            "user_id": user_id,
            "items": list(cart.values()),
            "subtotal": subtotal,
            "discount": discount_amount,
            "total": total,
        }
        ORDERS.append(order)

        CARTS[user_id] = {}

        # Generate a reward coupon every Nth order
        new_coupon = None
        if ORDER_COUNTER % N == 0:
            new_coupon = generate_discount_code()

        return order, new_coupon