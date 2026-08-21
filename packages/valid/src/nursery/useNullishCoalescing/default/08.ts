declare const b: string;
declare let assigned: string | null;
assigned ||= b && 'fallback';
