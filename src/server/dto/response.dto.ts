interface IErros {
  [propName: string]: any;
}
interface IMessages {
  [propName: string]: any;
}
interface IResponseData {
  [propName: string]: any;
}
export class ResponseDto {
  readonly isOk: boolean;
  readonly messages?: IMessages;
  readonly errors?: IErros;
  readonly responseData?: IResponseData;
}
