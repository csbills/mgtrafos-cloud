import { useEffect, useState } from 'react'
import { Container } from './styles'

import filesize from 'filesize';

import api from '../../services/api';

import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';

interface File {
    createdAt: Date,
    key: string,
    name: string,
    size: number,
    url: string,
    __v: 0,
    _id: string,
}

export function FilesList() {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        async function getFiles() {
            try {
                const { data } = await api.get('/posts');
                setFiles(data);
            } catch (error) {
                alert("Ocorreu um erro ao buscar os items");
            }
        }
        getFiles();
    }, []);

    function getExtension(fileName: string) {
        return fileName.split('.').pop();
    }

    function getIcon(fileName: string) {
        const ext = getExtension(fileName);
        
        switch(ext){
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
                    {files.map((file: File) => (
                        <tr key={file._id}>                            
                            <td><img src={`${getIcon(file.name)}`} alt="file-icon" /> {file.name}</td>
                            <td>{filesize(file.size)}</td>
                            <td>{getExtension(file.name)}</td>
                            <td>{file.createdAt}</td>
                            <td>...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}