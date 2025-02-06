import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import CustomButton from "@/components/ui/CustomButton";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const MyModal = ({ visible, onClose, children }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="m-4 mb-0 z-10 bg-white dark:bg-zinc-900 p-8 rounded-t-xl shadow flex flex-col gap-y-4">
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default MyModal;
