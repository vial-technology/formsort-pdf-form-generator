import Link from 'next/link';
import React, { useState } from 'react';
import { GenerateHTMLOptions } from '../src/types';

const API_PATH = `/api/generate-pdf`;

const helpText: Record<keyof GenerateHTMLOptions, string> = {
  includeAnswerKeys:
    'If set, includes the answer keys, in addition to the question labels.',
  includeSteps: 'If set, includes the step labels.',
  includeGroups: 'If set, includes the group labels.',
  includeSelectChoices:
    'If set, includes the choices other than the one selected by the responder.',
  includeInformationals:
    'If set, includes the text of informational questions.',
  includeUnanswered: 'If set, includes questions that were unanswered.',
};

const HomePage = () => {
  const [options, setOptions] = useState<
    Partial<Record<keyof GenerateHTMLOptions, string>>
  >({});

  const setOptionEnabled =
    (optionName: keyof GenerateHTMLOptions) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOptions((prev) => {
        const { checked } = e.target;
        if (!checked) {
          const { [optionName]: _, ...rest } = options;
          return rest;
        }
        return {
          ...prev,
          [optionName]: 'true',
        };
      });
    };

  const url = `${API_PATH}?` + new URLSearchParams(options).toString();

  return (
    <main>
      <img src="https://formsort.com/logo.svg"></img>
      <h1>Answer PDF generator</h1>
      <p>
        POST or GET into <Link href={API_PATH}>{API_PATH}</Link> to make PDFs.
      </p>
      <h2>URL Parameter Sandbox</h2>
      <table>
        <tbody>
          {Object.keys(helpText)
            .sort((a, b) => a.localeCompare(b))
            .map((optionName) => (
              <tr key={optionName}>
                <td>
                  <input
                    type="checkbox"
                    id={optionName}
                    onChange={setOptionEnabled(
                      optionName as keyof GenerateHTMLOptions
                    )}
                  />
                  <label htmlFor={optionName}>
                    <code>{optionName}</code>
                  </label>
                </td>
                <td>{helpText[optionName]}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <input className="url" readOnly value={url} />
    </main>
  );
};

export default HomePage;
