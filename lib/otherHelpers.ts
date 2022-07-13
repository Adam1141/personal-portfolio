import { MessageFieldsObject } from "../@types/types";
import { MAX_NAME_LEN, MAX_EMAIL_LEN, MAX_MESSAGE_LEN } from "../constants";
import validator from 'validator';

export function validateMessageFields(fieldsObj: MessageFieldsObject) {
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
