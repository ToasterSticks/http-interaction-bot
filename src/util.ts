import {
	ApplicationCommandOptionType,
	InteractionResponseType,
	RouteBases,
	type APIApplicationCommandInteractionDataBasicOption,
	type APIApplicationCommandInteractionDataOption,
	type APIApplicationCommandInteractionDataSubcommandOption,
	type APIInteractionResponse,
	type APIModalSubmission,
} from 'discord-api-types/v10';

export const mapFiles = <T>(context: __WebpackModuleApi.RequireContext) =>
	context.keys().map<T>((path) => context(path).command);

export const noop = () => null;

export const restApiRequest = <T = null>(
	route: string,
	method: string,
	body?: FormData | unknown
): Promise<T | null> => {
	const requestOptions =
		body instanceof FormData
			? { method, body }
			: {
					method,
					headers: {
						'Content-Type': 'application/json',
						// Authorization: `Bot ${BOT_TOKEN}`,
					},
					body: JSON.stringify(body),
			  };

	return fetch(RouteBases.api + route, requestOptions)
		.then((res) => (res.ok ? (res.json() as T) : null))
		.catch(noop);
};

export const deferUpdate = (): APIInteractionResponse => ({
	type: InteractionResponseType.DeferredMessageUpdate,
});

export const getOption = <
	T extends
		| APIApplicationCommandInteractionDataBasicOption['value']
		| APIApplicationCommandInteractionDataSubcommandOption[],
	R extends boolean = false
>(
	options: APIApplicationCommandInteractionDataOption[] | undefined,
	name: string,
	hoist = false
): R extends true ? T : T | null => {
	let hoisted = options;

	if (hoist && hoisted) {
		if (hoisted[0]?.type === ApplicationCommandOptionType.SubcommandGroup)
			hoisted = hoisted[0].options ?? [];

		if (hoisted[0]?.type === ApplicationCommandOptionType.Subcommand)
			hoisted = hoisted[0].options ?? [];
	}

	const option = hoisted?.find((option) => option.name === name);

	return ((option && ('value' in option ? option.value : option.options)) ?? null) as R extends true
		? T
		: T | null;
};

export const getModalValue = (data: APIModalSubmission, name: string) => {
	const row = data.components.find(({ components }) => components[0].custom_id === name)!;

	return row.components[0].value;
};
