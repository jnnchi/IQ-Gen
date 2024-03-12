import { IDefaultBrokerDefinition } from 'broker-factory';
import { IExtendableMediaRecorderWavEncoderBrokerDefinition } from '../interfaces';

export type TExtendableMediaRecorderWavEncoderBrokerLoader = (
    url: string
) => IExtendableMediaRecorderWavEncoderBrokerDefinition & IDefaultBrokerDefinition;
