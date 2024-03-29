import { Platform } from "react-native";
import Constants from "expo-constants";
import { isDevice } from "expo-device";
import {
	getExpoPushTokenAsync,
	getPermissionsAsync,
	requestPermissionsAsync,
	AndroidImportance,
	setNotificationChannelAsync,
} from "expo-notifications";
import Colors from "../constants/Colors";

export default async function registerForPushNotificationsAsync() {
	if (Platform.OS === "android") {
		await setNotificationChannelAsync("default", {
			name: "default",
			importance: AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: Colors.accent,
		});
	}

	if (!isDevice) return;

	const { status: existingStatus } = await getPermissionsAsync();

	if (existingStatus !== "granted") {
		const { status } = await requestPermissionsAsync();
		if (status !== "granted") return;
	}

	const token = await getExpoPushTokenAsync({
		projectId: Constants.expoConfig!.extra!.eas.projectId,
	});

	return token.data;
}
