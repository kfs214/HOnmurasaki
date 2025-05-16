import {
  View,
  TextInput,
  Text,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
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

export function InputRow({
  data,
  isCheapest,
  onUpdate,
  onLastInputKeyPress,
  inputRef,
}: InputRowProps) {
  const handleInputChange = (key: keyof RowData, rawValue: string) => {
    const cleanedValue = rawValue.replace(/,/g, '');
    const numericValue = cleanedValue.replace(/[^0-9.]/g, '');
    const parsedValue = numericValue === '' ? null : parseFloat(numericValue);

    if (parsedValue === null || parsedValue <= 0) {
      onUpdate({ [key]: null });
    } else {
      onUpdate({ [key]: parsedValue });
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    isLastInput: boolean
  ) => {
    const { key } = event.nativeEvent;
    if (key === 'Tab' && (event.nativeEvent as any).shiftKey) {
      return;
    }
    if (key === 'Enter' || (key === 'Tab' && isLastInput)) {
      if (!onLastInputKeyPress) return;
      event.preventDefault();
      onLastInputKeyPress();
      Keyboard.dismiss();
    }
  };

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
      <View className="flex-1 flex-row items-center border border-gray-300 p-2">
        <TextInput
          ref={inputRef}
          className="min-w-0 flex-1 text-center"
          keyboardType="numeric"
          placeholder="Price"
          accessibilityLabel="Price"
          value={formatNumberWithoutRounding(data.price)}
          onChangeText={(text) => handleInputChange('price', text)}
          onKeyPress={(event) => handleKeyPress(event, false)}
        />
      </View>
      <Text className="mx-1 text-3xl text-gray-500">÷</Text>
      <Text className="text-xl text-gray-500">(</Text>
      {/* Quantity Input */}
      <View className="flex-1 flex-row items-center border border-gray-300 p-2">
        <TextInput
          className="min-w-0 flex-1 text-center"
          keyboardType="numeric"
          placeholder="Quantity"
          accessibilityLabel="Quantity"
          value={formatNumberWithoutRounding(data.quantity)}
          onChangeText={(text) => handleInputChange('quantity', text)}
          onKeyPress={(event) => handleKeyPress(event, false)}
        />
      </View>
      <Text className="mx-1 text-3xl text-gray-500">×</Text>
      {/* Count Input */}
      <View className="flex-1 flex-row items-center border border-gray-300 p-2">
        <TextInput
          className="min-w-0 flex-1 text-center"
          keyboardType="numeric"
          placeholder="1"
          accessibilityLabel="Count"
          value={formatNumberWithoutRounding(data.count)}
          onChangeText={(text) => handleInputChange('count', text)}
          onKeyPress={(event) => handleKeyPress(event, true)}
        />
      </View>
      <Text className="text-xl text-gray-500">)</Text>
    </View>
  );
}
