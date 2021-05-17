import { Header } from '../Header';
import { Container } from './styles';
import { QuickAccess } from '../../components/QuickAccess';
import { FilesList } from '../../components/FilesList';
import { UploadModal } from '../../components/UploadModal';
import { useState } from 'react';
import { useFiles } from '../../contexts/FilesContext';
import Modal from 'react-modal';

import listSVG from '../../assets/list.svg';
import gridSVG from '../../assets/grid.svg';
import folderSVG from '../../assets/folder-blue.svg'
import settingsPNG from '../../assets/settings.png';
import api from '../../services/api';

Modal.setAppElement('#root');

interface IFolder {
    _id: string,
    folderSrc: string;
    name: string,
    user: string,
    createdAt: string,
}

export function Content() {
    const [isNewUploadModalOpen, setIsNewUploadModalOpen] = useState(false);
    const { setUploadedFiles, folder } = useFiles();
    const [isList, setIsList] = useState(true);
    const [openFormSubFolder, setOpenFormSubFolder] = useState(false);
    const [inputSubFolderName, setInputSubFolderName] = useState('');
    const [updateListIndex, setUpdateListIndex] = useState(0);

    function handleOpenNewUploadModal() {
        setIsNewUploadModalOpen(true);
    }

    function handleCloseNewUploadModal() {
        setIsNewUploadModalOpen(false);
        setUploadedFiles([]);
    }

    async function handleCreateNewSubFolder() {
        console.log(inputSubFolderName, folder?._id);
        await api.post('/folders', {
            folderSrc: folder?._id,
            name: inputSubFolderName,
        });
        setOpenFormSubFolder(false);
        setInputSubFolderName('');
        let index = updateListIndex + 1;
        setUpdateListIndex(index);
    }

    return (
        <Container>
            { openFormSubFolder && (
                <Modal
                    isOpen={openFormSubFolder}
                    onRequestClose={() => setOpenFormSubFolder(false)}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <div className="containerModalFolderCreate">
                        <div className="containerInput">
                            <img src={folderSVG} alt="pasta" width="20" height="20" />
                            <input
                                type="text"
                                placeholder="Nome da pasta"
                                onChange={event => setInputSubFolderName(event.target.value)} />
                        </div>
                        <div className="containerButton">
                            <button onClick={() => setOpenFormSubFolder(false)}>Cancelar</button>
                            <button
                                style={{ background: "#30E383", color: "#ffff", borderColor: "#30E383" }}
                                onClick={handleCreateNewSubFolder}>
                                Criar
                        </button>
                        </div>
                    </div>
                </Modal>
            )}

            <Header onOpenNewUploadModal={handleOpenNewUploadModal} />

            <div className="modeDisplay">
                {folder ? <span>{folder.name}</span> : <span>   </span>}
                <div>
                    <button>
                        <img src={settingsPNG} alt="gerenciar usuario" />
                        Gerenciar Usuários
                    </button>
                    <button onClick={() => setOpenFormSubFolder(true)}>
                        <img src={folderSVG} alt="subpasta" />
                        Criar Subpasta
                    </button>
                    {isList ? (<button onClick={() => setIsList(true)} className="active">
                        <img src={listSVG} alt="List" />
                    </button>) : (<button onClick={() => setIsList(true)}>
                        <img src={listSVG} alt="List" />
                    </button>)}

                    {!isList ? (<button onClick={() => setIsList(false)} className="active">
                        <img src={gridSVG} alt="Grid" />
                    </button>) : (<button onClick={() => setIsList(false)}>
                        <img src={gridSVG} alt="Grid" />
                    </button>)}

                </div>
            </div>

            {isList ? <FilesList folderSrc={folder?._id} updateListIndex={updateListIndex} /> : <QuickAccess />}

            <UploadModal
                isOpen={isNewUploadModalOpen}
                onRequestClose={handleCloseNewUploadModal}
            />
        </Container>
    )
}