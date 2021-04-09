import { Container, ButtonPlus, Folder, StorageCount, Menu, NewFolderForm } from './styles';
import logo from '../../assets/logo-black.png';
import folderSVG from '../../assets/folder-blue.svg';
import plusSVG from '../../assets/plus.svg';
import clockSVG from '../../assets/clock.svg';
import trashSVG from '../../assets/trash.svg';
import { useFiles } from '../../contexts/FilesContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import fileSize from 'filesize';

export interface IFolder {
    _id: string,
    name: string,
    user: string,
    createdAt: string,
}

export function LeftSideBar() {
    const { files, setFolder } = useFiles();
    const [countStorageUsed, setCountStorageUsed] = useState(0);
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [openFormFolder, setOpenFormFolder] = useState(false);
    const [inputFolderName, setInputFolderName] = useState('');

    useEffect(() => {
        let sumStorageUsed: number = 0;
        files.map((file) => {
            sumStorageUsed = file.size + sumStorageUsed;
        })
        //transformando o size para GB
        //setCountStorageUsed(Math.floor(((sumStorageUsed / 1024) / 1024) / 1024));
        setCountStorageUsed(sumStorageUsed);
    }, [files]);

    useEffect(() => {
        getFolders();
    }, []);

    async function getFolders() {
        try {
            const { data } = await api.get('/folders');
            if (data) {
                setFolders(data);
                setFolder(data[0]);
            }
        } catch (erro) {
            console.log(erro);
        }
    }

    async function handleCreateNewFolder() {
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
    }

    return (
        <Container>
            <div>
                <img src={logo} alt="logo" />

                <ButtonPlus onClick={() => setOpenFormFolder(!openFormFolder)}>
                    <img src={plusSVG} alt="plus" />
                    <span>Criar Pasta</span>
                </ButtonPlus>

                {openFormFolder && (
                    <NewFolderForm>
                        <input type="text" placeholder="Nome da pasta" onChange={(e) => setInputFolderName(e.target.value)} />
                        <div>                            
                            <button type="button" onClick={handleCreateNewFolder}>Cancelar</button>
                            <button type="button" onClick={handleCreateNewFolder}>Criar</button>
                        </div>
                        
                    </NewFolderForm>
                )}

                <span>Pastas</span>

                {folders.map((folder: IFolder) => (
                    <Folder key={folder._id} onClick={() => setFolder(folder)}>
                        <img src={folderSVG} alt="folder" width="16" height="16" />
                        <span>{folder.name}</span>
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
                <span><strong>{fileSize(Math.round(countStorageUsed))}   </strong>of 5GB</span>
                <div>
                    <div style={{ width: `${(countStorageUsed / 1024) / 1024 / 1024 * 2}%` }} />
                </div>
                <span>Individual</span>
                <span>Conta</span>
            </StorageCount>

        </Container>
    )
}