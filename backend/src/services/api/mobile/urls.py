from django.urls import include, path

from .router import router

app_name = "mobile"

urlpatterns = [
    path("", include(router.urls)),
]
