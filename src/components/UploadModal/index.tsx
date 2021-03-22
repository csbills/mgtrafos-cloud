import React, { useCallback } from "react";
import { useFiles } from "../../contexts/FilesContext";
import Modal from 'react-modal';
import UploadList from '../UploadList';

import {
    Container,
    Content,
    DropContainer,
    UploadMessage,
} from './styles';

import { useDropzone } from 'react-dropzone';

import closeSVG from '../../assets/close.svg';

Modal.setAppElement('#root');

interface NewUploadModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

export function UploadModal({ isOpen, onRequestClose }: NewUploadModalProps) {
    const { handleUpload } = useFiles();

    const onDrop = useCallback(
        (files) => {
            handleUpload(files);
        },
        [handleUpload]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
    } = useDropzone({
        accept: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
        onDrop,
    });

    const renderDragMessage = useCallback(() => {
        if (!isDragActive) {
            return <UploadMessage>Arraste imagens aqui...</UploadMessage>;
        }

        if (isDragReject) {
            return (
                <UploadMessage type="error">
                    Tipo de arquivo não suportado
                </UploadMessage>
            );
        }

        return <UploadMessage type="success">Solte as imagens aqui</UploadMessage>;
    }, [isDragActive, isDragReject]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeSVG} alt="Fechar Modal" />
            </button>
            <Container>
                <Content>
                    <DropContainer {...getRootProps()}>
                        <input {...getInputProps()} />
                        {renderDragMessage()}
                    </DropContainer>
                </Content>
                <UploadList />
            </Container>
        </Modal>

    )
}