import { forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputProps,
} from 'react-native';

import { RowData } from '@/types/common';

type InputRowProps = {
  data: RowData;
  isCheapest?: boolean;
  onUpdate: (updatedRow: Partial<RowData>) => void;
  onLastInputKeyPress?: () => void;
  inputRef?: (ref: TextInput | null) => void;
};

function formatNumberWithoutRounding(value: number | null): string {
  if (value === null) return '';
  return value.toLocaleString();
}

const NumericInput = forwardRef<TextInput, { rawValue: number | null } & TextInputProps>(
  ({ rawValue, ...restProps }, ref) => {
    return (
      <View className="flex-1 flex-row items-center border border-gray-300 p-2">
        <TextInput
          ref={ref}
          className="min-w-0 flex-1 text-center"
          keyboardType="numeric"
          value={formatNumberWithoutRounding(rawValue)}
          {...restProps}
        />
      </View>
    );
  }
);

export function InputRow({
  data,
  isCheapest,
  onUpdate,
  onLastInputKeyPress,
  inputRef,
}: InputRowProps) {
  function handleInputChange(key: keyof RowData, rawValue: string) {
    // NOTE: This implementation does not handle edge cases with multiple dots (e.g., '12...3.4' should be '12.34')
    const numericValue = rawValue.replace(/,/g, '').replace(/[^0-9.]/g, '');
    const parsedValue = numericValue === '' ? null : parseFloat(numericValue);

    if (parsedValue === null || parsedValue <= 0) {
      onUpdate({ [key]: null });
    } else {
      onUpdate({ [key]: parsedValue });
    }
  }

  function handleKeyPress(
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    isLastInput: boolean
  ) {
    const { key } = event.nativeEvent;
    if (key === 'Tab' && (event.nativeEvent as any).shiftKey) {
      return;
    }
    if (key === 'Enter' || (key === 'Tab' && isLastInput)) {
      if (!onLastInputKeyPress) return;
      event.preventDefault();
      onLastInputKeyPress();
    }
  }

  return (
    <View className="mb-2 flex-row items-center" testID="input-row">
      {/* Cheapest Row Indicator */}
      <View className="relative w-6">
        {isCheapest && (
          <>
            <Text className="text-center" accessibilityLabel="Cheapest">
              ⭐
            </Text>
            {/* Visually hidden text for screen readers */}
            <Text
              className="sr-only"
              accessible
              accessibilityElementsHidden={false}
              importantForAccessibility="yes">
              Cheapest
            </Text>
          </>
        )}
      </View>
      {/* Price Input */}
      <NumericInput
        ref={inputRef}
        rawValue={data.price}
        onChangeText={(text) => handleInputChange('price', text)}
        onKeyPress={(event) => handleKeyPress(event, false)}
        placeholder="Price"
        accessibilityLabel="Price"
      />
      <Text className="mx-1 text-3xl text-gray-500">÷</Text>
      <Text className="text-xl text-gray-500">(</Text>
      {/* Quantity Input */}
      <NumericInput
        rawValue={data.quantity}
        onChangeText={(text) => handleInputChange('quantity', text)}
        onKeyPress={(event) => handleKeyPress(event, false)}
        placeholder="Quantity"
        accessibilityLabel="Quantity"
      />
      <Text className="mx-1 text-3xl text-gray-500">×</Text>
      {/* Count Input */}
      <NumericInput
        rawValue={data.count}
        onChangeText={(text) => handleInputChange('count', text)}
        onKeyPress={(event) => handleKeyPress(event, true)}
        placeholder="1"
        accessibilityLabel="Count"
      />
      <Text className="text-xl text-gray-500">)</Text>
    </View>
  );
}
