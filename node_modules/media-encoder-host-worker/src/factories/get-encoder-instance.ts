import { TGetEncoderInstanceFactory } from '../types';

export const createGetEncoderInstance: TGetEncoderInstanceFactory = (encoderInstancesRegistry) => {
    return (encoderId) => {
        const entry = encoderInstancesRegistry.get(encoderId);

        if (entry === undefined) {
            throw new Error('There was no instance of an encoder stored with the given id.');
        }

        return entry;
    };
};
