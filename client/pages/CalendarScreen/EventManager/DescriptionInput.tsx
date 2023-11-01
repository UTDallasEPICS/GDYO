import { eventNames } from 'process';
import React from 'react';
import { Button, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ModalPopup = ({ visible, save, cancel, children }) => {
    const [showModal, setShowModal] = React.useState(visible);

    return (
        <Modal transparent visible={true}>
            <View style={styles.modalBackground}>
                <View style={[styles.modalContainer]}>
                    <View style={styles.header}>
                        <Button title="Cancel" onPress={cancel} />
                        <Button title="Save" onPress={save} />
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const App = () => {
    const [visible, setVisible] = React.useState(false);
    const [eventTitle, setEventTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const handleSave = () => {
        console.log('Event Title:', eventTitle, description); //just to make sure event title is saved
        setVisible(false);
    }
    const handleCancel = () => {
        setEventTitle(''); //set it to empty if user entered something but cancelled form
        setVisible(false);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ModalPopup visible={visible} cancel={handleCancel} save={handleSave}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.header}>
                        <TextInput placeholder="Add Event Title"
                            value={eventTitle}
                            onChangeText={setEventTitle} />
                    </View>
                    <View>
                        <Text>Time</Text>
                    </View>
                    <View>
                        <Text>Time</Text>

                        <Text>Location</Text>
                        <TextInput placeholder="Enter valid address..."></TextInput>
                    </View>

                    <View>
                        <Text>Description</Text>
                        <TextInput placeholder="Additional notes..."
                            value={description}
                            onChangeText={setDescription} />
                    </View>
                </View>
            </ModalPopup>
            <Button title="Plus Button" onPress={() => setVisible(true)} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {

    }
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
    },
});

export default App;

