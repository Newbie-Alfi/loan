from rest_framework import serializers
from apps.credit_application.models import CreditApplication
from django.utils import timezone


class CreditApplicationSerializer(serializers.ModelSerializer):
    month = serializers.IntegerField(read_only=True)
    allow_credit = serializers.BooleanField(read_only=True)

    class Meta:
        model = CreditApplication
        fields = [
            "id",
            "month",
            "age",
            "occupation",
            "annual_income",
            "monthly_inhand_salary",
            "num_bank_accounts",
            "num_of_loan",
            "num_credit_inquiries",
            "credit_history_age",
            "amount_invested_monthly",
            "payment_behaviour",
            "monthly_balance",
            "allow_credit",
        ]

    def save(self, **kwargs):
        self.validated_data["month"] = timezone.now().month

        return super().save(**kwargs)
