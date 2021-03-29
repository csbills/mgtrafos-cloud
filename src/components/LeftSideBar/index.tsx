import { Container, ButtonPlus, Folder, StorageCount, Menu } from './styles';

import logo from '../../assets/logo-black.png';
import folderSVG from '../../assets/folder-blue.svg';
import plusSVG from '../../assets/plus.svg';
import clockSVG from '../../assets/clock.svg';
import trashSVG from '../../assets/trash.svg';
import { useFiles } from '../../contexts/FilesContext';
import { useEffect, useState } from 'react';

export function LeftSideBar() {
    const { files } = useFiles();
    const [countStorageUsed, setCountStorageUsed] = useState(0);

    useEffect(() => {
        let sumStorageUsed: number = 0;
        files.map((file) => {
            sumStorageUsed = file.size + sumStorageUsed;
        })

        //transformando o size para GB
        setCountStorageUsed(Math.floor(((sumStorageUsed / 1024) / 1024) / 1024));
    }, [files]);

    return (
        <Container>
            <div>
                <img src={logo} alt="logo"/>
                <ButtonPlus>
                    <img src={plusSVG} alt="plus" />
                    <span>Criar Pasta</span>
                </ButtonPlus>

                <span>Pastas</span>

                <Folder>
                    <img src={folderSVG} alt="folder" width="16" height="16" />
                    <span>My Files</span>
                </Folder>

                <Folder>
                    <img src={folderSVG} alt="folder" width="16" height="16" />
                    <span>Analytics</span>
                </Folder>        

                <Folder>
                    <img src={folderSVG} alt="folder" width="16" height="16" />
                    <span>Marketing</span>
                </Folder>

                <Menu>
                    <span>Menu</span>

                    <Folder>
                        <img src={clockSVG} alt="folder" width="16" height="16" />
                        <span>Atividades recentes</span>
                    </Folder>

                    <Folder>
                        <img src={trashSVG} alt="folder" width="16" height="16" />
                        <span>Lixeira</span>
                    </Folder>
                </Menu>
            </div>

            <StorageCount>
                <span><strong>{countStorageUsed + 20} GB </strong> of 50</span>
                <div>
                    <div style={{ width: `${countStorageUsed + 40 * 2}%` }} />
                </div>
                <span>Individual</span>
                <span>Conta</span>
            </StorageCount>

        </Container>
    )
}