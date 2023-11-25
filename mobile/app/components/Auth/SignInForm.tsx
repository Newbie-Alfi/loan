import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonText, Text, VStack, FormControl, InputField, Input } from "@gluestack-ui/themed";

export function SignInForm() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  function onSubmit() {
    console.log(username);
    console.log(password);
    setUsername("");
    setPassword("");
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
          <Text color="$text500" lineHeight="$xs">
            Логин
          </Text>
          <Input>
            <InputField type="text" value={username} onChangeText={(value) => setUsername(value)} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$text500" lineHeight="$xs">
            Пароль
          </Text>
          <Input>
            <InputField type="text" value={password} onChangeText={(value) => setPassword(value)} />
          </Input>
        </VStack>
        <Button width="100%" ml="auto" onPress={onSubmit}>
          <ButtonText color="$white">Войти</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
