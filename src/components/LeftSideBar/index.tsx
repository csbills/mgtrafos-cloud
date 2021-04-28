import { Container, ButtonPlus, Folder, StorageCount, Menu, NewFolderForm } from './styles';
import logo from '../../assets/logo-black.png';
import folderSVG from '../../assets/folder-blue.svg';
import plusSVG from '../../assets/plus.svg';
import clockSVG from '../../assets/clock.svg';
import trashSVG from '../../assets/trash.svg';
import { IPost, useFiles } from '../../contexts/FilesContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import fileSize from 'filesize';
import Modal from 'react-modal';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export interface IFolder {
    _id: string,
    name: string,
    user: string,
    createdAt: string,
}

Modal.setAppElement('#root');

export function LeftSideBar() {
    const { files, setFolder, setIsLoading } = useFiles();
    const [countStorageUsed, setCountStorageUsed] = useState(0);
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [openFormFolder, setOpenFormFolder] = useState(false);
    const [inputFolderName, setInputFolderName] = useState('');

    useEffect(() => {
        getFolders();
    }, []);

    useEffect(() => {
        getAllFiles();
    }, [files]);

    async function getAllFiles() {
        let sumStorageUsed = 0;
        folders.map(async folder => {
            const { data } = await api.get(`posts/${folder._id}`);
            if (data) {
                data.map((file: IPost) => {
                    sumStorageUsed += file.size;
                })
            }

            setCountStorageUsed(sumStorageUsed);
        })
    }

    async function getFolders() {
        try {
            setIsLoading(true);
            const { data } = await api.get('/folders');
            if (data) {
                setFolders(data);
                setFolder(data[0]);
                setIsLoading(false);
            }
        } catch (erro) {
            console.log(erro);
            setIsLoading(false);
        }
    }

    async function handleCreateNewFolder() {
        if (!inputFolderName) {
            console.log('nome tem que ser preenchido');
            return toast.error('Preencha o nome da pasta');
        }

        await api.post('/folders', {
            name: inputFolderName,
        }).then(response => {
            setFolders([...folders,
            {
                _id: response.data._id,
                name: response.data.name,
                user: response.data.user_id,
                createdAt: response.data.createdAt,
            }
            ])
        });
        getFolders();
        setOpenFormFolder(false);
        setInputFolderName('');
        return toast.success('Pasta criada com sucesso');
    }

    return (
        <Container>
            <ToastContainer />
            <div>
                <img src={logo} alt="logo" />

                <ButtonPlus onClick={() => setOpenFormFolder(!openFormFolder)}>
                    <img src={plusSVG} alt="plus" />
                    <span>Criar Pasta</span>
                </ButtonPlus>

                {openFormFolder && (
                    <Modal
                        isOpen={openFormFolder}
                        onRequestClose={() => setOpenFormFolder(false)}
                        overlayClassName="react-modal-overlay"
                        className="react-modal-content"
                    >
                        <div className="containerModalFolderCreate">
                            <div className="containerInput">
                                <img src={folderSVG} alt="pasta" width="20" height="20" />
                                <input
                                    type="text"
                                    placeholder="Nome da pasta"
                                    onChange={event => setInputFolderName(event.target.value)} />
                            </div>
                            <div className="containerButton">
                                <button onClick={() => setOpenFormFolder(false)}>Cancelar</button>
                                <button
                                    style={{ background: "#30E383", color: "#ffff", borderColor: "#30E383" }}
                                    onClick={handleCreateNewFolder}>
                                    Criar
                                </button>
                            </div>
                        </div>

                    </Modal>
                )}

                <span>Pastas</span>

                {folders.map((folder: IFolder) => (
                    <Folder key={folder._id} onClick={() => setFolder(folder)}>
                        <img src={folderSVG} alt="folder" width="16" height="16" />
                        <span>{folder.name}</span>
                        {/* <div>
                            <img src={trashSVG} alt="deletar" width="12" height="12" />
                        </div> */}
                    </Folder>
                ))}
            </div>

            {/* <Menu>
                    <span>Menu</span>

                    <Folder>
                        <img src={clockSVG} alt="folder" width="16" height="16" />
                        <span>Atividades recentes</span>
                    </Folder>

                    <Folder>
                        <img src={trashSVG} alt="folder" width="16" height="16" />
                        <span>Lixeira</span>
                    </Folder>
                </Menu> */}


            <StorageCount>
                <span><strong>{fileSize(Math.round(countStorageUsed))} </strong>of 5GB</span>
                <div>
                    <div style={{ width: `${(countStorageUsed / 1024) / 1024 / 1024 * 20}%` }} />
                </div>
                <span>Individual</span>
                <span>Conta</span>
            </StorageCount>

        </Container>
    )
}