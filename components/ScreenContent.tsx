import Big from 'big.js';
import { useEffect, useState, useRef } from 'react';
import { View, Button, FlatList, Text, TextInput } from 'react-native';

import { InputRow } from '@/components/InputRow';
import { RowData } from '@/types/common';

const DEFAULT_ROW_DATA: Omit<RowData, 'id'> = { price: null, quantity: null, count: null };

const calculateUnitPrice = (row: RowData): number | null => {
  if (row.price === null || row.price <= 0) return null;
  const price = new Big(row.price);
  const quantity = new Big(row.quantity || 1);
  const count = new Big(row.count || 1);
  return price.div(quantity.times(count)).toNumber();
};

const formatNumberWithRounding = (value: number | null, fractionDigits: number = 2): string => {
  if (value === null) return 'N/A';
  return value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};

const ScreenContent = () => {
  const rowIdCounterRef = useRef(0);

  const generateRowId = () => {
    return `row-${rowIdCounterRef.current++}`;
  };

  const [rows, setRows] = useState<RowData[]>([
    { id: generateRowId(), ...DEFAULT_ROW_DATA },
    { id: generateRowId(), ...DEFAULT_ROW_DATA },
  ]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [pendingFocusIndex, setPendingFocusIndex] = useState<number | null>(null);

  const flatListRef = useRef<FlatList<RowData>>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (pendingFocusIndex === null) {
      return;
    }

    flatListRef.current?.scrollToEnd();
    inputRefs.current[pendingFocusIndex]?.focus();
    setPendingFocusIndex(null);
  }, [pendingFocusIndex]);

  const addRow = () => {
    setRows((prevRows) => {
      const newIndex = prevRows.length;
      setPendingFocusIndex(newIndex);
      return [...prevRows, { id: generateRowId(), ...DEFAULT_ROW_DATA }];
    });
  };

  const updateRow = (id: string, updatedData: Partial<RowData>) => {
    setRows((prevRows) => {
      const newRows = prevRows.map((row) => (row.id === id ? { ...row, ...updatedData } : row));
      const unitPrices = newRows.map(calculateUnitPrice).filter((price) => price !== null);

      if (unitPrices.length > 0) {
        const currentMinPrice = Math.min(...unitPrices);
        setMinPrice(currentMinPrice);
      } else {
        setMinPrice(null);
      }
      return newRows;
    });
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        ref={flatListRef}
        data={rows}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const unitPrice = calculateUnitPrice(item);
          return (
            <View>
              {/* First Row: InputRow */}
              <InputRow
                data={item}
                isCheapest={minPrice !== null && unitPrice === minPrice}
                onUpdate={(updatedData) => updateRow(item.id, updatedData)}
                onLastInputKeyPress={index === rows.length - 1 ? addRow : undefined}
                inputRef={(ref) => (inputRefs.current[index] = ref)}
              />
              {/* Second Row: Unit Price */}
              <View className="mb-4 flex-row items-center">
                <View className="w-6" />
                <Text className="flex-1 text-center text-gray-700">
                  Unit Price: {formatNumberWithRounding(unitPrice)}
                </Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Button title="Add Row" onPress={addRow} accessibilityLabel="Add Row" />
    </View>
  );
};

export { ScreenContent };
