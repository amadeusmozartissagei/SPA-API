import React, { useState } from 'react';
import { register } from '../utils/api';

const APITest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testAPI = async () => {
    setIsLoading(true);
    setTestResult('Testing API connection...');
    
    try {
      // Test with a unique email to avoid conflicts
      const timestamp = Date.now();
      const result = await register({
        name: 'Test User',
        email: `test${timestamp}@example.com`,
        password: 'testpassword123'
      });
      
      setTestResult('✅ API connection successful! Registration endpoint is working.\n\nNote: Registration only creates the account. You need to login separately to get access token.');
    } catch (error) {
      setTestResult(`❌ API Error: ${error.message}\n\nThis could be due to:\n- Network connectivity issues\n- API server problems\n- Invalid request format\n- Email already exists`);
      console.error('API Test Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="card">
          <div className="card-header">
            <h2>API Connection Test</h2>
          </div>
          
          <div className="card-body">
            <p>This will test the connection to the Dicoding Notes API.</p>
            
            <button
              onClick={testAPI}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Testing...
                </>
              ) : (
                'Test API Connection'
              )}
            </button>
            
            {testResult && (
              <div className="mt-3" style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--bg-tertiary)', 
                borderRadius: '4px',
                whiteSpace: 'pre-wrap'
              }}>
                {testResult}
              </div>
            )}
            
            <div className="mt-4">
              <h4>Troubleshooting Tips:</h4>
              <ul>
                <li>Make sure you have an active internet connection</li>
                <li>Check if the API server is accessible: <a href="https://notes-api.dicoding.dev/v1" target="_blank" rel="noopener noreferrer">https://notes-api.dicoding.dev/v1</a></li>
                <li>Try disabling browser extensions that might block requests</li>
                <li>Check browser console for detailed error messages</li>
                <li>Try using a different browser or incognito mode</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITest;
