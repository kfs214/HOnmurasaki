import Big from 'big.js';
import { useState, useRef } from 'react';
import { View, Button, FlatList, Text, TextInput } from 'react-native';

import { InputRow } from './InputRow';
import { RowData } from '../types/common';

export function ScreenContent() {
  const defaultValues: Omit<RowData, 'id'> = { price: null, quantity: null, count: null };

  const [rows, setRows] = useState<RowData[]>([
    { id: 'initial-value-a', ...defaultValues },
    { id: 'initial-value-b', ...defaultValues },
  ]);
  const [minPrice, setMinPrice] = useState<number | null>(null);

  const flatListRef = useRef<FlatList<RowData>>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  function addRow() {
    setRows((prevRows) => {
      const newRow = { id: Date.now().toString(), ...defaultValues };
      return [...prevRows, newRow];
    });

    setTimeout(() => {
      flatListRef.current?.scrollToEnd(); // Scroll to the new row
      inputRefs.current[rows.length]?.focus(); // Focus on the Price input of the new row
    }, 100);
  }

  function calculateUnitPrice(row: RowData): number | null {
    if (row.price === null || row.price <= 0) return null;
    const price = new Big(row.price);
    const quantity = new Big(row.quantity || 1);
    const count = new Big(row.count || 1);
    return price.div(quantity.times(count)).toNumber();
  }

  function updateRow(id: string, updatedRow: Partial<RowData>) {
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, ...updatedRow } : row));
    setRows(updatedRows);

    // Calculate the minimum unit price
    // Note: We recalculate the unit price for all rows each time a row is updated.
    // This approach was chosen after careful consideration:
    // - The unit price calculation is lightweight and does not significantly impact performance.
    // - Keeping the logic simple avoids the complexity of managing cached values or memoization.
    // - This ensures that the calculations are always up-to-date and consistent.
    const unitPrices = updatedRows
      .map(calculateUnitPrice)
      .filter((price): price is number => price !== null);

    if (unitPrices.length > 0) {
      const minPrice = Math.min(...unitPrices);
      setMinPrice(minPrice);
    } else {
      setMinPrice(null);
    }
  }

  // Format numbers with thousand separators and rounding
  function formatNumberWithRounding(value: number | null, fractionDigits: number = 2): string {
    if (value === null) return 'N/A';
    return value.toLocaleString(undefined, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        ref={flatListRef}
        data={rows}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            {/* First Row: InputRow */}
            <InputRow
              data={item}
              isCheapest={minPrice !== null && calculateUnitPrice(item) === minPrice}
              onUpdate={(updatedRow) => updateRow(item.id, updatedRow)}
              onLastInputKeyPress={index === rows.length - 1 ? addRow : undefined}
              inputRef={(ref) => (inputRefs.current[index] = ref)} // Store reference to the Price input
            />
            {/* Second Row: Unit Price */}
            <View className="mb-4 flex-row items-center">
              <View className="w-6" />
              <Text className="flex-1 text-center text-gray-700">
                Unit Price: {formatNumberWithRounding(calculateUnitPrice(item))}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Button title="Add Row" onPress={addRow} accessibilityLabel="Add Row" aria-label="Add Row" />
    </View>
  );
}
