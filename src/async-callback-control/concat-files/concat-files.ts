import * as fs from 'fs';

type Callback = (error?: Error) => void;

class DataQueue<T> {
	private _queue: T[] = [];

	setDataViaIndex(data: T, index: number) {
		this._queue[index] = data;
	}
	getConcatedDatas() {
		return this._queue.join('');
	}
}

export class FileConcator {
	constructor(private _fs = fs, private _queue = new DataQueue()) {}

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

	private _readFileWithSaving(file: string, index: number, cb: Callback) {
		this._fs.readFile(file, (error, data) => {
			if (error) {
				return cb(error);
			}
			console.log('read', file);
			this._queue.setDataViaIndex(Buffer.from(data).toString(), index);
			cb();
		});
	}

	private _writeSavedDatas(destination: string, cb: Callback) {
		this._fs.writeFile(destination, this._queue.getConcatedDatas(), cb);
	}

	private _isAllCompleted(completedLength: number, filesLength: number, hasError: boolean) {
		return completedLength === filesLength && !hasError;
	}
}
