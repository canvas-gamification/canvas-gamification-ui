export interface RegistrationStatus {
    status: string;
    message: string;
    attempts_remaining: number;
}

export const REGISTRATION_STATUS = {
    NOT_REGISTERED: 'Not Registered',
    AWAIT_VERIFICATION: 'Awaiting Verification',
    REGISTERED: 'Registered',
    BLOCKED: 'Blocked',
};
