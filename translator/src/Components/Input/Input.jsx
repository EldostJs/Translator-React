import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import StyleInput from './Input.module.css';
import axios from 'axios';

function Input({ onTextChange, onLanguageDetected }) {
    const [text, setText] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = 'e2fed64245msh85d5f14288e8b79p151df1jsn2c5b3173d86e';

    const detectLanguage = useCallback(
        _.debounce(async (text) => {
            if (!text) return;

            const data = {
                q: text,
            };

            const options = {
                method: 'POST',
                url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            try {
                setLoading(true);
                const response = await axios.request(options);
                const language = response.data.data.detections[0][0].language;
                setDetectedLanguage(language);
                onLanguageDetected(language);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }, 1000), // Задержка в 1000 миллисекунд
        []
    );

    useEffect(() => {
        detectLanguage(text);
    }, [text, detectLanguage]);

    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        onTextChange(newText);
    };

    return (
        <div className={StyleInput.md}>
            {loading && <p>Detecting language...</p>}
            {error && <p>Error: {error}</p>}
            <span>Detected Language: {detectedLanguage}</span>
            <textarea className={StyleInput.inp} value={text} onChange={handleChange}></textarea>
        </div>
    );
}

export default Input;
