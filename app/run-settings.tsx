import { View, StyleSheet } from 'react-native';
import {   Switch, } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";

const RunSettingsScreen = () => {
    return (
        <View>
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
        </View>
    )
}

export default RunSettingsScreen;