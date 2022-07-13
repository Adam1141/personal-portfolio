import { Prisma } from '@prisma/client';

export type MessageType = Prisma.MessageGetPayload<{}>;

export type CustomLink = {
	title: string;
	path: string;
};

export type MessageShowType = 'read' | 'unread' | 'all';

export type MessagesFilter = {
	show?: MessageShowType;
	time?: {
		start?: number;
		end?: number;
	};
	name?: string;
	email?: string;
	skip?: number;
	limit?: number;
};

export type MessageFieldsObject = {
	name: string;
	email: string;
	message: string;
};
