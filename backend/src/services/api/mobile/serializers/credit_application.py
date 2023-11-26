import joblib
import pandas
from apps.credit_application.models import CreditApplication
from django.utils import timezone
from django_project.settings.base import BASE_DIR
from rest_framework import serializers

loaded_model = joblib.load(BASE_DIR / "trained_model.pkl")


class CreditApplicationSerializer(serializers.ModelSerializer):
    month = serializers.IntegerField(read_only=True)

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
            "num_credit_card",
            "num_of_loan",
            "num_credit_inquiries",
            "credit_history_age",
            "amount_invested_monthly",
            "payment_behaviour",
            "monthly_balance",
            "allow_credit",
        ]

    def save(self, **kwargs):
        self.validated_data.pop("allow_credit", "")

        self.validated_data["annual_income"] = str(self.validated_data["annual_income"])
        self.validated_data["monthly_inhand_salary"] = str(self.validated_data["monthly_inhand_salary"])
        self.validated_data["amount_invested_monthly"] = str(self.validated_data["amount_invested_monthly"])
        self.validated_data["monthly_balance"] = str(self.validated_data["monthly_balance"])

        self.validated_data["month"] = timezone.now().month

        df = pandas.DataFrame([dict(self.validated_data)])

        credit_score = loaded_model.predict_proba(df)[:, 1][0]
        self.validated_data["credit_score"] = credit_score
        if 0.4 <= credit_score <= 0.6:
            self.validated_data["allow_credit"] = None
        elif credit_score < 0.4:
            self.validated_data["allow_credit"] = False
        else:
            self.validated_data["allow_credit"] = True

        self.validated_data["username"] = self.context["request"].query_params.get("username", "")

        return super().save(**kwargs)
