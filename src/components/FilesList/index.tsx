import { useEffect, useState } from 'react';
import { Container } from './styles'
import { useFiles } from '../../contexts/FilesContext';
import { Dropdown } from '../Dropdown';


import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';

import filesize from "filesize";

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

interface IPost {
    _id: string;
    name: string;
    size: number;
    key: string;
    url: string;
    createdAt: string;
}

export function FilesList() {
    const { getFiles, filteredFiles, uploadedFiles } = useFiles();
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        getFiles();
    }, [uploadedFiles]);

    function getExtension(fileName: string) {
        return fileName.split('.').pop();
    }

    function getIcon(fileName: string) {
        const ext = getExtension(fileName)?.toLowerCase();

        switch (ext) {
            case 'pdf':
                return pdf;

            case 'xlsx':
                return xls;

            case 'jpg':
                return jpg;

            case 'jpeg':
                return jpg;

            case 'png':
                return png;
        }
    }
    return (
        <Container>
            {openDropdown && (
                <Dropdown />
            )}
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Tamanho</th>
                        <th>Tipo</th>
                        <th>Data de inclusão</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFiles.map((file: IPost) => (
                        <tr key={file._id}>
                            <td><img src={`${getIcon(file.name)}`} alt="file-icon" /></td>
                            <td>
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {file.name}
                                </a>
                            </td>
                            <td>{filesize(file.size)}</td>
                            <td>{getExtension(file.name)}</td>
                            <td>{file.createdAt}</td>
                            <td><button onClick={() => setOpenDropdown(!openDropdown)}>...</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}