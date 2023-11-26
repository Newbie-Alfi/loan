from apps.credit_application.models import CreditApplication
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from services.api.mobile.serializers.credit_application import \
    CreditApplicationSerializer

User = get_user_model()


class CreditApplicationViewSet(viewsets.ModelViewSet):
    queryset = CreditApplication.objects.all()
    serializer_class = CreditApplicationSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        username = request.query_params.get("username", "")
        if username:
            queryset = queryset.filter(username=username)

        queryset = queryset.order_by("-id")[:1]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
