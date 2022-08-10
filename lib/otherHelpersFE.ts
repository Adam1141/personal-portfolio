// for frontend use only

import { MessageFieldsObject, MessagesFilter } from '../@types/types';
import { MAX_NAME_LEN, MAX_EMAIL_LEN, MAX_MESSAGE_LEN } from '../constants';
import validator from 'validator';

export function validateMessageFields(fieldsObj: MessageFieldsObject) {
	// throws an error if something is invalid

	// check that no fields are empty
	Object.entries(fieldsObj).forEach(([k, v]) => {
		if (typeof v !== 'string' || v.trim() === '') {
			throw new Error(`${k} cannot be empty`);
		}
	});

	// check fields length
	if (fieldsObj.name.length > MAX_NAME_LEN)
		throw new Error(`max name length is ${MAX_NAME_LEN} characters`);
	if (fieldsObj.email.length > MAX_EMAIL_LEN)
		throw new Error(`max email length is ${MAX_EMAIL_LEN} characters`);
	if (fieldsObj.message.length > MAX_MESSAGE_LEN)
		throw new Error(`max message length is ${MAX_MESSAGE_LEN} characters`);

	// validate email
	if (!validator.isEmail(fieldsObj.email)) {
		throw new Error(`"${fieldsObj.email}" is not a valid email address`);
	}
}

export function validateSearchMessagesFilter(filter: MessagesFilter) {
	// throws an error if something is invalid

	// check value of filter.show
	if (filter?.show !== undefined) {
		const show = filter.show;
		const showOneOf = ['read', 'unread', 'all'];
		if (!showOneOf.some((v) => v === show))
			throw new Error(`"show" must be one of ${showOneOf}`);
	}

	// check value of filter.time
	if (filter?.time !== undefined) {
		const time = filter.time;
		if (time?.start && typeof time.start !== 'number')
			throw new Error(`"time.start" must be a number`);
		if (time?.end && typeof time.end !== 'number')
			throw new Error(`"time.end" must be a number`);
		if (time?.start === undefined && time?.end === undefined)
			throw new Error(
				`"time" must have at least one of "start" or "end" properties`,
			);
	}

	// check value of filter.name
	if (filter?.name !== undefined) {
		if (typeof filter.name !== 'string')
			throw new Error(`"name" must be a string`);
		if (filter.name.trim() === '') throw new Error(`"name" cannot be empty`);
	}

	// check value of filter.email
	if (filter?.email !== undefined) {
		if (typeof filter.email !== 'string')
			throw new Error(`"email" must be a string`);
		if (filter.email.trim() === '') throw new Error(`"email" cannot be empty`);
	}

	// check value of filter.limit
	if (filter?.limit !== undefined) {
		if (typeof filter.limit !== 'number')
			throw new Error(`"limit" must be a number`);
	}

	// check value of filter.skip
	if (filter?.skip !== undefined) {
		if (typeof filter.skip !== 'number')
			throw new Error(`"skip" must be a number`);
	}
}

