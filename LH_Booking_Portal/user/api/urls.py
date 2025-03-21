from django.urls import path
from .views import RegisterView, LoginView, LogoutView, PasswordResetConfirmView, PasswordResetRequestView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path("password-reset-confirm/<int:user_id>/<str:token>/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
]
