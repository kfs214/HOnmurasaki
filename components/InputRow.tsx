import { View, TextInput, Text, Keyboard } from 'react-native';

import { RowData } from '../types/common';

type InputRowProps = {
  data: RowData;
  isCheapest?: boolean;
  onUpdate: (updatedRow: Partial<RowData>) => void;
  onLastInputKeyPress?: () => void; // Updated prop to handle key press events
  inputRef?: (ref: TextInput | null) => void; // Ref for the Price input
};

// Format numbers with thousand separators without rounding
function formatNumberWithoutRounding(value: number | null): string {
  if (value === null) return '';
  return value.toLocaleString(); // Apply thousand separators directly
}

export function InputRow({ data, isCheapest, onUpdate, onLastInputKeyPress, inputRef }: InputRowProps) {
  const handleInputChange = (key: keyof RowData, value: string) => {
    // Remove non-numeric characters and parse the value
    const numericValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
    const parsedValue = numericValue === '' ? null : parseFloat(numericValue);

    // Reject invalid values (e.g., 0)
    if (parsedValue === null || parsedValue <= 0) {
      onUpdate({ [key]: null }); // Set the value to null
    } else {
      onUpdate({ [key]: parsedValue }); // Update with the valid number
    }
  };

  const handleKeyPress = (event: any, isLastInput: boolean) => {
    const { key, shiftKey } = event.nativeEvent;

    // Early return for Shift+Tab
    if (key === 'Tab' && shiftKey) {
      return; // Allow default behavior for Shift+Tab
    }

    if (key === 'Enter') {
      if (!onLastInputKeyPress) return; // Allow default behavior if no handler is defined
      event.preventDefault(); // Prevent default behavior for Enter
      onLastInputKeyPress(); // Trigger row addition
      Keyboard.dismiss(); // Dismiss the keyboard on mobile
    } else if (key === 'Tab' && isLastInput) {
      if (!onLastInputKeyPress) return; // Allow default behavior if no handler is defined
      event.preventDefault(); // Prevent default behavior for Tab
      onLastInputKeyPress(); // Trigger row addition
      Keyboard.dismiss(); // Dismiss the keyboard on mobile
    }
  };

  return (
    <View className="mb-2 flex-row items-center">
      {/* Cheapest Row Indicator */}
      <View className="w-6">{isCheapest && <Text className="text-center">⭐</Text>}</View>

      {/* Price Input */}
      <View className="flex-1 flex-row items-center border border-gray-300 p-2">
        <TextInput
          ref={inputRef} // Attach the ref to the Price input
          className="min-w-0 flex-1 text-center"
          keyboardType="numeric"
          placeholder="Price"
          value={formatNumberWithoutRounding(data.price)} // Format the value for display
          onChangeText={(text) => handleInputChange('price', text.replace(/,/g, ''))} // Remove commas before processing
          onKeyPress={(event) => handleKeyPress(event, false)} // Pass isLastInput as false
        />
      </View>

      {/* Division Symbol */}
      <Text className="mx-1 text-3xl text-gray-500">÷</Text>
      <Text className="text-xl text-gray-500">(</Text>

      {/* Quantity Input */}
      <View className="flex-1 flex-row items-center border border-gray-300 p-2">
        <TextInput
          className="min-w-0 flex-1 text-center"
          keyboardType="numeric"
          placeholder="Quantity"
          value={formatNumberWithoutRounding(data.quantity)} // Format the value for display
          onChangeText={(text) => handleInputChange('quantity', text.replace(/,/g, ''))} // Remove commas before processing
          onKeyPress={(event) => handleKeyPress(event, false)} // Pass isLastInput as false
        />
      </View>

      {/* Multiplication Symbol */}
      <Text className="mx-1 text-3xl text-gray-500">×</Text>

      {/* Count Input */}
      <View className="flex-1 flex-row items-center border border-gray-300 p-2">
        <TextInput
          className="min-w-0 flex-1 text-center"
          keyboardType="numeric"
          placeholder="1" // Placeholder "1"
          value={formatNumberWithoutRounding(data.count)} // Format the value for display
          onChangeText={(text) => handleInputChange('count', text.replace(/,/g, ''))} // Remove commas before processing
          onKeyPress={(event) => handleKeyPress(event, true)} // Pass isLastInput as true
        />
      </View>
      <Text className="text-xl text-gray-500">)</Text>
    </View>
  );
}
