from django.urls import path
from .views import (
    AddToCartView, CartView, CheckoutView, CouponsView,
    GetProductsView, UpdateCartQtyView
)

urlpatterns = [
    path("products/", GetProductsView.as_view(), name="get_products"),
    path("cart/add/", AddToCartView.as_view(), name="add_to_cart"),
    path("cart/update/", UpdateCartQtyView.as_view(), name="update_cart"),
    path("cart/", CartView.as_view(), name="view_cart"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("coupons/<int:user_id>/", CouponsView.as_view(), name="coupons"),
]
