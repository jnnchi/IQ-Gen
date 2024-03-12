import { createBroker } from 'broker-factory';
import { addUniqueNumber } from 'fast-unique-numbers';
import { TMediaEncoderHostWorkerDefinition } from 'media-encoder-host-worker';
import { IMediaEncoderHostBrokerDefinition } from './interfaces';
import { TMediaEncoderHostBrokerLoader, TMediaEncoderHostBrokerWrapper } from './types';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

const encoderIds: Set<number> = new Set();

export const wrap: TMediaEncoderHostBrokerWrapper = createBroker<IMediaEncoderHostBrokerDefinition, TMediaEncoderHostWorkerDefinition>({
    encode: ({ call }) => {
        return async (encoderId, timeslice) => {
            const arrayBuffers = await call('encode', { encoderId, timeslice });

            encoderIds.delete(encoderId);

            return arrayBuffers;
        };
    },
    instantiate: ({ call }) => {
        return async (mimeType, sampleRate) => {
            const encoderId = addUniqueNumber(encoderIds);
            const port = await call('instantiate', { encoderId, mimeType, sampleRate });

            return { encoderId, port };
        };
    },
    register: ({ call }) => {
        return (port) => {
            return call('register', { port }, [port]);
        };
    }
});

export const load: TMediaEncoderHostBrokerLoader = (url: string) => {
    const worker = new Worker(url);

    return wrap(worker);
};
