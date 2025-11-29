from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    AddToCartSerializer,
    CheckoutSerializer,
    GenerateDiscountSerializer,
    StatsSerializer
)
from .storage.cart import CARTS


class AddToCartView(GenericAPIView):
    serializer_class = AddToCartSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.save()
        return Response({"cart": cart}, status=status.HTTP_200_OK)


class CartView(GenericAPIView):
    def get(self, request):
        user_id = request.query_params.get("user_id")
        if not user_id:
            return Response({"error": "Missing user_id"}, status=400)

        cart = CARTS.get(int(user_id), {})
        return Response({"cart": cart}, status=status.HTTP_200_OK)


class CheckoutView(GenericAPIView):
    serializer_class = CheckoutSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response({"order": order}, status=status.HTTP_201_CREATED)


class GenerateDiscountView(GenericAPIView):
    serializer_class = GenerateDiscountSerializer

    def post(self, request):
        serializer = self.get_serializer(data={})
        serializer.is_valid(raise_exception=True)
        code = serializer.save()
        return Response({"discount_code": code}, status=status.HTTP_201_CREATED)


class StatsView(GenericAPIView):
    serializer_class = StatsSerializer

    def get(self, request):
        serializer = self.get_serializer()
        return Response(serializer.data, status=status.HTTP_200_OK)
