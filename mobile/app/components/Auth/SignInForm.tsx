import { useState } from "react";
import { Button, ButtonText, Text, VStack, FormControl, InputField, Input } from "@gluestack-ui/themed";
import { auth } from "../../../api/auth";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";

export function SignInForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setUsername: setUsernameToContext } = useAuth();

  async function onSubmit() {
    setLoading(true);

    const res = await auth.singIn(username, password);

    if (res.status === 200) {
      setUsername("");
      setPassword("");
      setLoading(false);
      setUsernameToContext(username);
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
            Пароль
          </Text>
          <Input>
            <InputField type="password" value={password} onChangeText={(value) => setPassword(value)} />
          </Input>
        </VStack>
        <Button
          width="100%"
          ml="auto"
          onPress={onSubmit}
          disabled={loading}
          backgroundColor={loading ? "$blueGray400" : "$darkBlue500"}
        >
          <ButtonText color="$white">{loading ? "Загрузка..." : "Войти"}</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
