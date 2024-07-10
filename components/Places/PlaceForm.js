import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Places } from "../../models/place";

export default function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  function changeTitleHandler(text) {
    setEnteredTitle(text);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  // useCallback is used to prevent the function from being recreated on every render unnecessarily
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    // check for empty user input

    if (!enteredTitle && !selectedImage && !pickedLocation) {
      Alert.alert(
        "Invalid Input",
        "Please enter a title, select an image, and pick a location.",
        [{ text: "Okay" }]
      );
      return;
    } else if (!enteredTitle) {
      Alert.alert("Invalid Input", "Please enter a valid title.", [
        { text: "Okay" },
      ]);
      return;
    } else if (!selectedImage) {
      Alert.alert("Invalid Input", "Please select an image.", [
        { text: "Okay" },
      ]);
      return;
    } else if (!pickedLocation) {
      Alert.alert("Invalid Input", "Please pick a location.", [
        { text: "Okay" },
      ]);
      return;
    }
    const placeData = new Places(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 10,
  },
});
