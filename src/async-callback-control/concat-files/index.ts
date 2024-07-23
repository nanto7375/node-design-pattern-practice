import * as path from 'path';
import { FileConcator } from './concat-files';

const fileList = [path.join(__dirname, '/files/first.txt'), path.join(__dirname, '/files/second.txt')];
const fileDestination = path.join(__dirname, '/files/destination.txt');

new FileConcator().concatFiles(fileList, fileDestination, error => {
	if (error) {
		console.log(error);
		return process.exit(1);
	}
	console.log('finish');
});
