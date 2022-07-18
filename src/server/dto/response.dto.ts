export class ResponseDto {
  readonly isOk: boolean;
  readonly messages?: object;
  readonly errors?: object;
  readonly responseData?: object;
}
