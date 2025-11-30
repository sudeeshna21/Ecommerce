from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .helper import fetch_products
from .serializers import (
    AddToCartSerializer,
    CheckoutSerializer,
    UpdateCartSerializer
)
from .data import CARTS, DISCOUNT_CODES


class AddToCartView(GenericAPIView):
    serializer_class = AddToCartSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.save()
        return Response({"cart": cart}, status=status.HTTP_200_OK)

class UpdateCartQtyView(GenericAPIView):
    serializer_class = UpdateCartSerializer

    def put(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.save()
        return Response({"cart": cart}, status=200)


class CartView(GenericAPIView):
    def get(self, request):
        user_id = 1  # hardcoding single user for now
        cart = CARTS.get(user_id, {})
        return Response({"cart": list(cart.values())}, status=status.HTTP_200_OK)



class CheckoutView(GenericAPIView):
    serializer_class = CheckoutSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order, reward_code = serializer.save()

        response_data = {
            "message": "Order placed successfully!",
            "order": order
        }

        if reward_code:
            response_data["reward_coupon"] = reward_code

        return Response(response_data, status=200)

class GetProductsView(GenericAPIView):
    def get(self, request):
        products = fetch_products()
        return Response(products)
    
class CouponsView(GenericAPIView):
    def get(self, request, user_id):
        user_coupons = [
            {"code": code, "used": info["used"]}
            for code, info in DISCOUNT_CODES.items()
        ]
        return Response({"coupons": user_coupons})