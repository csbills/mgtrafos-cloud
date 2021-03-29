import { Header } from '../Header';
import { Container } from './styles';
import { QuickAccess } from '../../components/QuickAccess';
import { FilesList } from '../../components/FilesList';
import { UploadModal } from '../../components/UploadModal';
import { useState } from 'react';
import { useFiles } from '../../contexts/FilesContext';

import listSVG from '../../assets/list.svg';
import gridSVG from '../../assets/grid.svg';

export function Content() {
    const [isNewUploadModalOpen, setIsNewUploadModalOpen] = useState(false);
    const { setUploadedFiles } = useFiles();
    const [isList, setIsList] = useState(true);

    function handleOpenNewUploadModal() {
        setIsNewUploadModalOpen(true);
    }

    function handleCloseNewUploadModal() {
        setIsNewUploadModalOpen(false);
        setUploadedFiles([]);
    }

    return (
        <Container>
            <Header onOpenNewUploadModal={handleOpenNewUploadModal} />

            <div className="modeDisplay">
                <span>My Files</span>
                <div>
                    <button onClick={() => setIsList(true)} className="active">
                        <img src={listSVG} alt="List" />
                    </button>

                    <button onClick={() => setIsList(false)}>
                        <img src={gridSVG} alt="Grid" />
                    </button>


                </div>

            </div>

            {isList ? <FilesList /> : <QuickAccess />}

            <UploadModal
                isOpen={isNewUploadModalOpen}
                onRequestClose={handleCloseNewUploadModal}
            />
        </Container>
    )
}