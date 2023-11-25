export interface State {
  age: number;
  annual_income: number;
  occupation: string;
  monthly_inhand_salary: number;
  num_bank_accounts: number;
  amount_invested_monthly: number;
  num_of_loan: number;
  num_credit_inquiries: number;
  credit_history_age: number;
  payment_behaviour: string;
  monthly_balance: number;
}

export enum ACTION_TYPE {
  AGE = "AGE",
  ANNUAL_INCOME = "ANNUAL_INCOME",
  OCCUPATION = "OCCUPATION",
  MONTHLY_INHAND_SALARY = "MONTHLY_INHAND_SALARY",
  NUM_OF_LOAN = "NUM_OF_LOAN",
  NUM_BANK_ACCOUNTS = "NUM_BANK_ACCOUNTS",
  NUM_CREDIT_INQUIRIES = "NUM_CREDIT_INQUIRIES",
  CREDIT_HISTORY_AGE = "CREDIT_HISTORY_AGE",
  PAYMENT_BEHAVIOUR = "PAYMENT_BEHAVIOUR",
  MONTHLY_BALANCE = "MONTHLY_BALANCE",
}

export enum PAYMENT_BEHAVIOR {
  LOW_SPEND_SMALL_PAYMENTS = "Low_spent_Small_value_payments",
  LOW_SPEND_MEDIUM_PAYMENTS = "Low_spent_Medium_value_payments",
  LOW_SPEND_LARGE_PAYMENTS = "Low_spent_Large_value_payments",
  HIGH_SPEND_SMALL_PAYMENTS = "High_spent_Small_value_payments",
  HIGH_SPEND_MEDIUM_PAYMENTS = "High_spent_Medium_value_payments",
  HIGH_SPEND_LARGE_PAYMENTS = "High_spent_Large_value_payments",
}

interface setAge {
  type: ACTION_TYPE.AGE;
  payload: number;
}

interface setAnnualncome {
  type: ACTION_TYPE.ANNUAL_INCOME;
  payload: number;
}

interface SetOcupation {
  type: ACTION_TYPE.OCCUPATION;
  payload: string;
}

interface SetMounthyInhandSalary {
  type: ACTION_TYPE.MONTHLY_INHAND_SALARY;
  payload: number;
}

interface setNumCredits {
  type: ACTION_TYPE.NUM_CREDIT_INQUIRIES;
  payload: number;
}

interface setHistoryAge {
  type: ACTION_TYPE.CREDIT_HISTORY_AGE;
  payload: number;
}

interface setPaymentBehaviour {
  type: ACTION_TYPE.PAYMENT_BEHAVIOUR;
  payload: string;
}

interface setNumBankAccounts {
  type: ACTION_TYPE.NUM_BANK_ACCOUNTS;
  payload: number;
}

interface setNumOfLoan {
  type: ACTION_TYPE.NUM_OF_LOAN;
  payload: number;
}

interface setMounthyBalance {
  type: ACTION_TYPE.MONTHLY_BALANCE;
  payload: number;
}

type Action =
  | setAge
  | setAnnualncome
  | setMounthyBalance
  | SetOcupation
  | SetMounthyInhandSalary
  | setNumCredits
  | setNumBankAccounts
  | setPaymentBehaviour
  | setNumOfLoan
  | setHistoryAge;

export function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.AGE: {
      return { ...state, age: payload };
    }
    case ACTION_TYPE.ANNUAL_INCOME: {
      return { ...state, annual_income: payload };
    }
    case ACTION_TYPE.CREDIT_HISTORY_AGE: {
      return { ...state, credit_history_age: payload };
    }
    case ACTION_TYPE.MONTHLY_BALANCE: {
      return { ...state, monthly_balance: payload };
    }
    case ACTION_TYPE.MONTHLY_INHAND_SALARY: {
      return { ...state, monthly_inhand_salary: payload };
    }
    case ACTION_TYPE.NUM_BANK_ACCOUNTS: {
      return { ...state, num_bank_accounts: payload };
    }
    // TODO: BACKEND FIELD
    case ACTION_TYPE.NUM_CREDIT_INQUIRIES: {
      return { ...state, num_credit_inquiries: payload };
    }
    case ACTION_TYPE.NUM_OF_LOAN: {
      return { ...state, num_of_loan: payload };
    }
    case ACTION_TYPE.OCCUPATION: {
      return { ...state, occupation: payload };
    }
    case ACTION_TYPE.PAYMENT_BEHAVIOUR: {
      if (
        !Object.values(PAYMENT_BEHAVIOR).includes(payload as PAYMENT_BEHAVIOR)
      ) {
        throw new Error("Invalid PAYMENT_BEHAVIOR");
      }

      return { ...state, payment_behaviour: payload };
    }
    default: {
      throw new Error(`Unknown action type ${type}`);
    }
  }
}
