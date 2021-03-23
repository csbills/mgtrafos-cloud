import { Header } from '../Header';
import { Container } from './styles';
import { QuickAccess } from '../../components/QuickAccess';
import { FilesList } from '../../components/FilesList';
import { UploadModal } from '../../components/UploadModal';
import { useState } from 'react';
import { useFiles } from '../../contexts/FilesContext';

export function Content() {
    const [isNewUploadModalOpen, setIsNewUploadModalOpen] = useState(false);
    const { setUploadedFiles } = useFiles();

    function handleOpenNewUploadModal(){
        setIsNewUploadModalOpen(true);
    }

    function handleCloseNewUploadModal() {
        setIsNewUploadModalOpen(false);
        setUploadedFiles([]);
    }

    return (
        <Container>
            <Header onOpenNewUploadModal={handleOpenNewUploadModal} />
            <QuickAccess />
            <FilesList /> 
            <UploadModal 
                isOpen={isNewUploadModalOpen}
                onRequestClose={handleCloseNewUploadModal}
            />              
        </Container>
    )
}