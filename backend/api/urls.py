from django.urls import path
from .views import LcmCalculatorView

urlpatterns = [
    path('calculate-lcm/', LcmCalculatorView.as_view(), name='calculate_lcm'),
]