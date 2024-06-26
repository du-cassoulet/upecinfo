import WebSocket from "ws";
import sendNotification from "../utils/sendNotification";
import Sector from "../models/Sector";
import Info from "../constants/Planning/Info";
import { MIN_CONTENT_LENGTH, USERNAME_MAP } from "../constants/Information";
import Notification from "../models/Notification";
import moment from "moment";
import "moment/locale/fr";
import PromosInfo, {
	SECTOR_DISCORD_CHANNEL as INFO_SECTOR_DISCORD_CHANNEL,
} from "../constants/Planning/Info";
import PromosMmi from "../constants/Planning/Mmi";
import PromosTc from "../constants/Planning/Tc";
import { Sector as SectorType } from "../types/Planning";

const SectorsChannels = Object.freeze({
	[SectorType.Info]: INFO_SECTOR_DISCORD_CHANNEL,
	[SectorType.Mmi]: null,
	[SectorType.Tc]: null,
});

const Promos = Object.freeze({
	[SectorType.Info]: PromosInfo,
	[SectorType.Tc]: PromosTc,
	[SectorType.Mmi]: PromosMmi,
});

export default function infoListener() {
	const ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");

	ws.onopen = function () {
		console.log(
			`[${moment().format("HH:mm:ss")}] Connected to Discord WebSocket`
		);

		ws.send(
			JSON.stringify({
				op: 2,
				d: {
					token: process.env.DISCORD_TOKEN,
					intents: 513,
					properties: {
						$os: "linux",
						$browser: "my_library",
						$device: "my_library",
					},
				},
			})
		);
	};

	ws.onmessage = async function (data) {
		const message = JSON.parse(data.data.toString());

		switch (message.op) {
			case 10:
				heartbeat(message.d.heartbeat_interval, ws);
				break;

			case 0:
				if (message.t !== "MESSAGE_CREATE") return;
				const fullBody = message.d.content;
				if (fullBody.length < MIN_CONTENT_LENGTH) return;

				const body =
					fullBody.length > 150 ? fullBody.slice(0, 150) + "..." : fullBody;

				const rawAuthor = message.d.author.username;
				const author = USERNAME_MAP[rawAuthor] ?? rawAuthor;
				const title = `Nouveau message de ${author}`;

				Object.entries(SectorsChannels)
					.filter(([_, c]) => c !== null)
					.forEach(async ([key, channelId]) => {
						if (message.d.channel_id !== channelId) return;
						const sectors = await Sector.find({
							sectorId: {
								$in: Promos[key as SectorType].map(
									(sector) => sector.notificationChannel
								),
							},
						});

						const expoPushTokens = sectors.flatMap((sector) =>
							sector.infoExpoPushTokens.map((token) => token.toString())
						);

						await sendNotification(expoPushTokens, title, body);

						await Notification.create({
							title,
							body,
							expoPushTokens,
							icon: "chatbubbles",
							action: "TOPAGE:3",
						});
					});

				Object.values(Promos)
					.flat()
					.forEach(async (promo) => {
						if (message.d.channel_id !== promo.info?.channel) return;

						const sector = await Sector.findOne({
							sectorId: promo.notificationChannel,
						});

						if (!sector) return;

						const expoPushTokens = sector.infoExpoPushTokens.map((token) =>
							token.toString()
						);

						await sendNotification(expoPushTokens, title, body);

						await Notification.create({
							title,
							body,
							expoPushTokens,
							icon: "chatbubbles",
							action: "TOPAGE:3",
						});
					});
				break;

			default:
				break;
		}
	};

	ws.onclose = function () {
		infoListener();

		console.log(
			`[${moment().format("HH:mm:ss")}] Disconnected from Discord WebSocket`
		);
	};

	function heartbeat(interval: number, ws: WebSocket) {
		setInterval(() => {
			ws.send(
				JSON.stringify({
					op: 1,
					d: null,
				})
			);
		}, interval);
	}
}
