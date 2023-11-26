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
  useToast,
  ToastTitle,
  ToastDescription,
  Toast,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  SelectPortal,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectContent,
  SelectBackdrop,
  ChevronDownIcon,
  SelectItem,
} from "@gluestack-ui/themed";

import { ACTION_TYPE, PAYMENT_BEHAVIOR, State, reducer } from "./reducer";
import { InputNumber } from "../../../components/InputNumber";
import { api } from "../../../api";
import useAuth from "../../hooks/useAuth";

const DEFAULT_VALUE: State = {
  age: 18,
  annual_income: 12000,
  occupation: "",
  monthly_inhand_salary: 1000,
  amount_invested_monthly: 1000,
  num_bank_accounts: 2,
  num_credit_card: 1,
  num_of_loan: 0,
  num_credit_inquiries: 1,
  credit_history_age: 4,
  payment_behaviour: PAYMENT_BEHAVIOR.LOW_SPEND_LARGE_PAYMENTS,
  monthly_balance: 100,
};

export function CreditRequestForm() {
  const { username } = useAuth();
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE);

  async function onSubmit() {
    try {
      const response = await api.application.create(state, username);
      const allowCredit = response.data.allow_credit;

      toast.show({
        placement: "top",
        render: ({ id }) => {
          if (allowCredit === true) {
            return (
              <Toast nativeID={"toast-" + id} action="attention" variant="solid">
                <VStack space="xs">
                  <ToastTitle>Заявка отправлена</ToastTitle>
                  <ToastDescription>Кредит Одобрен</ToastDescription>
                </VStack>
              </Toast>
            );
          } else if (allowCredit === false) {
            return (
              <Toast nativeID={"toast-" + id} action="attention" variant="solid">
                <VStack space="xs">
                  <ToastTitle>Заявка отправлена</ToastTitle>
                  <ToastDescription>Не одобрено</ToastDescription>
                </VStack>
              </Toast>
            );
          } else {
            return (
              <Toast nativeID={"toast-" + id} action="attention" variant="solid">
                <VStack space="xs">
                  <ToastTitle>Заявка отправлена</ToastTitle>
                  <ToastDescription>
                    На расмотрении. Следите за статусом заявки. Результат будет в ближайшее время
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          }
        },
      });
    } catch (e) {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={"toast-" + id} action="attention" variant="solid">
              <VStack space="xs">
                <ToastTitle>Не удалось отправить заявку</ToastTitle>
                <ToastDescription>{e instanceof Error ? e.message : "Неизвестная ошибка"}</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
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
                onChange={(v) => dispatch({ type: ACTION_TYPE.AGE, payload: v })}
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
                placeholder="Учитель"
                value={state.occupation}
                onChangeText={(v) => {
                  dispatch({ type: ACTION_TYPE.OCCUPATION, payload: v });
                }}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Доход за год, $
            </Text>
            <Input>
              <InputNumber
                value={state.annual_income}
                onChange={(v) => dispatch({ type: ACTION_TYPE.ANNUAL_INCOME, payload: v })}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Ежемесячный доход после уплаты налогов, $
            </Text>
            <Input>
              <InputNumber
                value={state.monthly_inhand_salary}
                onChange={(v) =>
                  dispatch({
                    type: ACTION_TYPE.MONTHLY_INHAND_SALARY,
                    payload: v,
                  })
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
                onChange={(v) => dispatch({ type: ACTION_TYPE.NUM_BANK_ACCOUNTS, payload: v })}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Кол-во действующий карт
            </Text>
            <Input>
              <InputNumber
                value={state.num_credit_card}
                onChange={(v) => dispatch({ type: ACTION_TYPE.NUM_CREDIT_CARD, payload: v })}
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
                onChange={(v) => dispatch({ type: ACTION_TYPE.NUM_OF_LOAN, payload: v })}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Кол-во запросов в бюро
            </Text>
            <Input>
              <InputNumber
                value={state.num_credit_inquiries}
                onChange={(v) =>
                  dispatch({
                    type: ACTION_TYPE.NUM_CREDIT_INQUIRIES,
                    payload: v,
                  })
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
                onChange={(v) => dispatch({ type: ACTION_TYPE.CREDIT_HISTORY_AGE, payload: v })}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Сумма среднемесячных вложений, $
            </Text>
            <Input>
              <InputNumber
                value={state.amount_invested_monthly}
                onChange={(v) =>
                  dispatch({
                    type: ACTION_TYPE.AMOUNT_INVESTED_MONTHLY,
                    payload: v,
                  })
                }
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Потребительское поведение
            </Text>
            <Select
              defaultValue={"Мало потратил, большие платежи"}
              onValueChange={(v) => dispatch({ type: ACTION_TYPE.PAYMENT_BEHAVIOUR, payload: v })}
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput />
                <SelectIcon mr="$3">
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem
                    label="Мало потратил, малые платежи"
                    value={PAYMENT_BEHAVIOR.LOW_SPEND_SMALL_PAYMENTS}
                  />
                  <SelectItem
                    label="Мало потратил, средние платежи"
                    value={PAYMENT_BEHAVIOR.LOW_SPEND_MEDIUM_PAYMENTS}
                  />
                  <SelectItem
                    label="Мало потратил, большие платежи"
                    value={PAYMENT_BEHAVIOR.LOW_SPEND_LARGE_PAYMENTS}
                  />
                  <SelectItem
                    label="Много потратил, малые платежи"
                    value={PAYMENT_BEHAVIOR.HIGH_SPEND_SMALL_PAYMENTS}
                  />
                  <SelectItem
                    label="Много потратил, средние платежи"
                    value={PAYMENT_BEHAVIOR.HIGH_SPEND_MEDIUM_PAYMENTS}
                  />
                  <SelectItem
                    label="Много потратил, большие платежи"
                    value={PAYMENT_BEHAVIOR.HIGH_SPEND_LARGE_PAYMENTS}
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>
          <VStack space="xs">
            <Text color="$textDark500" lineHeight="$xs">
              Среднемесячный баланс, $
            </Text>
            <Input>
              <InputNumber
                value={state.monthly_balance}
                onChange={(v) => dispatch({ type: ACTION_TYPE.MONTHLY_BALANCE, payload: v })}
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
