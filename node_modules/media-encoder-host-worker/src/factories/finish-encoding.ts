import { TFinishEncodingFactory } from '../types';

export const createFinishEncoding: TFinishEncodingFactory = (closePort, removeEncoderInstance) => {
    return (encoderId) => {
        const [encoderBroker, port, isRecording, sampleRate] = removeEncoderInstance(encoderId);

        if (!isRecording) {
            return encoderBroker.encode(encoderId, null);
        }

        return new Promise<ArrayBuffer[]>((resolve) => {
            port.onmessage = ({ data }) => {
                if (data.length === 0) {
                    closePort(port);

                    resolve(encoderBroker.encode(encoderId, null));
                } else {
                    encoderBroker.record(encoderId, sampleRate, data);
                }
            };
        });
    };
};
