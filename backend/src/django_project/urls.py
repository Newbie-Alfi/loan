from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("services.api.urls")),
]

if settings.ENVIRONMENT == settings.ENVIRONMENT_LOCAL:
    # enabling media files serving for local env
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )
