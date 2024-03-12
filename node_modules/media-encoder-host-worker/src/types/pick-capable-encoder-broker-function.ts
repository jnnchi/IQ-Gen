import { IExtendableMediaRecorderWavEncoderBrokerDefinition } from 'extendable-media-recorder-wav-encoder-broker';

export type TPickCapableEncoderBrokerFunction = (mimeType: string) => IExtendableMediaRecorderWavEncoderBrokerDefinition;
