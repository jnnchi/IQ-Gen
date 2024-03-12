import { IDefaultBrokerDefinition } from 'broker-factory';
import { IMediaEncoderHostBrokerDefinition } from '../interfaces';

export type TMediaEncoderHostBrokerWrapper = (sender: MessagePort | Worker) => IMediaEncoderHostBrokerDefinition & IDefaultBrokerDefinition;
