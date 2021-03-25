import { Container, FileCard, Title } from './styles';

import xlsSVG from '../../assets/xls.svg';
import pdfSVG from '../../assets/pdf.svg';
import jpgSVG from '../../assets/jpg.svg';
import docSVG from '../../assets/doc.svg';
import folderSVG from '../../assets/folder.svg';
import { useFiles } from '../../contexts/FilesContext';

export function QuickAccess() {
    const { files } = useFiles();
    return (
        <>
            <Title>My Files</Title>

            <Container>
                {files.map((file) => (
                    <FileCard key={file._id}>
                        <a href={file.url} target="_blank">
                            <img src={pdfSVG} alt="fileCard" />
                            <span>{file.name}</span>
                        </a>
                    </FileCard>
                ))}
            </Container>
        </>

    )
}