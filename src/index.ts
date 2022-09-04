import type { Command } from './http-interactions';
import { createApplicationCommandHandler } from './http-interactions';
import { mapFiles } from './util';

const commands = mapFiles<Command>(require.context('./cmds', true, /\.ts$/)),
	applicationCommandHandler = createApplicationCommandHandler({
		applicationId: CLIENT_ID,
		applicationSecret: CLIENT_SECRET,
		publicKey: PUBLIC_KEY,
		commands,
	});

addEventListener('fetch', (event) => {
	event.waitUntil(new Promise(() => null));
	event.respondWith(applicationCommandHandler(event.request));
});
