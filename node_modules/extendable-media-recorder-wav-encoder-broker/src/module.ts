import { createBroker } from 'broker-factory';
import { TExtendableMediaRecorderWavEncoderWorkerDefinition } from 'extendable-media-recorder-wav-encoder-worker';
import { IExtendableMediaRecorderWavEncoderBrokerDefinition } from './interfaces';
import { TExtendableMediaRecorderWavEncoderBrokerLoader, TExtendableMediaRecorderWavEncoderBrokerWrapper } from './types';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

export const wrap: TExtendableMediaRecorderWavEncoderBrokerWrapper = createBroker<
    IExtendableMediaRecorderWavEncoderBrokerDefinition,
    TExtendableMediaRecorderWavEncoderWorkerDefinition
>({
    characterize: ({ call }) => {
        return () => call('characterize');
    },
    encode: ({ call }) => {
        return (recordingId, timeslice) => {
            return call('encode', { recordingId, timeslice });
        };
    },
    record: ({ call }) => {
        return async (recordingId, sampleRate, typedArrays) => {
            await call(
                'record',
                { recordingId, sampleRate, typedArrays },
                typedArrays.map(({ buffer }) => buffer)
            );
        };
    }
});

export const load: TExtendableMediaRecorderWavEncoderBrokerLoader = (url: string) => {
    const worker = new Worker(url);

    return wrap(worker);
};
