import { useState } from "react";
import { Button, ButtonText, Text, VStack, FormControl, InputField, Input } from "@gluestack-ui/themed";

export function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function onSubmit() {
    console.log(username);
    console.log(password);
    console.log(confirmPassword);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <FormControl
      p="$4"
      m="$2"
      width="100%"
      sx={{
        _dark: {
          borderWidth: "$1",
          borderRadius: "$lg",
          borderColor: "$borderDark800",
        },
      }}
    >
      <VStack space="xl">
        <VStack space="xs">
          <Text color="$textDark500" lineHeight="$xs">
            Логин
          </Text>
          <Input>
            <InputField type="text" value={username} onChangeText={(value) => setUsername(value)} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$textDark500" lineHeight="$xs">
            Пароль
          </Text>
          <Input>
            <InputField type="text" value={password} onChangeText={(value) => setPassword(value)} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$textDark500" lineHeight="$xs">
            Подтверждение пароля
          </Text>
          <Input>
            <InputField
              type="text"
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
            />
          </Input>
        </VStack>
        <Button
          width="100%"
          ml="auto"
          onPress={onSubmit}
          disabled={notValidPasswords(password, confirmPassword)}
          backgroundColor={notValidPasswords(password, confirmPassword) ? "$blueGray400" : "$darkBlue500"}
        >
          <ButtonText color="$white">Зарегистрироваться</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}

function notValidPasswords(pass: string, confirmPass: string) {
  return !pass || !confirmPass || pass !== confirmPass;
}
