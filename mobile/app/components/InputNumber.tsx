import { InputField } from "@gluestack-ui/themed";
import { useMemo } from "react";
import { TextInputProps } from "react-native";

interface InputNumberProps
  extends Omit<TextInputProps, "type" | "keyboardType" | "onChange" | "value"> {
  value: number;
  onChange(v: number | undefined): void;
}

export function InputNumber({ onChange, value, ...props }: InputNumberProps) {
  const resultValue = useMemo(() => {
    if (!value && value !== 0) return undefined;

    return value.toString();
  }, [value]);

  function onValueChange(v: string) {
    let num = !!+v || +v === 0 ? +v : undefined;

    onChange(num);
  }

  return (
    <InputField
      {...props}
      type="text"
      keyboardType="numeric"
      value={resultValue}
      onChangeText={onValueChange}
    />
  );
}
