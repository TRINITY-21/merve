import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

type Variant = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

const fontMap: Record<Variant, TextStyle['fontFamily']> = {
  light: 'JosefinSans_300Light',
  regular: 'JosefinSans_400Regular',
  medium: 'JosefinSans_500Medium',
  semibold: 'JosefinSans_600SemiBold',
  bold: 'JosefinSans_700Bold',
};

interface Props extends TextProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: number;
}

export const Typography = ({
  children,
  variant = 'regular',
  size = 16,
  style,
  ...rest
}: Props) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontMap[variant],
          fontSize: size,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
