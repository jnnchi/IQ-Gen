export class MultiBufferDataView
    implements Omit<DataView, 'buffer' | 'getBigInt64' | 'getBigUint64' | 'setBigInt64' | 'setBigUint64' | symbol>
{
    private _buffers: ArrayBuffer[];

    private _byteLength: number;

    private _byteOffset: number;

    private _dataViews: DataView[];

    private _internalBuffer: DataView;

    constructor(buffers: ArrayBuffer[], byteOffset = 0, byteLength?: number) {
        if (byteOffset < 0 || (byteLength !== undefined && byteLength < 0)) {
            throw new RangeError();
        }

        const availableBytes = buffers.reduce((length, buffer) => length + buffer.byteLength, 0);

        if (byteOffset > availableBytes || (byteLength !== undefined && byteOffset + byteLength > availableBytes)) {
            throw new RangeError();
        }

        const dataViews = [];
        const effectiveByteLength = byteLength === undefined ? availableBytes - byteOffset : byteLength;
        const truncatedBuffers = [];

        let consumedByteLength = 0;
        let truncatedByteOffset = byteOffset;

        for (const buffer of buffers) {
            if (truncatedBuffers.length === 0) {
                if (buffer.byteLength > truncatedByteOffset) {
                    consumedByteLength = buffer.byteLength - truncatedByteOffset;

                    const byteLengthOfDataView = consumedByteLength > effectiveByteLength ? effectiveByteLength : consumedByteLength;

                    dataViews.push(new DataView(buffer, truncatedByteOffset, byteLengthOfDataView));
                    truncatedBuffers.push(buffer);
                } else {
                    truncatedByteOffset -= buffer.byteLength;
                }
            } else if (consumedByteLength < effectiveByteLength) {
                consumedByteLength += buffer.byteLength;

                const byteLengthOfDataView =
                    consumedByteLength > effectiveByteLength
                        ? buffer.byteLength - consumedByteLength + effectiveByteLength
                        : buffer.byteLength;

                dataViews.push(new DataView(buffer, 0, byteLengthOfDataView));
                truncatedBuffers.push(buffer);
            }
        }

        this._buffers = truncatedBuffers;
        this._byteLength = effectiveByteLength;
        this._byteOffset = truncatedByteOffset;
        this._dataViews = dataViews;
        this._internalBuffer = new DataView(new ArrayBuffer(8));
    }

    get buffers(): ArrayBuffer[] {
        return this._buffers;
    }

    get byteLength(): number {
        return this._byteLength;
    }

    get byteOffset(): number {
        return this._byteOffset;
    }

    public getFloat32(byteOffset: number, littleEndian?: boolean): number {
        this._internalBuffer.setUint8(0, this.getUint8(byteOffset + 0));
        this._internalBuffer.setUint8(1, this.getUint8(byteOffset + 1));
        this._internalBuffer.setUint8(2, this.getUint8(byteOffset + 2));
        this._internalBuffer.setUint8(3, this.getUint8(byteOffset + 3));

        return this._internalBuffer.getFloat32(0, littleEndian);
    }

    public getFloat64(byteOffset: number, littleEndian?: boolean): number {
        this._internalBuffer.setUint8(0, this.getUint8(byteOffset + 0));
        this._internalBuffer.setUint8(1, this.getUint8(byteOffset + 1));
        this._internalBuffer.setUint8(2, this.getUint8(byteOffset + 2));
        this._internalBuffer.setUint8(3, this.getUint8(byteOffset + 3));
        this._internalBuffer.setUint8(4, this.getUint8(byteOffset + 4));
        this._internalBuffer.setUint8(5, this.getUint8(byteOffset + 5));
        this._internalBuffer.setUint8(6, this.getUint8(byteOffset + 6));
        this._internalBuffer.setUint8(7, this.getUint8(byteOffset + 7));

        return this._internalBuffer.getFloat64(0, littleEndian);
    }

    public getInt16(byteOffset: number, littleEndian?: boolean): number {
        this._internalBuffer.setUint8(0, this.getUint8(byteOffset + 0));
        this._internalBuffer.setUint8(1, this.getUint8(byteOffset + 1));

        return this._internalBuffer.getInt16(0, littleEndian);
    }

    public getInt32(byteOffset: number, littleEndian?: boolean): number {
        this._internalBuffer.setUint8(0, this.getUint8(byteOffset + 0));
        this._internalBuffer.setUint8(1, this.getUint8(byteOffset + 1));
        this._internalBuffer.setUint8(2, this.getUint8(byteOffset + 2));
        this._internalBuffer.setUint8(3, this.getUint8(byteOffset + 3));

        return this._internalBuffer.getInt32(0, littleEndian);
    }

    public getInt8(byteOffset: number): number {
        const [dataView, byteOffsetOfDataView] = this._findDataViewWithOffset(byteOffset);

        return dataView.getInt8(byteOffset - byteOffsetOfDataView);
    }

    public getUint16(byteOffset: number, littleEndian?: boolean): number {
        this._internalBuffer.setUint8(0, this.getUint8(byteOffset + 0));
        this._internalBuffer.setUint8(1, this.getUint8(byteOffset + 1));

        return this._internalBuffer.getUint16(0, littleEndian);
    }

    public getUint32(byteOffset: number, littleEndian?: boolean): number {
        this._internalBuffer.setUint8(0, this.getUint8(byteOffset + 0));
        this._internalBuffer.setUint8(1, this.getUint8(byteOffset + 1));
        this._internalBuffer.setUint8(2, this.getUint8(byteOffset + 2));
        this._internalBuffer.setUint8(3, this.getUint8(byteOffset + 3));

        return this._internalBuffer.getUint32(0, littleEndian);
    }

    public getUint8(byteOffset: number): number {
        const [dataView, byteOffsetOfDataView] = this._findDataViewWithOffset(byteOffset);

        return dataView.getUint8(byteOffset - byteOffsetOfDataView);
    }

    public setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this._internalBuffer.setFloat32(0, value, littleEndian);

        this.setUint8(byteOffset, this._internalBuffer.getUint8(0));
        this.setUint8(byteOffset + 1, this._internalBuffer.getUint8(1));
        this.setUint8(byteOffset + 2, this._internalBuffer.getUint8(2));
        this.setUint8(byteOffset + 3, this._internalBuffer.getUint8(3));
    }

    public setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void {
        this._internalBuffer.setFloat64(0, value, littleEndian);

        this.setUint8(byteOffset, this._internalBuffer.getUint8(0));
        this.setUint8(byteOffset + 1, this._internalBuffer.getUint8(1));
        this.setUint8(byteOffset + 2, this._internalBuffer.getUint8(2));
        this.setUint8(byteOffset + 3, this._internalBuffer.getUint8(3));
        this.setUint8(byteOffset + 4, this._internalBuffer.getUint8(4));
        this.setUint8(byteOffset + 5, this._internalBuffer.getUint8(5));
        this.setUint8(byteOffset + 6, this._internalBuffer.getUint8(6));
        this.setUint8(byteOffset + 7, this._internalBuffer.getUint8(7));
    }

    public setInt16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this._internalBuffer.setInt16(0, value, littleEndian);

        this.setUint8(byteOffset, this._internalBuffer.getUint8(0));
        this.setUint8(byteOffset + 1, this._internalBuffer.getUint8(1));
    }

    public setInt32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this._internalBuffer.setInt32(0, value, littleEndian);

        this.setUint8(byteOffset, this._internalBuffer.getUint8(0));
        this.setUint8(byteOffset + 1, this._internalBuffer.getUint8(1));
        this.setUint8(byteOffset + 2, this._internalBuffer.getUint8(2));
        this.setUint8(byteOffset + 3, this._internalBuffer.getUint8(3));
    }

    public setInt8(byteOffset: number, value: number): void {
        const [dataView, byteOffsetOfDataView] = this._findDataViewWithOffset(byteOffset);

        dataView.setInt8(byteOffset - byteOffsetOfDataView, value);
    }

    public setUint16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this._internalBuffer.setUint16(0, value, littleEndian);

        this.setUint8(byteOffset, this._internalBuffer.getUint8(0));
        this.setUint8(byteOffset + 1, this._internalBuffer.getUint8(1));
    }

    public setUint32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this._internalBuffer.setUint32(0, value, littleEndian);

        this.setUint8(byteOffset, this._internalBuffer.getUint8(0));
        this.setUint8(byteOffset + 1, this._internalBuffer.getUint8(1));
        this.setUint8(byteOffset + 2, this._internalBuffer.getUint8(2));
        this.setUint8(byteOffset + 3, this._internalBuffer.getUint8(3));
    }

    public setUint8(byteOffset: number, value: number): void {
        const [dataView, byteOffsetOfDataView] = this._findDataViewWithOffset(byteOffset);

        dataView.setUint8(byteOffset - byteOffsetOfDataView, value);
    }

    private _findDataViewWithOffset(byteOffset: number): [DataView, number] {
        let byteOffsetOfDataView = 0;

        for (const dataView of this._dataViews) {
            const byteOffsetOfNextDataView = byteOffsetOfDataView + dataView.byteLength;

            if (byteOffset >= byteOffsetOfDataView && byteOffset < byteOffsetOfNextDataView) {
                return [dataView, byteOffsetOfDataView];
            }

            byteOffsetOfDataView = byteOffsetOfNextDataView;
        }

        throw new RangeError();
    }
}
