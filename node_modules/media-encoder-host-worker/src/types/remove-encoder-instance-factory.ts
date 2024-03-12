import { TEncoderInstancesRegistryEntry } from './encoder-instances-registry-entry';
import { TGetEncoderInstanceFunction } from './get-encoder-instance-function';
import { TRemoveEncoderInstanceFunction } from './remove-encoder-instance-function';

export type TRemoveEncoderInstanceFactory = (
    encoderInstancesRegistry: Map<number, TEncoderInstancesRegistryEntry>,
    getEncoderInstance: TGetEncoderInstanceFunction
) => TRemoveEncoderInstanceFunction;
