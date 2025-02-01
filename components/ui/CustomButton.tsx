import { Pressable, PressableProps } from 'react-native'
import { ThemedText } from './ThemedText'

interface Props  extends PressableProps{
  title: string
  onPress?: () => void
}

const CustomButton = ({title, onPress, ...props}: Props) => {
  return (
    <Pressable
    onPress={onPress}
    className="bg-light-primary dark:bg-dark-primary p-3 rounded-md"
    {...props}
  >
    <ThemedText className='text-center font-medium !text-dark-text dark:!text-dark-text'>
      {title}
    </ThemedText>
  </Pressable>
  )
}
export default CustomButton