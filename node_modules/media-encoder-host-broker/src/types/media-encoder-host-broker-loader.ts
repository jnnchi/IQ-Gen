import { IDefaultBrokerDefinition } from 'broker-factory';
import { IMediaEncoderHostBrokerDefinition } from '../interfaces';

export type TMediaEncoderHostBrokerLoader = (url: string) => IMediaEncoderHostBrokerDefinition & IDefaultBrokerDefinition;
