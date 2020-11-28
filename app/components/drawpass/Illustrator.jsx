import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { SaveButton, SaveContainer, SaveResponse } from './styles/illustrator';
import CanvasContainer from '../canvas/CanvasContainer';
import Loading from '/app/components/Loading';
import { LoadingContainer } from './styles/drawpass';

function Illustrator(props) {
  const [saveLabel, setSaveLabel] = useState('save image');
  const [isSaving, setIsSaving] = useState(false);
  const [response, setResponse] = useState({ status: '', isOk: false });

  useEffect(() => {
    const label = isSaving ? 'saving image' : 'save image';
    setSaveLabel(label);
  }, [isSaving]);

  const handleSaveResponse = res => {
    const message = responseMessage(res.status);

    setIsSaving(false);
    setResponse({ message: message, isOk: res.ok });

    return res.json();
  };

  const responseMessage = status => {
    switch (true) {
    case 200:
      return 'saved!';
    case 404:
      return 'error: either the session or image was not found';
    case +status >= 500:
      return 'error: something went wrong on the server. wait & try again';
    }
  };

  const saveImage = canvas => {
    const isOk = response.isOk;
    const dataURL = canvas.toDataURL('image/png', 0.9);

    setIsSaving(true);
    setResponse({ message: '', isOk: isOk });

    fetch(`${process.env.API_SERVER}/api/shared_image/${props.slug}`, {
      method: 'PATCH',
      headers: new Headers({
        'Authorization': `Token token=${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ data_url: dataURL }),
    }).then(response => handleSaveResponse(response));
  };

  const putCanvasContainer = () => {
    return (
      <CanvasContainer
        key={'drawpass'}
        isSaving={isSaving}
        canvasImg={props.canvasImg}
        canFullscreen={true}
        save={canvas => Save(canvas)}
      />
    );
  };

  const putLoader = () => {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  };

  const Save = canvas => {
    return (
      <SaveButton
        isSaving={isSaving}
        onClick={() => saveImage(canvas)}
      >{saveLabel}</SaveButton>
    );
  };

  return (
    <>
      { props.loading ? putLoader() : putCanvasContainer() }
      <SaveContainer>
        <SaveResponse error={!response.isOk} trigger={!isSaving}>{response.message}</SaveResponse>
      </SaveContainer>
    </>
  );
}

export default withRouter(Illustrator);
