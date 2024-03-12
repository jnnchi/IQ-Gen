import { load as loadWorker } from 'media-encoder-host-broker';
import { worker } from './worker/worker';

const blob: Blob = new Blob([worker], { type: 'application/javascript; charset=utf-8' });

const url: string = URL.createObjectURL(blob);

const mediaEncoderHost = loadWorker(url);

export const connect = mediaEncoderHost.connect;

export const disconnect = mediaEncoderHost.disconnect;

export const encode = mediaEncoderHost.encode;

export const instantiate = mediaEncoderHost.instantiate;

export const isSupported = mediaEncoderHost.isSupported;

export const register = mediaEncoderHost.register;

URL.revokeObjectURL(url);
