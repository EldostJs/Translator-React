import React from 'react';
import StyleOutput from './Output.module.css';

function Output({ translatedText }) {
    return (
        <div className={StyleOutput.md}>
            <span>Translated Text</span>
            <textarea className={StyleOutput.inp} value={translatedText} readOnly></textarea>
        </div>
    );
}

export default Output;
