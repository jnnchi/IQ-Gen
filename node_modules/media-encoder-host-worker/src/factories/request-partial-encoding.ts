import { TRequestPartialEncodingFactory } from '../types';

export const createRequestPartialEncoding: TRequestPartialEncodingFactory = (getEncoderInstance) => {
    return (encoderId, timeslice) => {
        const [encoderBroker] = getEncoderInstance(encoderId);

        return encoderBroker.encode(encoderId, timeslice);
    };
};
