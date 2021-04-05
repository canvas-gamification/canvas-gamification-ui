export interface AlertMessage {
    type: string;
    message: string;
}

export const MESSAGE_TYPES = {
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
};
