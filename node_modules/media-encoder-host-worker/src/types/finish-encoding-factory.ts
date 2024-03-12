import { TClosePortFunction } from './close-port-function';
import { TFinishEncodingFunction } from './finish-encoding-function';
import { TRemoveEncoderInstanceFunction } from './remove-encoder-instance-function';

export type TFinishEncodingFactory = (
    closePort: TClosePortFunction,
    removeEncoderInstance: TRemoveEncoderInstanceFunction
) => TFinishEncodingFunction;
