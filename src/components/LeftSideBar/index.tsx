import { Container, ButtonPlus, Folder, StorageCount, ButtonInvisible } from './styles';
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
    folderSrc: string,
    name: string,
    user: string,
    createdAt: string,
}

Modal.setAppElement('#root');

export function LeftSideBar() {
    const { files, setFolder, setIsLoading, handleRemoveFolder } = useFiles();
    const [countStorageUsed, setCountStorageUsed] = useState(0);
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [filteredFolders, setFilteredFolders] = useState<IFolder[]>([]);
    const [openFormFolder, setOpenFormFolder] = useState(false);
    const [inputFolderName, setInputFolderName] = useState('');
    const [isAdminState, setIsAdminState] = useState(false);

    useEffect(() => {
        getFolders();
        setFolder(filteredFolders[0]);
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
                setFilteredFolders(data);
                setIsLoading(false);
                handleFilteredFolders();
            }

        } catch (erro) {
            console.log(erro);
            setIsLoading(false);
        }
    }

    function handleFilteredFolders() {
        const comercial = sessionStorage.getItem('@mgtrafos/group_comercial');
        const administrativo = sessionStorage.getItem('@mgtrafos/group_administrativo');
        const contratos = sessionStorage.getItem('@mgtrafos/group_contratos');
        const financeiro = sessionStorage.getItem('@mgtrafos/group_financeiro');
        const meioAmbiente = sessionStorage.getItem('@mgtrafos/group_meioAmbiente');
        const tecnico = sessionStorage.getItem('@mgtrafos/group_tecnico');
        const seguranca = sessionStorage.getItem('@mgtrafos/group_seguranca');
        const pedreira = sessionStorage.getItem('@mgtrafos/group_pedreira');
        const fotos = sessionStorage.getItem('@mgtrafos/group_fotos');
        const isAdmin = sessionStorage.getItem('@mgtrafos/isAdmin');

        if (isAdmin === '"true"') {
            setIsAdminState(true);
        }

        if (comercial === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'comercial'));
        }

        if (administrativo === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'administrativo'));
        }

        if (contratos === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'contratos'));
        }

        if (financeiro === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'financeiro'));
        }

        if (meioAmbiente === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'meio ambiente'));
        }

        if (tecnico === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'técnico'));
        }

        if (seguranca === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'segurança'));
        }

        if (pedreira === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'pedreira'));
        }

        if (fotos === '"false"') {
            setFilteredFolders((state) => state.filter((folder) => folder.name.toLowerCase() !== 'fotos'));
        }
    }

    async function handleCreateNewFolder() {
        if (!inputFolderName) {
            console.log('nome tem que ser preenchido');
            return toast.error('Preencha o nome da pasta');
        }

        await api.post('/folders', {
            folderSrc: 'raiz',
            name: inputFolderName,
        }).then(response => {
            setFolders([...folders,
            {
                _id: response.data._id,
                folderSrc: response.data.folderSrc,
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

    async function handleDeleteFolder(id: string) {
        await handleRemoveFolder(id);
        setFolders((state) => state.filter((folder) => folder._id !== id));
        return toast.success('Pasta deletada!');
    }

    return (
        <Container>
            <div>
                <img src={logo} alt="logo" />
                <ToastContainer />
                {
                    isAdminState ? (
                        <ButtonPlus onClick={() => setOpenFormFolder(!openFormFolder)}>
                            <img src={plusSVG} alt="plus" />
                            <span>Gerenciar Pastas</span>
                        </ButtonPlus>
                    ) : <ButtonInvisible />                    
                }
            </div>

            <div style={{
                flex: 1,
                width: "100%",
                padding: "0.5rem",
            }}>
                <span>Pastas</span>

                {filteredFolders.map((folder: IFolder) => (
                    <Folder key={folder._id} onClick={() => setFolder(folder)}>
                        <img src={folderSVG} alt="folder" width="16" height="16" />
                        <span>{folder.name}</span>
                    </Folder>
                ))}
                {openFormFolder && (
                    <Modal
                        isOpen={openFormFolder}
                        onRequestClose={() => setOpenFormFolder(false)}
                        overlayClassName="react-modal-overlay"
                        className="react-modal-content"
                    >
                        <div className="containerModalFolderCreate">
                            {filteredFolders.map((folder: IFolder) => (
                                <div key={folder._id} className="containerFoldersDelete">
                                    <div>
                                        <img src={folderSVG} alt="pasta" width="20" height="20" />
                                        <span>{folder.name}</span>
                                    </div>

                                    <img src={trashSVG} alt="lixo"
                                        style={{ cursor: "pointer" }} width="20" height="20"
                                        onClick={() => {
                                            window.confirm(`Tem certeza que deseja excluir a pasta: ${folder.name}?`) &&
                                                handleDeleteFolder(folder._id);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

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