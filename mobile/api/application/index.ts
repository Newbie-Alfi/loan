import { client } from "../config";

interface IApplicationCreateRequest {
  age: number;
  occupation: string;
  annual_income: number;
  monthly_inhand_salary: number;
  num_bank_accounts: number;
  num_of_loan: number;
  num_credit_inquiries: number;
  credit_history_age: number;
  amount_invested_monthly: number;
  payment_behaviour: string;
  monthly_balance: number;
}

function initApplicationApi() {
  async function create(application: IApplicationCreateRequest) {
    const response = await client.post<IApplicationCreateRequest>(
      `api/mobile/credit-applications/`,
      application
    );
  }

  return { create };
}

export const application = initApplicationApi();
