import { Container, MenuItem } from './styles';

import downloadSVG from '../../assets/file-download.svg';
import trashSVG from '../../assets/trash-blue.svg';
import eyeSVG from '../../assets/eye.svg';

export function Dropdown() {
    return (
        <Container>
            <MenuItem>
                <img src={eyeSVG} alt="Visualizar" />
                <span>Visualizar</span>
            </MenuItem>

            <MenuItem>
                <img src={downloadSVG} alt="Download" />
                <span>Fazer download</span>
            </MenuItem>

            <MenuItem>
                <img src={trashSVG} alt="Trash" />
                <span>Remover</span>
            </MenuItem>
        </Container>
    )
}