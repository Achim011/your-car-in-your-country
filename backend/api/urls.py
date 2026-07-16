from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health_check, name="health-check"),
    path("auth/register/", views.register, name="auth-register"),
    path("auth/login/", views.login, name="auth-login"),
    path("auth/me/", views.me, name="auth-me"),
    path("auth/logout/", views.logout, name="auth-logout"),
]
