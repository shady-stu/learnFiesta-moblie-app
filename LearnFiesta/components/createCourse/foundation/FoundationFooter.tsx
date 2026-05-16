import { Button, View } from "react-native";
import { foundationStyles as styles } from "./styles";

type Props = {
  isEditing: boolean;
  isPending: boolean;
  onSubmit: () => void;
};

export default function FoundationFooter({ isEditing, isPending, onSubmit }: Props) {
  return (
    <View style={styles.footer}>
      <View style={styles.buttonWrapper}>
        <Button
          title={
            isPending
              ? "Saving..."
              : isEditing
                ? "Update & Continue"
                : "Save & Continue"
          }
          onPress={onSubmit}
          color="#5624D0"
        />
      </View>
    </View>
  );
}
