export class ResponseDto {
  static format(status: string, data: any, total: number = null) {
    if (total || total === 0) {
      return { status, payload: { data, total } };
    }
    return { status, payload: { data } };
  }
}
