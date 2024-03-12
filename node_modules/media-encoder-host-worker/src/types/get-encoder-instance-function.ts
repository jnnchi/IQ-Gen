import { TEncoderInstancesRegistryEntry } from './encoder-instances-registry-entry';

export type TGetEncoderInstanceFunction = (encoderId: number) => TEncoderInstancesRegistryEntry;
