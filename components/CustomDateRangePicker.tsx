import dayjs from 'dayjs';
import { DateRangePicker, DateRange } from 'materialui-daterange-picker';
import { FC, SetStateAction, useEffect, useState } from 'react';

interface CustomDateRangePickerProps {
	dateRange: DateRange;
	setDateRange: React.Dispatch<SetStateAction<DateRange>>;
	isOpen: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	className?: string;
	wrapperClassName?: string;
}

const CustomDateRangePicker: FC<CustomDateRangePickerProps> = ({
	dateRange,
	setDateRange,
	isOpen,
	setIsOpen,
	className,
	wrapperClassName,
}) => {
	useEffect(() => {
		// console.log('dateRange: ', dateRange);
	}, [dateRange]);
	return (
		<div className={`${className ?? ''}`}>
			<DateRangePicker
				open={isOpen}
				toggle={() => setIsOpen((cur) => !cur)}
				onChange={(range) => {
					if (range?.endDate) {
						range.endDate = dayjs(range.endDate)
							.add(24 * 60 * 60 - 1, 'seconds')
							.toDate();
					}
					setDateRange(range);
				}}
				wrapperClassName={`${wrapperClassName ?? ''}`}
			/>
		</div>
	);
};

export default CustomDateRangePicker;
