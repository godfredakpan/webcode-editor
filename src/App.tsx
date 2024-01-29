import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TabManager from './components/TabManager';
import CodeEditor from './components/CodeEditor';
import ConsoleSection from './components/ConsoleSection';
import './App.css';

interface Tab {
  name: string;
  extension: string;
}

const App: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const savedTabs = localStorage.getItem('tabs');
    return savedTabs ? JSON.parse(savedTabs) : [{ name: 'Tab 1', extension: 'js' }];
  });

  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const savedActiveTab = localStorage.getItem('activeTab');
    return savedActiveTab ? JSON.parse(savedActiveTab) : tabs[0];
  });

  const [code, setCode] = useState<string>(() => {
    const storedCode = localStorage.getItem(activeTab.name) || 'console.log("Hello, World!");';
    return storedCode;
  });

  const [consoleOutput, setConsoleOutput] = useState<string>('');

  const [fileName, setFileName] = useState<string>(() => {
    const savedFileName = localStorage.getItem('fileName');
    return savedFileName || 'Tab 1';
  });

  const [fileExtension, setFileExtension] = useState<string>(() => {
    const savedFileExtension = localStorage.getItem('fileExtension');
    return savedFileExtension || 'js';
  });

  useEffect(() => {
    localStorage.setItem(activeTab.name, code);
  }, [activeTab, code]);

  useEffect(() => {
    localStorage.setItem('fileName', fileName);
    localStorage.setItem('fileExtension', fileExtension);
  }, [fileName, fileExtension]);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem('activeTab', JSON.stringify(activeTab));
  }, [activeTab]);

  const addTab = () => {
    const newTab = { name: `Tab ${tabs.length + 1}`, extension: 'js' };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab);
    setCode('');
    setFileName(newTab.name);
    setFileExtension('js');
  };

  const closeTab = (tab: Tab) => {
    const updatedTabs = tabs.filter((t) => t !== tab);
    setTabs(updatedTabs);
    const newActiveTab = updatedTabs[0] || { name: '', extension: '' };
    setActiveTab(newActiveTab);
    setCode(localStorage.getItem(newActiveTab.name) || '');
    setFileName(newActiveTab.name);
    setFileExtension(newActiveTab.extension);
    localStorage.removeItem(tab.name);
  };

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setCode(localStorage.getItem(tab.name) || '');
    setFileName(tab.name);
    setFileExtension(tab.extension);
  };

  const updateCode = (newCode: string) => {
    setCode(newCode);
  };

  const updateFileName = (newFileName: string) => {
    setFileName(newFileName);
  };

  const updateFileExtension = (newFileExtension: string) => {
    setFileExtension(newFileExtension);
    const updatedTabs = tabs.map(tab => {
      if (tab.name === activeTab.name) {
        return { ...tab, extension: newFileExtension };
      }
      return tab;
    });
    setTabs(updatedTabs);
    localStorage.setItem('fileExtension', newFileExtension);
    localStorage.setItem('tabs', JSON.stringify(updatedTabs));
  };

  const getFileLanguage = (): string => {
    const fileExtensionLowerCase = fileExtension.toLowerCase();
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
    };
    return languageMap[fileExtensionLowerCase] || 'typescript';
  };

  const runCode = async () => {
    if (code.trim() === '') {
      setConsoleOutput('Code Empty!');
      return;
    }
    try {
      setConsoleOutput('loading...')
      const response = await fetch('http://localhost:3001/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: getFileLanguage(),
          code,
        }),
      });

      if (!response.ok) {
        throw new Error(`Code execution failed with status ${response.status}`);
      }

      const result = await response.json();
      setConsoleOutput(result.output || 'No output');
    } catch (error: any) {
      console.error('Error running code:', error.message);
      setConsoleOutput('Error running code');
    }
  };

  const clearResponse = () => {
    setConsoleOutput('');
  }


  return (
    <div className="container">
      <button className="btn btn-dark button" onClick={addTab}>
        Add Tab
      </button>
      <div className="row">
        <div className="col-12">
          <TabManager tabs={tabs} activeTab={activeTab} onCloseTab={closeTab} onTabChange={changeTab} />
        </div>
        <div className="col-12">
          <CodeEditor
            code={code}
            onCodeChange={updateCode}
            fileName={fileName}
            fileExtension={fileExtension}
            onFileNameChange={updateFileName}
            onFileExtensionChange={updateFileExtension}
          />
          <SyntaxHighlighter language={getFileLanguage()} style={dark} className="code-editor">
            {code}
          </SyntaxHighlighter>
          <button className="btn btn-success run-button" onClick={runCode}>
            Run Code
          </button>
        </div>
      </div>
      <ConsoleSection output={consoleOutput} />
      <button className='btn btn-outline-success' style={{marginTop: 20}} onClick={clearResponse}>Clear Output</button>
    </div>
  );
};

export default App;