/**
 * xml2js helper utility
*/

import * as xml2js from 'xml2js';
const parser = new xml2js.Parser({ explicitArray: false });

class Helper {
    static async xml2json(xmlstring: string) {
        return await parser.parseStringPromise(xmlstring)
    }
}

export default Helper;