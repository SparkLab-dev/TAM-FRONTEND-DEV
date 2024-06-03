import React from 'react';
import styled from 'styled-components';
import TranslateIcon from '@mui/icons-material/Translate';

const languages = [
  { code: 'en', lang: 'English' },
  { code: 'it', lang: 'Italian' }
];

const Dropdown = styled.select`
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #fff;
  color: #333;
`;

const Option = styled.option`
  font-size: 16px;
`;

interface LanguageDropdownProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <>
      <label htmlFor="language-select">Select Language:</label>
      <Dropdown
        id="language-select"
        value={currentLanguage}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onLanguageChange(e.target.value)}
      >
        {languages.map((language) => (
          <Option key={language.code} value={language.code}>
            <TranslateIcon/>
          </Option>
        ))}
      </Dropdown>
    </>
  );
};

export default LanguageDropdown;