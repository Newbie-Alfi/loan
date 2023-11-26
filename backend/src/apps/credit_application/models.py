from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class CreditApplication(models.Model):
    class PaymentBehavior(models.TextChoices):
        LOW_SPEND_SMALL_PAYMENTS = "Low_spent_Small_value_payments", "Мало потратил, малые платежи"
        LOW_SPEND_MEDIUM_PAYMENTS = "Low_spent_Medium_value_payments", "Мало потратил, средние платежи"
        LOW_SPEND_LARGE_PAYMENTS = "Low_spent_Large_value_payments", "Мало потратил, большие платежи"
        HIGH_SPEND_SMALL_PAYMENTS = "High_spent_Small_value_payments", "Много потратил, малые платежи"
        HIGH_SPEND_MEDIUM_PAYMENTS = "High_spent_Medium_value_payments", "Много потратил, средние платежи"
        HIGH_SPEND_LARGE_PAYMENTS = "High_spent_Large_value_payments", "Много потратил, большие платежи"

    username = models.CharField(max_length=128, default="")
    month = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(12),
        ],
    )
    age = models.SmallIntegerField()
    occupation = models.CharField(max_length=256)
    annual_income = models.DecimalField(max_digits=12, decimal_places=2)
    monthly_inhand_salary = models.DecimalField(max_digits=12, decimal_places=2)
    num_bank_accounts = models.IntegerField()
    num_credit_card = models.IntegerField(default=0)
    num_of_loan = models.IntegerField()
    num_credit_inquiries = models.IntegerField()
    credit_history_age = models.IntegerField()
    amount_invested_monthly = models.DecimalField(max_digits=12, decimal_places=2)
    payment_behaviour = models.CharField(
        max_length=256,
        choices=PaymentBehavior.choices,
    )
    monthly_balance = models.DecimalField(max_digits=12, decimal_places=2)
    allow_credit = models.BooleanField(default=None, blank=True, null=True)  # конечный вердикт: 0 - хороший клиент (одобрение кредита), 1 - плохой (отказ)
    credit_score = models.DecimalField(max_digits=3, decimal_places=2, default=None, blank=True, null=True)