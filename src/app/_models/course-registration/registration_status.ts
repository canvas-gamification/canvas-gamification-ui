export interface RegistrationStatus {
    status: string;
    message: string;
}

export const REGISTRATION_STATUS = {
    NOT_REGISTERED: 'Not Registered',
    AWAIT_VERIFICATION: 'Awaiting Verification',
    REGISTERED: 'Registered',
};
