import { Prisma } from '@prisma/client';

export type MessageType = Prisma.MessageGetPayload<{}>;

export type CustomLink = {
	title: string;
	path: string;
};

export type MessagesFilter = {
	show: 'read' | 'unread' | 'all';
	time: {
		start?: number | Date;
		end?: number | Date;
	};
	name: string;
	email: string;
};

export type MessageFieldsObject = {
	name: string;
	email: string;
	message: string;
};
