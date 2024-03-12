import { TTypedArray } from 'worker-factory';
import { TEncoderInstancesRegistryEntry, TInstantiateEncoderFactory } from '../types';

export const createInstantiateEncoder: TInstantiateEncoderFactory = (closePort, encoderInstancesRegistry, pickCapableEncoderBroker) => {
    return (encoderId, mimeType, sampleRate): MessagePort => {
        if (encoderInstancesRegistry.has(encoderId)) {
            throw new Error(`There is already an encoder registered with an id called "${encoderId}".`);
        }

        const encoderBroker = pickCapableEncoderBroker(mimeType);
        const { port1, port2 } = new MessageChannel();
        const entry: TEncoderInstancesRegistryEntry = [encoderBroker, port1, true, sampleRate];

        encoderInstancesRegistry.set(encoderId, entry);

        port1.onmessage = ({ data }) => {
            if (data.length === 0) {
                closePort(port1);

                entry[2] = false;
            } else {
                encoderBroker.record(
                    encoderId,
                    sampleRate,
                    data.map((channelDataOrNumberOfSamples: number | TTypedArray) =>
                        typeof channelDataOrNumberOfSamples === 'number'
                            ? new Float32Array(channelDataOrNumberOfSamples)
                            : channelDataOrNumberOfSamples
                    )
                );
            }
        };

        return port2;
    };
};
