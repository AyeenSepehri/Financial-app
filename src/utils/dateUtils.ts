import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Converts a date input to ISO string while preserving the local time
 * This ensures that the time entered by user is stored exactly as entered
 */
export const toLocalISOString = (dateInput: any): string => {
    if (!dateInput) {
        return new Date().toISOString();
    }
    
    // If it's already a string, return as is
    if (typeof dateInput === 'string') {
        return dateInput;
    }
    
    // If it's a dayjs object or Date, convert to local ISO string
    const date = dayjs(dateInput);
    if (!date.isValid()) {
        return new Date().toISOString();
    }
    
    // Format the date as a string in the format that preserves local time
    // This ensures the exact time entered by user is preserved
    return date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
};

/**
 * Formats a timestamp for display in the UI
 */
export const formatTimestamp = (timestamp: string): string => {
    return dayjs(timestamp).format('DD MMM YYYY (HH:mm)');
};

/**
 * Formats a timestamp for display in UTC
 */
export const formatTimestampUTC = (timestamp: string): string => {
    return dayjs.utc(timestamp).format('DD MMM YYYY (HH:mm)');
}; 