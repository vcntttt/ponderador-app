import {
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

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
            <View className="m-4 mb-0 z-10 p-8 rounded-t-xl shadow flex flex-col gap-y-4 bg-white dark:bg-black">
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default MyModal;
