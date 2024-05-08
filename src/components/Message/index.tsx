import { notification } from 'antd';
const defaultInfoMessageDuration = 7;
const defaultSuccessMessageDuration = 3;
const defaultWarningMessageDuration = 10;
const defaultErrorMessageDuration = 0; // don't auto-hide error messages

class Message {
    public static sendSuccess = (
        message: string | undefined,
        duration: number = defaultSuccessMessageDuration
    ) => {
        notification['success']({
            message: "Thành công",
            description: message,
            duration: duration,
        });
    };

    public static sendInfo = (
        message: string | undefined,
        duration: number = defaultInfoMessageDuration
    ) => {
        notification['info']({
            message: "Thông báo",
            description: message,
            duration: duration,
        });
    };

    public static sendWarning = (
        message: string | undefined,
        duration: number = defaultWarningMessageDuration
    ) => {
        notification['warning']({
            message: "Cảnh báo",
            description: message,
            duration: duration,
        });
    };

    public static sendError = (
        message: string | undefined,
        duration: number = defaultErrorMessageDuration
    ) => {
        notification['error']({
            message: "Lỗi",
            description: message,
            duration: duration,
        });
    };
}

export default Message;
