import { Container, MenuItem, Titulo, Subtitulo } from './styles';

import downloadSVG from '../../assets/file-download.svg';
import trashSVG from '../../assets/trash-blue.svg';
import eyeSVG from '../../assets/eye.svg';
import { useFiles } from '../../contexts/FilesContext';

import pdf from '../../assets/pdf.svg';

 interface FileInfo {
    id: string,
    name: string,
    size: string,
    url: string,
}

export function Dropdown({id, name, size, url}: FileInfo) {
    const { deleteFile } = useFiles();
    return (
        <Container>
            <button>X</button>
            <img src={pdf} alt="pdf" width={28} height={28} />
            <Titulo>{name}</Titulo>
            <Subtitulo>{size}</Subtitulo>
            <MenuItem>
                <a href={url} target="_blank">
                    <img src={eyeSVG} alt="Visualizar" />
                    <span>Visualizar</span>
                </a>
            </MenuItem>

            <MenuItem>
                <img src={downloadSVG} alt="Download" />
                <span>Fazer download</span>
            </MenuItem>

            <MenuItem onClick={() => deleteFile(id)}>
                <img src={trashSVG} alt="Trash" />
                <span>Remover</span>
            </MenuItem>
        </Container>
    )
}