import { TEncoderInstancesRegistryEntry } from './encoder-instances-registry-entry';
import { TGetEncoderInstanceFunction } from './get-encoder-instance-function';

export type TGetEncoderInstanceFactory = (
    encoderInstancesRegistry: Map<number, TEncoderInstancesRegistryEntry>
) => TGetEncoderInstanceFunction;
