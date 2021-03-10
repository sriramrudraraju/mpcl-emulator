import { formatHeaderParser } from './format-header';

export const fieldParser = (text: String) => {
  const fieldType = text.charAt(0);
  switch(fieldType) {
    case 'I': {
      // Printer configuration field
      // Syntax {header,ID#,action,device |}
      break;
    }
    case 'F': {
      // Format Header
      // Syntax {F,format#,action,device,measure,length,width,"name" |
      return formatHeaderParser(text);
    }
    default: {
      throw new Error('Not a valid field type');
    }
  }
}