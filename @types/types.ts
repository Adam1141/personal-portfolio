import { Prisma } from '@prisma/client';

export type MessageType = Prisma.MessageGetPayload<{}>;

export type CustomLink = {
	title: string;
	path: string;
};

export type MessagesFilter = {
	show?: 'read' | 'unread' | 'all';
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
