import * as path from 'path';
import { FileConcator } from './concat-files';

const fileA = path.join(__dirname, '/files/a.txt');
const fileB = path.join(__dirname, '/files/b.txt');
const fileDestination = path.join(__dirname, '/files/dest.txt');

const fileConcator = new FileConcator();
fileConcator.concatFiles([fileA, fileB], fileDestination, error => {
	if (error) {
		console.log(error);
		return process.exit(1);
	}
	console.log('finish');
});
