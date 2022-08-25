import { Command } from '../http-interactions';
import {
	ApplicationCommandType,
	InteractionResponseType,
	MessageFlags,
} from 'discord-api-types/v10';

export const command: Command<ApplicationCommandType.ChatInput> = {
	name: 'ping',
	description: 'Reply with pong',
	handler: ({ member }) => {
		const userID = member!.user.id;

		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `<@${userID}>, pong!`,
				flags: MessageFlags.Ephemeral,
			},
		};
	},
};
