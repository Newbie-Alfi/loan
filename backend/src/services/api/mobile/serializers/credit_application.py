from rest_framework import serializers
import joblib
import pandas
from apps.credit_application.models import CreditApplication
from django.utils import timezone

loaded_model = joblib.load("trained_model.pkl")

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
        allow_credit = self.validated_data.pop("allow_credit")
        df = pandas.DataFrame([self.validated_data])

        self.validated_data["month"] = timezone.now().month
        self.validated_data["score_credit"] = loaded_model.predict_proba(df)[:, 1][0]

        return super().save(**kwargs)
