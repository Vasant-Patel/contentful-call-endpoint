import React, { useEffect, useState, ChangeEvent } from 'react';
import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk';
import axios from 'axios';
import { Button, HelpText, TextField } from '@contentful/forma-36-react-components';
import { getParam } from './utils';

export default function Dialog({ sdk }: { sdk: DialogExtensionSDK }) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [username, setUsername] = useState<string>('');
  const [password, setPassowrd] = useState<string>('');

  const endpointUrl = getParam(sdk.parameters.installation, 'url');
  const successMsg = getParam(sdk.parameters.installation, 'successMsg');
  const failureMsg = getParam(sdk.parameters.installation, 'failureMsg');
  const buttonTitle = getParam(sdk.parameters.installation, 'buttonTitle');

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setUsername(updatedValue);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setPassowrd(updatedValue);
  };

  useEffect(() => {
    sdk.window.updateHeight();
  }, []);

  useEffect(() => {
    console.log('Error : ', error);
    if (error) {
      sdk.notifier.error(error);
    }
  }, [error]);

  const onInvoke = () => {
    if (!endpointUrl || !successMsg || !failureMsg || !buttonTitle) {
      throw 'Please set valid configuration from => Manage Apps => Configure';
    }

    setLoading(true);
    axios
      .get(endpointUrl, {
        auth: {
          username: username || '',
          password: password || '',
        },
      })
      .then((r) => r.data as string[])
      .then((_) => sdk.notifier.success(''))
      .catch((e) => {
        setError(e.response?.message || e.message || e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ margin: 50 }}>
      <div className="flexbox-container">
        <TextField
          name="user"
          id="user"
          value={username}
          onChange={onUsernameChange}
          labelText="Username"
        />
        <div style={{ width: 20 }} />
        <TextField
          name="pwd"
          id="pwd"
          textInputProps={{ type: 'password' }}
          value={password}
          onChange={onPasswordChange}
          labelText="Password"
        />
      </div>
      <div style={{ margin: 10 }} />
      <HelpText>Don't have crendentials? Contact VRMobile Team.</HelpText>
      <div style={{ margin: 30 }} />
      <Button
        buttonType="negative"
        isFullWidth={true}
        disabled={isLoading || !username || !password}
        onClick={onInvoke}
        loading={isLoading}>
        {buttonTitle}
      </Button>
      <div style={{ margin: 50 }} />
    </div>
  );
}
