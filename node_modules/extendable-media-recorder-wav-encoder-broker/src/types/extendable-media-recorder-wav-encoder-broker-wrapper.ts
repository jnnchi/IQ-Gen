import { IDefaultBrokerDefinition } from 'broker-factory';
import { IExtendableMediaRecorderWavEncoderBrokerDefinition } from '../interfaces';

export type TExtendableMediaRecorderWavEncoderBrokerWrapper = (
    sender: MessagePort | Worker
) => IExtendableMediaRecorderWavEncoderBrokerDefinition & IDefaultBrokerDefinition;
