from rest_framework.routers import DefaultRouter
from services.api.mobile.resources.credit_application.views import \
    CreditApplicationViewSet

router = DefaultRouter()

router.register("credit-applications", CreditApplicationViewSet, basename="credit_applications")
