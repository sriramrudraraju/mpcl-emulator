import * as Punctuation from './punctuation';
import { fieldParser } from './fields';
/**
 * Sample packet
 * 
 * {F,25,A,R,M,508,508,"Fmt 25" |                     format header
    C,250,80,0,1,2,1,W,C,0,0,"MONARCH MARKING",0 |    constant text field
    B,1,12,F,110,115,1,2,120,5,L,0 |                  bar code field
    T,2,18,V,30,30,1,1,1,1,B,C,0,0,0 |}               text field
 */


/**
 * Standard Syntax Guidelines
 * 
 * Begin each packet with a start of header ({).
 * End each packet with an end of header (}).
 * Define no more than 1000 fields in a format.       --> pending
 * The field number 0 to 999 must be unique. Monarch
   recommends starting at 1, instead of 0.            --> pending
 */

export const compiler = (input: String) => {
  var modifiedString = input;
  
  // Trim white space
  modifiedString.replace(/\s+/g, '');
  
  // Begin each packet with a start of header ({).
  if (modifiedString.charAt(0) !== Punctuation.START_OF_HEADER) {
    throw new Error(`Begin each packet with a start of header (${Punctuation.START_OF_HEADER})`);
  } else {
    // remove start of header
    modifiedString = modifiedString.substring(1);
  }

  // End each packet with an end of header (}).
  if (modifiedString.charAt(modifiedString.length - 1) !== Punctuation.END_OF_HEADER) {
    throw new Error(`End each packet with an end of header (${Punctuation.END_OF_HEADER})`);
  } else {
    // remove end of header
    modifiedString = modifiedString.substring(0, modifiedString.length - 1);
  }

  const fields = modifiedString.split(Punctuation.FIELD_SEPARATOR);
  const parsedFields: any = [];
  fields.forEach((field) => {
    // ignore the string after lase field separator
    if (field) {
      parsedFields.push(fieldParser(field));
    }
  })

  return parsedFields;
}

// Configuration Packet --> setting up printer page-27