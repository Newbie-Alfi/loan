import { client } from "../config";

interface IApplicationCreateRequest {
  age: number;
  occupation: string;
  annual_income: number;
  monthly_inhand_salary: number;
  num_bank_accounts: number;
  num_credit_card: number;
  num_of_loan: number;
  num_credit_inquiries: number;
  credit_history_age: number;
  amount_invested_monthly: number;
  payment_behaviour: string;
  monthly_balance: number | null;
}

interface IApplicationCreateResponse {
  age: number;
  occupation: string;
  annual_income: number;
  monthly_inhand_salary: number;
  num_bank_accounts: number;
  num_credit_card: number;
  num_of_loan: number;
  num_credit_inquiries: number;
  credit_history_age: number;
  amount_invested_monthly: number;
  payment_behaviour: string;
  monthly_balance: number;
  allow_credit: boolean;
}

function initApplicationApi() {
  async function create(application: IApplicationCreateRequest, username: string) {
    const response = await client.post<IApplicationCreateResponse>(
      `api/mobile/credit-applications/?username=${username}`,
      application
    );

    return response;
  }

  return { create };
}

export const application = initApplicationApi();
