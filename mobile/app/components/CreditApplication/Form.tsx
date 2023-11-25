import { useReducer } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  ButtonText,
  Heading,
  Text,
  VStack,
  FormControl,
  ScrollView,
  InputField,
  Input,
} from "@gluestack-ui/themed";

import { ACTION_TYPE, State, reducer } from "./reducer";
import { InputNumber } from "../../../components/InputNumber";

const DEFAULT_VALUE: State = {
  age: 18,
  annual_income: 0,
  occupation: "",
  monthly_inhand_salary: 0,
  num_bank_accounts: 0,
  num_of_loan: 0,
  num_credit_inquiries: 0,
  credit_history_age: 0,
  payment_behaviour: "",
  monthly_balance: 0,
};

export function CreditRequestForm() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE);

  function onSubmit() {
    console.log(state);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormControl
        p="$4"
        m="$2"
        width="100%"
        height="100%"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        sx={{
          _dark: {
            borderWidth: "$1",
            borderRadius: "$lg",
            borderColor: "$borderDark800",
          },
        }}
      >
        <VStack space="xl">
          <Heading color="$textDark900" lineHeight="$md">
            Обработка заявки
          </Heading>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Возраст
            </Text>
            <Input>
              <InputNumber
                value={state.age}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.AGE, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Должность
            </Text>
            <Input>
              <InputField
                type="text"
                value={state.occupation}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.OCCUPATION, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Доход за год
            </Text>
            <Input>
              <InputNumber
                value={state.annual_income}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.ANNUAL_INCOME, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Ежемесячный доход после уплаты налогов
            </Text>
            <Input>
              <InputNumber
                value={state.monthly_balance}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.MONTHLY_BALANCE, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Кол-во банковских счетов
            </Text>
            <Input>
              <InputNumber
                value={state.num_bank_accounts}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.NUM_BANK_ACCOUNTS, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Кол-во действующих кредитов
            </Text>
            <Input>
              <InputNumber
                value={state.num_of_loan}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.NUM_OF_LOAN, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Возраст кредитной истории
            </Text>
            <Input>
              <InputNumber
                value={state.credit_history_age}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.CREDIT_HISTORY_AGE, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Потребительское поведение
            </Text>
            <Input>
              <InputField
                type="text"
                value={state.payment_behaviour}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.PAYMENT_BEHAVIOUR, payload: v })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Среднемесячный баланс
            </Text>
            <Input>
              <InputNumber
                value={state.monthly_balance}
                onChange={(v) =>
                  dispatch({ type: ACTION_TYPE.MONTHLY_BALANCE, payload: v })
                }
              />
            </Input>
          </VStack>
          <Button width="100%" ml="auto" onPress={onSubmit}>
            <ButtonText color="$white">Отправить</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
