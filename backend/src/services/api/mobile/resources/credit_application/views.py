from apps.credit_application.models import CreditApplication
from rest_framework import viewsets
from services.api.mobile.serializers.credit_application import \
    CreditApplicationSerializer


class CreditApplicationViewSet(viewsets.ModelViewSet):
    queryset = CreditApplication.objects.all()
    serializer_class = CreditApplicationSerializer
