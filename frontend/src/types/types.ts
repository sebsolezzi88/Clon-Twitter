type Status= 'success' | 'error';

export interface ApiResponse{
    status: Status;
    msg:string;
}