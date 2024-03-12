import { IExtendableMediaRecorderWavEncoderBrokerDefinition } from 'extendable-media-recorder-wav-encoder-broker';
import { TPickCapableEncoderBrokerFunction } from './pick-capable-encoder-broker-function';

export type TPickCapableEncoderBrokerFactory = (
    encoderBrokerRegistry: Map<string, [RegExp, IExtendableMediaRecorderWavEncoderBrokerDefinition]>
) => TPickCapableEncoderBrokerFunction;
