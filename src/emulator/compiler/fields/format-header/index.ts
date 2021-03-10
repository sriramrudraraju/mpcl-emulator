/**
 * A Format Header begins a format file.
 * 
    Syntax {F,format#,action,device,measure,length,width,"name" |

    F1. F Format Header.
    F2. format# Unique number from 0-999 to identify the format.
    F3. action Enter A to add a new format to the printer.
    F4. device Format storage device. Options:
        F Flash (9414 only)
        N Non-volatile RAM (9412/9413 default)
        R RAM (9414 default)
    F5. measure Unit of measure. Options:
        E English, measured in 1/100 inches
        M Metric, measured in 1/10 mm
        G Graphic, measured in dots
    F6. length Supply length, top to bottom, in selected units.
    F7. width Supply width, from left to right, in selected units.
    F8. "name" Format name (optional), 0-8 characters, enclose within
        quotation marks.

    Example {F,1,A,R,E,300,200,"TEXTILES" |
        Adds Format 1 ("TEXTILES") to the printer. It uses a three inch
        long by two inch wide label.
 */

export const formatHeaderParser = (formatHeader: String) => {
  const formatHeaderCopy = formatHeader;
  const [type, number, action, device, measure, length, width, name] = formatHeaderCopy.split(',');

  return { type, number, action, device, measure, length, width, name };
}