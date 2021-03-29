import { Container, FileCard } from './styles';
import { Dropdown } from '../Dropdown';

import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';

import filesize from 'filesize';

import { useFiles } from '../../contexts/FilesContext';
import { useState } from 'react';

export function QuickAccess() {
    const { filteredFiles } = useFiles();
    const [openDropdown, setOpenDropdown] = useState(false);

    function getExtension(fileName: string) {
        return fileName.split('.').pop();
    }

    function getName(fileName: string) {
        return fileName.split('.' + getExtension(fileName));
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
            {filteredFiles.map((file) => (
                <FileCard onClick={() => setOpenDropdown(!openDropdown)}>
                    <img src={`${getIcon(file.name)}`} alt="fileCard" />
                    <span>{getName(file.name)}</span>
                    <span>{filesize(file.size)}</span>
                </FileCard>
            ))}
        </Container>
    )
}