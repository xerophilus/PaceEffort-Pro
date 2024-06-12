import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";

const RunSummaryScreen = () => {
    const run = useLocalSearchParams()
    return (
        <ThemedView>
            <ThemedText>{run.distance}</ThemedText>
        </ThemedView>
    )
}

export default RunSummaryScreen;