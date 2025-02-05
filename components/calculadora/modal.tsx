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
};

const MyModal = ({ visible, onClose }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="m-4 mb-0 z-10 bg-white dark:bg-zinc-900 p-8 rounded-t-xl shadow flex flex-col gap-y-4">
              <ThemedText type="subtitle" className="text-center ">
                Nueva Nota
              </ThemedText>
              <View className="flex-row gap-x-4">
                <ThemedTextInput
                  className="w-2/3"
                  placeholder="Nota"
                  keyboardType="numeric"
                />
                <ThemedTextInput className="w-1/3" placeholder="%" />
              </View>
              <CustomButton title="Agregar" onPress={() => {}} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default MyModal;
