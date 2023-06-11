import CenteredAlert from './ui/Alert/CenteredSingleAction';
import React from 'react';

interface GoogleDriveButtonProps {
  resume: string;
  fileName: string;
}

const GoogleDriveButton: React.FC<GoogleDriveButtonProps> = ({
  resume,
  fileName
}) => {
  const copiarParaDrive = async () => {
    const response = await fetch('/api/google-drive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: resume, fileName: fileName }) // Agora estamos enviando o nome do arquivo
    });

    const data = await response.json();

    if (response.ok) {
      const url = `https://docs.google.com/document/d/${data.fileId}/edit`;
      window.open(url, '_blank'); // abre numa nova janela ou aba
      <CenteredAlert
        button={'ok'}
        message={'Please make a copy of this resume'}
        headline={'The file is opening'}
        hide={function (): void {
          throw new Error('Function not implemented.');
        }}
      />;
    } else {
      console.error('Error creating file:', data);
    }
  };

  return (
    <button
      className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={copiarParaDrive}
    >
      Google Drive
    </button>
  );
};

export default GoogleDriveButton;
