import React, { useEffect, useState } from 'react';
import { BaseExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-fcss/dist/styles.css';

// Use components from Contentful's design system, Forma 36: https://ctfl.io/f36
import { Button } from '@contentful/forma-36-react-components';
import { getParam } from './utils';

export default function InvokeButton({ sdk }: { sdk: BaseExtensionSDK }) {
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const buttonTitle = getParam(sdk.parameters.installation, 'buttonTitle');

  useEffect(() => {
    if (!error) {
      return;
    }
    sdk.notifier.error(error);
  }, [error]);

  const initiate = async () => {
    const response = await sdk.dialogs.openCurrentApp({
      title: buttonTitle,
    });
    console.log('dialog response env => ', response);
  };

  const onCopyPress = async () => {
    try {
      setLoading(true);
      initiate();
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button buttonType="positive" isFullWidth={true} onClick={onCopyPress} loading={isLoading}>
      {buttonTitle}
    </Button>
  );
}
