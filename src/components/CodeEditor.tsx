import React from 'react';

interface CodeEditorProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  fileName: string;
  fileExtension: string;
  onFileNameChange: (newFileName: string) => void;
  onFileExtensionChange: (newFileExtension: string) => void;
}



const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange, fileName, fileExtension, onFileNameChange, onFileExtensionChange }) => {
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCodeChange(event.target.value);
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileNameChange(event.target.value);
  };

  const fileExtensions = ['py', 'ts'];

  return (
    <div className="code-editor">
      <div className="form-group">
        <label htmlFor="fileName">File Name:</label>
        <input
          type="text"
          id="fileName"
          className="form-control"
          value={fileName}
          onChange={(e) => onFileNameChange(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fileExtension">File Extension:</label>
        <select
          id="fileExtension"
          className="form-control"
          value={fileExtension}
          onChange={(e) => onFileExtensionChange(e.target.value)}
        >
          <option value={''} selected>Select file type</option>
          {fileExtensions.map((ext) => (
            <option key={ext} value={ext}>
              {ext}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="codeInput">Code:</label>
        <textarea
          id="codeInput"
          className="form-control"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          rows={10}
        ></textarea>
      </div>
    </div>
  );
};

export default CodeEditor;