export interface ErrorMessage {
  message: string;
  errorCode: string;
}

export const isErrorMessage = (object: any): object is any => {
    return 'message' in object && 'errorCode' in object
};
