import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
}

export const ThemedCard = ({ className, children, ...rest }: Props) => {
  return (
    <View
      className={`
        border-[1px] border-black/30 dark:border-white/50
        rounded-xl p-2 shadow shadow-black/5 w-full 
        ${className}
      `}
      {...rest}
    >
      {children}
    </View>
  );
};
