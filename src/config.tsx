import React, { useEffect, useState } from 'react';
import { AppExtensionSDK } from 'contentful-ui-extensions-sdk';
// Use components from Contentful's design system, Forma 36: https://ctfl.io/f36
import { TextField } from '@contentful/forma-36-react-components';
import { getParam } from './utils';

export default function Config({ sdk }: { sdk: AppExtensionSDK }) {
  const [url, setUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [failureMsg, setFailureMsg] = useState('');
  const [buttonTitle, setButtonTitle] = useState('');

  const configure = () => {
    return {
      // Parameters to be persisted as the app configuration.
      parameters: { url, successMsg, failureMsg, buttonTitle },
    };
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setUrl(updatedValue);
  };

  const onSuccessMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setSuccessMsg(updatedValue);
  };

  const onFailureMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setFailureMsg(updatedValue);
  };

  const onButtonTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setButtonTitle(updatedValue);
  };

  useEffect(() => {
    sdk.app.onConfigure(configure);
  }, [url, successMsg, failureMsg, buttonTitle]);

  useEffect(() => {
    // Ready to display our app (end loading state).
    sdk.app.getParameters().then((parameters) => {
      const endpointUrl = getParam(parameters, 'url');
      const successMessage = getParam(parameters, 'successMsg');
      const failureMessage = getParam(parameters, 'failureMsg');
      const buttonTitleText = getParam(parameters, 'buttonTitle');
      setUrl(endpointUrl);
      setSuccessMsg(successMessage);
      setFailureMsg(failureMessage);
      setButtonTitle(buttonTitleText);
      sdk.app.setReady();
    });
  }, []);

  return (
    <div style={{ margin: 50 }}>
      <TextField
        name="urlInput"
        id="urlInput"
        value={url}
        onChange={onUrlChange}
        labelText="Url of endpoint to be invoked"></TextField>
      <div style={{ margin: 50 }} />
      <TextField
        name="successMsgInput"
        id="successMsgInput"
        value={successMsg}
        onChange={onSuccessMsgChange}
        labelText="Success message to be shown when endpoint invocation is successful"></TextField>
      <div style={{ margin: 50 }} />
      <TextField
        name="failureMsgInput"
        id="failureMsgInput"
        value={failureMsg}
        onChange={onFailureMsgChange}
        labelText="Failure message to be show when endpoint returns failure"></TextField>
      <div style={{ margin: 50 }} />
      <TextField
        name="buttonTitleInput"
        id="buttonTitleInput"
        value={buttonTitle}
        onChange={onButtonTitleChange}
        labelText="Trigger button title"></TextField>
      <div style={{ margin: 50 }} />
    </div>
  );
}
