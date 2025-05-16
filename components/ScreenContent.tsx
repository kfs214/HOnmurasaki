import Big from 'big.js';
import { useEffect, useState, useRef } from 'react';
import { View, Button, FlatList, Text, TextInput } from 'react-native';

import { InputRow } from '@/components/InputRow';
import { RowData } from '@/types/common';

let rowIdCounter = 0;
function generateRowId() {
  return `row-${rowIdCounter++}`;
}

export function ScreenContent() {
  const defaultValues: Omit<RowData, 'id'> = { price: null, quantity: null, count: null };

  const [rows, setRows] = useState<RowData[]>([
    { id: generateRowId(), ...defaultValues },
    { id: generateRowId(), ...defaultValues },
  ]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [pendingFocusIndex, setPendingFocusIndex] = useState<number | null>(null);

  const flatListRef = useRef<FlatList<RowData>>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  function addRow() {
    setRows((prevRows) => {
      const newIndex = prevRows.length;
      setPendingFocusIndex(newIndex);
      return [...prevRows, { id: generateRowId(), ...defaultValues }];
    });
  }

  useEffect(() => {
    if (pendingFocusIndex === null) {
      return;
    }

    flatListRef.current?.scrollToEnd();
    inputRefs.current[pendingFocusIndex]?.focus();
    setPendingFocusIndex(null);
  }, [pendingFocusIndex]);

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
      <Button title="Add Row" onPress={addRow} accessibilityLabel="Add Row" />
    </View>
  );
}
