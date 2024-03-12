import { TGetEncoderInstanceFunction } from './get-encoder-instance-function';
import { TRequestPartialEncodingFunction } from './request-partial-encoding-function';

export type TRequestPartialEncodingFactory = (getEncoderInstance: TGetEncoderInstanceFunction) => TRequestPartialEncodingFunction;
