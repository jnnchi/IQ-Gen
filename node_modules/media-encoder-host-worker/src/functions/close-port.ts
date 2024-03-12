export const closePort = (port: MessagePort): void => {
    port.onmessage = null;
    port.close();
};
