// Alternativa para usar MaterialIcons no Android e web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Adicione seus mapeamentos de SF Symbols para Material Icons aqui.
 * - veja Material Icons no [Diretório de Ícones](https://icons.expo.fyi).
 * - veja SF Symbols no aplicativo [SF Symbols](https://developer.apple.com/sf-symbols/).
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMapping;

/**
 * Um componente de ícone que usa SF Symbols nativos no iOS e Material Icons no Android e na web.
 * Isso garante uma aparência consistente entre as plataformas e uso otimizado de recursos.
 * Os 'name's (nomes) dos ícones são baseados em SF Symbols e exigem mapeamento manual para Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
