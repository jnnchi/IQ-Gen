import { TRemoveEncoderInstanceFactory } from '../types';

export const createRemoveEncoderInstance: TRemoveEncoderInstanceFactory = (encoderInstancesRegistry, getEncoderInstance) => {
    return (encoderId) => {
        const entry = getEncoderInstance(encoderId);

        encoderInstancesRegistry.delete(encoderId);

        return entry;
    };
};
