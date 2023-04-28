import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ConfigProvider theme={{
      components:{
        Button:{
          colorPrimary: '#183661',
          colorPrimaryHover: '#183661',
          borderRadius:'2px',
        },
        token:{
          borderRadius:'2px',
          colorPrimary: '#183661',
          boxShadow: '0 0 0 0',
        }
      }
    }}>
      <App />
    </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

