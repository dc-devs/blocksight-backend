import CovalentLogEventDecodedParam from './covalent-log-event-decoded-param-interface';

interface CovalentLogEventDecoded {
	name: string;
	signature: string;
	params: CovalentLogEventDecodedParam[];
}

export default CovalentLogEventDecoded;
