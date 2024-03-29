import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
	page: {
		flex: 1,
		width: Dimensions.get("window").width,
		backgroundColor: Colors.dark.primary,
	},
	planningContainer: {
		backgroundColor: Colors.dark.primary,
	},
	event: {
		position: "absolute",
		backgroundColor: Colors.dark.eventColor,
		left: 50,
		width: Dimensions.get("window").width - 50,
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius: 6,
		borderLeftWidth: 6,
		padding: 10,
		elevation: 2,
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		gap: 10,
	},
	title: {
		fontSize: 18,
		color: Colors.dark.header,
		fontFamily: "Rubik-Bold",
	},
	teacher: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	teacherText: {
		fontSize: 15,
		color: Colors.dark.teacherColor,
		fontFamily: "Rubik-Italic",
	},
	subHead: {
		paddingHorizontal: 15,
		height: 45,
		backgroundColor: Colors.accentDark,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	subHeadDayInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	subHeadDay: {
		textTransform: "capitalize",
		color: Colors.white,
		fontSize: 16,
		fontFamily: "Rubik-Bold",
	},
	subHeadDayBounds: {
		color: Colors.white80,
		fontSize: 12,
		fontFamily: "Rubik-Regular",
	},
	subHeadButton: {
		borderRadius: 18,
		height: 36,
		width: 36,
		alignItems: "center",
		justifyContent: "center",
	},
	eventContainer: {
		position: "absolute",
	},
	eventTextContent: {
		flex: 1,
	},
	teacherIcon: {
		width: 20,
		height: 20,
	},
	mealTimeBox: {
		position: "absolute",
		backgroundColor: Colors.dark.yellowFill,
		borderColor: Colors.dark.yellowBorder,
		width: Dimensions.get("window").width - 50,
		left: 50,
		borderRadius: 10,
		padding: 10,
		borderWidth: 1,
		borderStyle: "dashed",
		alignItems: "center",
		justifyContent: "center",
	},
	mealTimeText: {
		color: Colors.dark.yellow,
		fontSize: 14,
		fontFamily: "Rubik-Italic",
	},
	hourSeparator: {
		borderLeftWidth: 1,
		borderTopColor: Colors.dark.borderColor,
		borderLeftColor: Colors.dark.borderColor,
		backgroundColor: Colors.dark.planningColor,
		width: Dimensions.get("window").width - 50,
		height: 100,
	},
	hourDelimitation: {
		flexDirection: "row",
	},
	sideHourSeparator: {
		width: 50,
		alignItems: "center",
	},
	hour: {
		fontSize: 12,
		color: Colors.dark.gray,
		transform: [{ translateY: -8 }],
		fontFamily: "Rubik-Regular",
	},
	noClassButton: {
		backgroundColor: Colors.blue,
		padding: 15,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		flex: 0.75,
		marginTop: 15,
	},
	noClassButtonText: {
		color: Colors.white,
		fontFamily: "Rubik-Regular",
	},
	noClassDescription: {
		color: Colors.dark.gray,
		fontFamily: "Rubik-Regular",
		fontSize: 14,
		marginTop: 5,
		lineHeight: 22,
	},
	noClassTitle: {
		color: Colors.dark.header,
		fontFamily: "Rubik-Bold",
		fontSize: 18,
	},
	noClassContainer: {
		position: "absolute",
		bottom: 10,
		left: 10,
		width: Dimensions.get("window").width - 20,
		flex: 1,
		padding: 15,
		borderRadius: 10,
		backgroundColor: Colors.dark.eventColor,
	},
	boundaries: {
		fontWeight: "400",
		color: Colors.dark.lightGray,
		fontSize: 12,
		marginTop: "auto",
		fontFamily: "Rubik-Regular",
	},
	eventTypeIcon: {
		width: 28,
		height: 28,
		marginLeft: "auto",
		marginTop: "auto",
		marginRight: -10,
	},
	room: {
		backgroundColor: Colors.accent,
		color: "white",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 5,
		fontSize: 12,
		fontFamily: "Rubik-Regular",
		textAlign: "right",
		marginRight: -10,
	},
});
