import React, { useState } from 'react';
import Input from '../Input/Input';
import Output from '../Output/Output';
import axios from 'axios';

function Translate() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_KEY = 'e2fed64245msh85d5f14288e8b79p151df1jsn2c5b3173d86e';

    const translateText = async (text, detectedLanguage) => {
        if (!detectedLanguage) return;

        const data = {
            q: text,
            target: 'fr',
            source: detectedLanguage,
        };

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
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
            const translated = response.data.data.translations[0].translatedText;
            setTranslatedText(translated);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleTextChange = (newText) => {
        if (newText !== text) {
            setText(newText);
            if (detectedLanguage) {
                translateText(newText, detectedLanguage);
            }
        }
    };

    const handleLanguageDetected = (language) => {
        if (language !== detectedLanguage) {
            setDetectedLanguage(language);
            if (text) {
                translateText(text, language);
            }
        }
    };

    return (
        <div>
            {loading && <p>Translating...</p>}
            {error && <p>Error: {error}</p>}
            <Input onTextChange={handleTextChange} onLanguageDetected={handleLanguageDetected} />
            <Output translatedText={translatedText} />
        </div>
    );
}

export default Translate;
