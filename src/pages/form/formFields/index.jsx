import React from 'react'
import CustomTextField from './TextField';
import CustomCheckBox from './CheckBox';
import CustomRadio from './Radio';

import { CHECK_BOX, RADIO_BUTTON, TEXTFIELD } from './constants';

export default function FormFields({ type = "", ...props }) {
    switch (type) {
        case TEXTFIELD:
            return <CustomTextField {...props} />
           
        case CHECK_BOX:
            return <CustomCheckBox {...props} />
           
        case RADIO_BUTTON:
            return <CustomRadio {...props} />
            
        default:
            return <h4>Type Not found</h4>

    }
}
