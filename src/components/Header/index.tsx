import { useEffect, useState } from 'react';
import { useFiles } from '../../contexts/FilesContext';

import {
    Container,
    InputContainer,
    ProfileContainer,
    ProfileImage,
} from './styles';

import profileImg from '../../assets/capturar.png';
import bellSVG from '../../assets/bell.svg';
import searchSVG from '../../assets/search.svg';
import downRight from '../../assets/down-arrow.svg';

interface HeaderProps {
    onOpenNewUploadModal: () => void;
}

export function Header({ onOpenNewUploadModal }: HeaderProps) {
    const { files, getFilteredFiles } = useFiles();
    const [search, setSearch] = useState('');

    useEffect(() => {
        getFilteredFiles(search);
    }, [search, files]);

    return (
        <Container>
            <InputContainer>
                <img src={searchSVG} alt="search" />
                <input placeholder="Search Here" onChange={e => setSearch(e.target.value)} />
            </InputContainer>

            <ProfileContainer>
                <button onClick={onOpenNewUploadModal}>Enviar arquivo</button>
                <img src={bellSVG} alt="bell" width="24" height="24" />
                <ProfileImage>
                    <img src={profileImg} alt="profile" />
                </ProfileImage>
                <img src={downRight} alt="downRight" width="12" height="12" />
            </ProfileContainer>
        </Container>
    )
}