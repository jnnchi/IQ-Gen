import { IExtendableMediaRecorderWavEncoderBrokerDefinition } from 'extendable-media-recorder-wav-encoder-broker';
import { TWorkerImplementation, createWorker } from 'worker-factory';
import { createFinishEncoding } from './factories/finish-encoding';
import { createGetEncoderInstance } from './factories/get-encoder-instance';
import { createInstantiateEncoder } from './factories/instantiate-encoder';
import { createPickCapableEncoderBroker } from './factories/pick-capable-encoder-broker';
import { createRemoveEncoderInstance } from './factories/remove-encoder-instance';
import { createRequestPartialEncoding } from './factories/request-partial-encoding';
import { closePort } from './functions/close-port';
import { registerEncoder } from './functions/register-encoder';
import { IMediaEncoderHostWorkerCustomDefinition } from './interfaces';
import { TEncoderInstancesRegistryEntry } from './types';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

const encoderInstancesRegistry: Map<number, TEncoderInstancesRegistryEntry> = new Map();
const getEncoderInstance = createGetEncoderInstance(encoderInstancesRegistry);
const removeEncoderInstance = createRemoveEncoderInstance(encoderInstancesRegistry, getEncoderInstance);
const encoderBrokerRegistry: Map<string, [RegExp, IExtendableMediaRecorderWavEncoderBrokerDefinition]> = new Map();
const finishEncoding = createFinishEncoding(closePort, removeEncoderInstance);
const pickCapableEncoderBroker = createPickCapableEncoderBroker(encoderBrokerRegistry);
const instantiateEncoder = createInstantiateEncoder(closePort, encoderInstancesRegistry, pickCapableEncoderBroker);
const requestPartialEncoding = createRequestPartialEncoding(getEncoderInstance);

createWorker<IMediaEncoderHostWorkerCustomDefinition>(self, <TWorkerImplementation<IMediaEncoderHostWorkerCustomDefinition>>{
    encode: async ({ encoderId, timeslice }) => {
        const arrayBuffers = timeslice === null ? await finishEncoding(encoderId) : await requestPartialEncoding(encoderId, timeslice);

        return { result: arrayBuffers, transferables: arrayBuffers };
    },
    instantiate: ({ encoderId, mimeType, sampleRate }) => {
        const port = instantiateEncoder(encoderId, mimeType, sampleRate);

        return { result: port, transferables: [port] };
    },
    register: async ({ port }) => {
        return { result: await registerEncoder(encoderBrokerRegistry, port) };
    }
});
