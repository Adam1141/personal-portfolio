import React, { FC, MutableRefObject, SetStateAction, useRef, useState } from 'react';
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
	AiOutlineLock,
} from 'react-icons/ai';
import { FaStarOfLife } from 'react-icons/fa';
import { MdOutlineClear } from 'react-icons/md';

interface TextInputProps {
	inputFor: string;
	inputType: string;
	isImportant?: boolean;
	defaultInputValue?: string;
	inputValue?: string;
	setInputValue?: React.Dispatch<SetStateAction<string>>;
	showLabel?: boolean;
	isControlled?: boolean;
	width?: string;
	height?: string;
	extraStyles?: Object;
	showPassToggle?: boolean;
	disabled?: boolean;
	autoComplete?: 'on' | 'off';
	onChange?: React.ChangeEventHandler;
	id?: string;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	showClearKey?: boolean;
	hideLockIcon?: boolean;
	onEnterCallback?: () => void;
	inputRef?: MutableRefObject<HTMLInputElement | null>
}

const TextInput: FC<TextInputProps> = ({
	inputFor,
	inputType = 'text',
	isImportant = false,
	width = '200px',
	height = '50px',
	extraStyles = {},
	showPassToggle = false,
	inputValue = '',
	setInputValue = () => {},
	disabled = false,
	onChange = null,
	showLabel = true,
	isControlled = true,
	autoComplete = 'on',
	defaultInputValue = '',
	id,
	className,
	labelClassName,
	inputClassName,
	showClearKey,
	hideLockIcon,
	onEnterCallback,
	inputRef
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	return (
		<div
			style={{ width: width, height: height }}
			className={`relative ${className ?? ''}`}
		>
			<div className="absolute top-3 right-2 z-20 flex select-none flex-row-reverse items-center gap-1 text-xl">
				{showPassToggle &&
					(isPasswordVisible ? (
						<AiOutlineEye
							onClick={() => setIsPasswordVisible((cur) => !cur)}
							className="cursor-pointer hover:opacity-75"
						/>
					) : (
						<AiOutlineEyeInvisible
							onClick={() => setIsPasswordVisible((cur) => !cur)}
							className="cursor-pointer hover:opacity-75"
						/>
					))}

				{showClearKey &&
					setInputValue &&
					inputValue &&
					inputValue.length > 0 && (
						<div
							onClick={() => setInputValue('')}
							className="cursor-pointer text-xl hover:opacity-75"
						>
							<MdOutlineClear />
						</div>
					)}
				{disabled && !hideLockIcon && (
					<div className="text-xl">
						<AiOutlineLock />
					</div>
				)}
			</div>

			<input
				onKeyUp={(e) => {
					switch (e.key) {
						case 'Enter':
							onEnterCallback?.();
							break;
						default:
							break;
					}
				}}
				ref={inputRef}
				className={`peer absolute z-10 w-full truncate rounded-sm border-b-2
        !border-transparent !border-b-gray-500 !bg-transparent px-4 py-2 text-base placeholder-transparent outline-none ring-0 placeholder-shown:select-none focus:!border-b-indigo-500 focus:ring-0 ${
			inputClassName ?? ''
		}`}
				id={`${id ? id : inputFor + '-input'}`}
				type={`${
					inputType === 'password'
						? isPasswordVisible
							? 'text'
							: 'password'
						: inputType
				}`}
				placeholder={`${inputFor}-placeholder`}
				style={extraStyles}
				onChange={(e) => {
					if (onChange) {
						onChange(e);
					} else if (setInputValue) {
						setInputValue(e.target.value);
					}
				}}
				autoComplete={autoComplete}
				{...(isControlled
					? { value: inputValue }
					: { defaultValue: defaultInputValue })}
				disabled={disabled}
			/>
			<label
				className={`${
					!showLabel && 'hidden focus:hidden'
				} absolute -top-3.5 left-0 z-0 select-none text-sm font-semibold transition-all
        duration-200
        peer-placeholder-shown:left-4
		peer-placeholder-shown:top-2
		peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-0
		peer-focus:text-sm
        peer-focus:font-semibold peer-focus:text-inherit
			${labelClassName ?? ''}`}
				htmlFor={`${inputFor}-text-input`}
			>
				<div className="flex items-center gap-1">
					{inputFor}{' '}
					{isImportant ? <FaStarOfLife className="text-xxs" /> : ''}
				</div>
			</label>
		</div>
	);
};

export default TextInput;