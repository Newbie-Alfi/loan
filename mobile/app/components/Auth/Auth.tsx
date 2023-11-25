import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { StyleSheet } from "react-native";
import {
  CircleIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
} from "@gluestack-ui/themed";
import { SignUpForm } from "./SignUpForm";

export function Auth() {
  const [form, setForm] = useState<string>("sign-in");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RadioGroup value={form} onChange={setForm}>
        <HStack space="2xl">
          <Radio value="sign-in">
            <RadioIndicator mr="$2">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Авторизация</RadioLabel>
          </Radio>
          <Radio value="sign-up">
            <RadioIndicator mr="$2">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Регистрация</RadioLabel>
          </Radio>
        </HStack>
      </RadioGroup>
      {form === "sign-in" ? <SignInForm /> : <SignUpForm />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});
