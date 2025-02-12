import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  className?: string;
}

export const ThemedCard = ({ className, children, ...rest }: Props) => {
  return (
    <View
      className={`bg-white dark:bg-black/50 rounded-xl p-2 shadow shadow-black/5 w-full ${className}`}
      {...rest}
    >
      {children}
    </View>
  );
};
