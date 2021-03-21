import { Container, ButtonPlus, Folder } from './styles';

import logo from '../../assets/logo.png';
import folderSVG from '../../assets/folderSideBar.svg';
import plusSVG from '../../assets/plus.svg';
import clockSVG from '../../assets/clock.svg';
import arrowRightSVG from '../../assets/arrow-right.svg';
import trashSVG from '../../assets/trash.svg';

export function LeftSideBar() {
    return (
        <Container>
            <img src={logo} alt="logo" />
            <ButtonPlus>
                <img src={plusSVG} alt="plus" />
                <span>Create New</span>
            </ButtonPlus>

            <span>Files</span>

            <Folder>
                <img src={arrowRightSVG} alt="folder" width="12" height="12" />
                <img src={folderSVG} alt="folder" width="16" height="16" />
                <span>My Files</span>
            </Folder>

            <Folder>
                <img src={arrowRightSVG} alt="folder" width="12" height="12" />
                <img src={folderSVG} alt="folder" width="16" height="16" />
                <span>Analytics</span>
            </Folder>

            <Folder>
                <img src={arrowRightSVG} alt="folder" width="12" height="12" />
                <img src={folderSVG} alt="folder" width="16" height="16" />
                <span>Marketing</span>
            </Folder>

            <Folder>
                <img src={arrowRightSVG} alt="folder" width="12" height="12" />
                <img src={folderSVG} alt="folder" width="16" height="16" />
                <span>Templates</span>
            </Folder>

            <Folder>
                <img src={arrowRightSVG} alt="folder" width="12" height="12" />
                <img src={folderSVG} alt="folder" width="16" height="16" />
                <span>Projects</span>
            </Folder>

            <Folder>
                <img src={arrowRightSVG} alt="folder" width="12" height="12" />
                <img src={folderSVG} alt="folder" width="16" height="16" />
                <span>Syndicode</span>
            </Folder>

            <Folder>
                <img src={clockSVG} alt="folder" width="16" height="16" />
                <span>Atividades recentes</span>
            </Folder>

            <Folder>
                <img src={trashSVG} alt="folder" width="16" height="16" />
                <span>Lixeira</span>
            </Folder>

        </Container>
    )
}