from django.urls import path
from .views import (
    AddToCartView, CartView, CheckoutView,
    GenerateDiscountView, StatsView
)

urlpatterns = [
    path("cart/add/", AddToCartView.as_view(), name="add_to_cart"),
    path("cart/", CartView.as_view(), name="view_cart"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("admin/discount/generate/", GenerateDiscountView.as_view(), name="generate_discount"),
    path("admin/stats/", StatsView.as_view(), name="view_stats"),
]
