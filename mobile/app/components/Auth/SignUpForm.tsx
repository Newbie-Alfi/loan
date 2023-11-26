import { useState } from "react";
import { Button, ButtonText, Text, VStack, FormControl, InputField, Input } from "@gluestack-ui/themed";
import { auth } from "../../../api/auth";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";

export function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { setUsername: setUsernameToContext } = useAuth();

  async function onSubmit() {
    setLoading(true);
    const res = await auth.singUp({ username, email, password, password2 });

    if (res.status === 201) {
      setUsername("");
      setPassword("");
      setEmail("");
      setPassword2("");

      setUsernameToContext(username);
      setLoading(false);
      router.replace("/(tabs)");
    }
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
            Почта
          </Text>
          <Input>
            <InputField type="text" value={email} onChangeText={(value) => setEmail(value)} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$textDark500" lineHeight="$xs">
            Пароль
          </Text>
          <Input>
            <InputField type="password" value={password} onChangeText={(value) => setPassword(value)} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$textDark500" lineHeight="$xs">
            Подтверждение пароля
          </Text>
          <Input>
            <InputField type="password" value={password2} onChangeText={(value) => setPassword2(value)} />
          </Input>
        </VStack>
        <Button
          width="100%"
          ml="auto"
          onPress={onSubmit}
          disabled={notValidPasswords(password, password2) || loading}
          backgroundColor={
            notValidPasswords(password, password2) || loading ? "$blueGray400" : "$darkBlue500"
          }
        >
          <ButtonText color="$white">{loading ? "Загрузка..." : "Зарегистрироваться"}</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}

function notValidPasswords(pass: string, confirmPass: string) {
  return !pass || !confirmPass || pass !== confirmPass;
}
