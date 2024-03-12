import { TClosePortFunction } from './close-port-function';
import { TEncoderInstancesRegistryEntry } from './encoder-instances-registry-entry';
import { TInstantiateEncoderFunction } from './instantiate-encoder-function';
import { TPickCapableEncoderBrokerFunction } from './pick-capable-encoder-broker-function';

export type TInstantiateEncoderFactory = (
    closePort: TClosePortFunction,
    encoderInstancesRegistry: Map<number, TEncoderInstancesRegistryEntry>,
    pickCapableEncoderBroker: TPickCapableEncoderBrokerFunction
) => TInstantiateEncoderFunction;
