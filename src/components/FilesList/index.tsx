import { useEffect } from 'react';
import { Container } from './styles'
import { useFiles } from '../../contexts/FilesContext';


import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';


export interface IFile {
    id: string;
    name: string;
    readableSize: string;
    uploaded?: boolean;
    preview: string;
    file: File | null;
    progress?: number;
    error?: boolean;
    url: string;
}

export function FilesList() {
    const { getFiles, filteredFiles, uploadedFiles } = useFiles();

    useEffect(() => {
        getFiles();
    }, [uploadedFiles]);

    function getExtension(fileName: string) {
        return fileName.split('.').pop();
    }


    function getIcon(fileName: string) {
        const ext = getExtension(fileName);

        switch (ext) {
            case 'pdf':
                return pdf;

            case 'xlsx':
                return xls;

            case 'jpg':
                return jpg;

            case 'png':
                return png;
        }
    }
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tamanho</th>
                        <th>Tipo</th>
                        <th>Data de inclusão</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFiles.map((file: IFile) => (
                        <tr key={file.id}>
                            <td><img src={`${getIcon(file.name)}`} alt="file-icon" /> {file.name}</td>
                            <td>{file.readableSize}</td>
                            <td>{getExtension(file.name)}</td>
                            <td>10/08/2011 14:45</td>
                            <td>...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}