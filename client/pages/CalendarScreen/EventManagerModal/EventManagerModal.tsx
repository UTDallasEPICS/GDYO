import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, StyleSheet, View, Button, TextInput } from "react-native";

// This is the EventEditModal component that is exported for use in other files.
const EventEditModal = ({ visible, onClose }) => {
  // State hooks for managing event title, description, and date/time picker visibility.
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  // This function is called when the 'Save' button is pressed.
  const handleSave = () => {
    console.log("Event Title:", eventTitle, "Description:", description);
    onClose(); // Calls the onClose prop function to hide the modal.
  };

  // This function is called when the 'Cancel' button is pressed.
  const handleCancel = () => {
    // Reset the state values.
    setEventTitle("");
    setDescription("");
    onClose(); // Calls the onClose prop function to hide the modal.
  };

  // This function is called when a date is picked in the date/time picker.
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  // This function shows the date or time picker.
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <Modal
      animationType="slide" // The modal uses a slide animation to appear.
      transparent={true} // The modal is transparent, showing the background content slightly.
      visible={visible} // The modal's visibility is controlled by the 'visible' prop.
      onRequestClose={onClose} // Defines what to do when the modal is requested to close (e.g., hardware back button on Android).
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Button title="Cancel" onPress={handleCancel} color="#FFF" />
            <Button title="Save" onPress={handleSave} color="#B89707" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Add Event Title"
            placeholderTextColor="#999"
            value={eventTitle}
            onChangeText={setEventTitle} // Updates the eventTitle state when text changes.
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button title="Choose Date" onPress={() => showMode("date")} />
            <Button title="Choose Time" onPress={() => showMode("time")} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Additional notes..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription} // Updates the description state when text changes.
            multiline
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#091A20",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#091A20", // Input background color same as modal
    borderBottomColor: "#FFF", // White underline to be visible on the dark background
    borderBottomWidth: 1,
    marginBottom: 20,
    color: "#FFF", //white text color for input input text
    placeholderTextColor: "#999", // Light grey for placeholder text for contrast
    paddingHorizontal: 10, // Padding inside the input field
    borderRadius: 5, // Rounded corners for the input fields
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default EventEditModal;
