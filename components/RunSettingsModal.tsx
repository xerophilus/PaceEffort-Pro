import { View, StyleSheet } from 'react-native';
import { PaperProvider, Portal, Button, Switch, Modal } from "react-native-paper";
import { ThemedText } from "./ThemedText";
import { useState } from 'react';

const RunSettingsModal = ({voice, handleVoiceSettings, units, handleUnitSettings}) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <View>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={styles.voiceGuidanceContainer}>
                <ThemedText style={styles.voiceGuidanceText}>Voice Guidance</ThemedText>
                <Switch
                value={voice}
                onValueChange={handleVoiceSettings}
                />
            </View>
            <View style={styles.voiceGuidanceContainer}>
                <ThemedText style={styles.voiceGuidanceText}>Distance Units</ThemedText>
                <Switch
                value={units}
                onValueChange={handleUnitSettings}
                
                />
            </View>
        </Modal>
        <Button icon={'cog'} onPress={showModal}>
            <ThemedText></ThemedText>
        </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    voiceGuidanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
        voiceGuidanceText: {
        fontSize: 18,
    },
})

export default RunSettingsModal;