import * as fs from 'fs';

export class FileConcator {
	constructor(private _fs = fs, private _dataArray = new DataArray<string>()) {}

	concatFiles(files: string[], destination: string, cb: Callback) {
		let completed = 0;
		let hasError = false;
		files.forEach((file, index) =>
			this._readFileWithSaving(file, index, readError => {
				if (readError) {
					hasError = true;
					return cb(readError);
				}
				if (this._isAllCompleted(++completed, files.length, hasError)) {
					this._writeSavedDatas(destination, cb);
				}
			}),
		);
	}

	private _readFileWithSaving(file: string, fileIndex: number, cb: Callback) {
		this._fs.readFile(file, (error, data) => {
			if (error) {
				return cb(error);
			}
			console.log('read', file);
			this._dataArray.setData(fileIndex, Buffer.from(data).toString());
			cb();
		});
	}

	private _writeSavedDatas(destination: string, cb: Callback) {
		this._fs.writeFile(destination, this._dataArray.getJoinedDatas(), cb);
	}

	private _isAllCompleted(completedLength: number, filesLength: number, hasError: boolean) {
		return completedLength === filesLength && !hasError;
	}
}

class DataArray<T> {
	private _array: T[] = [];

	setData(index: number, data: T) {
		this._array[index] = data;
	}
	getJoinedDatas(seperator: string = ' ') {
		return this._array.join(seperator);
	}
}

type Callback = (error?: Error) => void;
