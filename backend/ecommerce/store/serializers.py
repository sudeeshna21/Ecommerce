from rest_framework import serializers
from .data import (
    CARTS, PRODUCTS, ORDERS, DISCOUNTS,
    DISCOUNT_NTH_ORDER, DISCOUNT_PERCENT,
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
        if not cart:
            raise serializers.ValidationError("Cart is empty")

        total = sum(PRODUCTS[i]["price"] * q for i, q in cart.items())
        discount_applied = 0

        if discount_code:
            if discount_code not in DISCOUNTS:
                raise serializers.ValidationError("Invalid discount code")
            if DISCOUNTS[discount_code]["used"]:
                raise serializers.ValidationError("Discount code already used")

            discount_applied = total * DISCOUNT_PERCENT
            total -= discount_applied

        data["cart"] = cart
        data["total"] = total
        data["discount_applied"] = discount_applied
        return data

    def save(self):
        from .data import ORDER_COUNTER  # import inside to mutate update-safe

        user_id = self.validated_data["user_id"]
        cart = self.validated_data["cart"]
        total = self.validated_data["total"]
        discount_code = self.validated_data.get("discount_code", "")
        discount_applied = self.validated_data["discount_applied"]

        # Mark discount code as used
        if discount_code:
            DISCOUNTS[discount_code]["used"] = True

        # Save order
        from .data import ORDERS
        ORDER_COUNTER += 1

        order = {
            "order_id": ORDER_COUNTER,
            "user_id": user_id,
            "items": cart.copy(),
            "total": total,
            "discount_applied": discount_applied,
        }
        ORDERS.append(order)

        CARTS[user_id] = {}  # Clear cart

        return order


class GenerateDiscountSerializer(serializers.Serializer):
    def save(self):
        from .data import ORDER_COUNTER
        if ORDER_COUNTER % DISCOUNT_NTH_ORDER != 0:
            raise serializers.ValidationError("Not eligible for discount code")

        code = str(uuid.uuid4())[:8]
        DISCOUNTS[code] = {"used": False}
        return code


class StatsSerializer(serializers.Serializer):
    def to_representation(self, instance):
        total_items = sum(sum(order["items"].values()) for order in ORDERS)
        total_revenue = sum(order["total"] for order in ORDERS)
        total_discount = sum(order["discount_applied"] for order in ORDERS)

        return {
            "total_orders": len(ORDERS),
            "total_items_purchased": total_items,
            "total_revenue": total_revenue,
            "discount_codes": DISCOUNTS,
            "total_discount_amount": total_discount,
        }
